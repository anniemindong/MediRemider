import React, { useState, useEffect } from "react";
import {
  AsyncStorage,
  StyleSheet,
  ScrollView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  UpcomingAppoinmentRow,
  DashboardMenuItemRow,
  Divider,
  SectionHeader,
  DashboardCampaignsListItem,
  DoctorItemRow,
  DepartmentItem,
  TouchableHighlight
} from "../../components";

import { Button, Dimensions } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { DashboardItemsModel } from "../../models";
import { DashboardService } from "../../services";
import { useLocalization } from "../../localization";
import NavigationNames from "../../navigations/NavigationNames";
import { HomeMenuItemType } from "../../types";
// import { HeartRateScreen } from "../campaign/HeartRateScreen";

const api = require('../../../utils/api');
// const generateMenuItems = (
//   getString: (key: string) => string
// ): HomeMenuItemType[] => [
//   {
//     row1: getString("Book an Appoinment"),
//     row2: getString("6 Doctors are available"),
//     iconName: "md-alarm",
//     iconBack: "#73CEC1",
//     action: "BookAnAppoinment"
//   },
//   {
//     row1: getString("Lab Tests at Home"),
//     row2: getString("92 Diagnostics are available"),
//     iconName: "ios-flask",
//     iconBack: "#35CDF7",
//     action: "LabTestsAtHome"
//   },
//   {
//     row1: getString("Online Healt Consultant"),
//     row2: getString("+14 Consultants"),
//     iconName: "ios-text",
//     iconBack: "#FA7F5D",
//     action: "OnlineHealtConsultant"
//   }
// ];

type TProps = {};
let updateInterval;
let uploadInterval;

let latest7DaysData = [85, 80, 87, 88, 86, 88, 79]

const LOWEST_HEART_RATE = 60
const HIGHEST_HEART_RATE = 100
let lastHeartRate = 70
function getHeartRate() {
  let highestHeartRate = Math.min(lastHeartRate + 5, HIGHEST_HEART_RATE)
  let lowestHeartRate = Math.max(lastHeartRate - 5, LOWEST_HEART_RATE)
  let currentHeartRate = Math.random() * (highestHeartRate - lowestHeartRate) + lowestHeartRate;
  // console.log("currentHeartRate")
  // console.log(highestHeartRate)
  // console.log(lowestHeartRate)
  // console.log(currentHeartRate)
  lastHeartRate = currentHeartRate
  return currentHeartRate
}

let email = ""

export const HomeScreen: React.FC<TProps> = props => {
  //get the user info
  const [userInfo, setUserInfo] = useState(null);
  const [heartData, setHeartData] = useState(null);
  const [lineChartData, setLineChartData] = useState({
    labels: [""],
    datasets: [
      {
        data: [
          0
        ]
      }
    ]
  });

  AsyncStorage.getItem('user').then(data => {
    if (!userInfo) {
      setUserInfo(JSON.parse(data))
    }
    email = JSON.parse(data).email;

    console.log("eeeeeeeee")
    console.log(email)

    if (!uploadInterval) {
      uploadInterval = setInterval(() => {
        console.log("uploadInterval")
        api.uploadHeartRateRecord(email, getHeartRate())
      }, 3000)
    }

    return api.HeartRate(email)
  }).then(data => {

    console.log("updateInterval 0")
    if (!updateInterval) {
      console.log("updateInterval 1")
      updateInterval = setInterval(async () => {
        console.log("updateInterval 2")
        try {
          let heartRateRecords = await api.getHeartRateRecord(email, 20);
          heartRateRecords = heartRateRecords.map(item => {
            return item.value
          })
          heartRateRecords - heartRateRecords.reverse()

          setLineChartData({
            labels: ["60", "50", "40", "30", "20", "10", "0"],
            datasets: [{
              data: heartRateRecords
            }]
          })
        }
        catch (error) {
          console.log(error)
        }
      }, 1000)
    }





    if (data) {
      if (!heartData) {
        setHeartData(data)
      }
      // if (heartData.success) {
      // console.log("6666666666666")
      // console.log(heartData.user)
      // }
    }
  }).catch(error => {
    console.log(error)
  })

  // all heart rate data in heartData.user


  const navigation = useNavigation();
  const { getString, changeLanguage } = useLocalization();
  const [dashboardItem, setDashboardItem] = useState<DashboardItemsModel>(null);

  useEffect(() => {
    DashboardService.getDashboardItems().then(item => {
      setDashboardItem(item);
    });
    return () => {
      console.log("clear")
      clearInterval(updateInterval);
      clearInterval(uploadInterval);
      updateInterval = null
      uploadInterval = null
    }
  }, []);

  // const onClickMenu = (item: HomeMenuItemType) => {
  //   switch (item.action) {
  //     case "BookAnAppoinment":
  //       navigation.navigate(NavigationNames.HeartRateScreen);
  //       // navigation.navigate(NavigationNames.NewAppointmentScreen);
  //       break;
  //     case "LabTestsAtHome":
  //       //navigation.navigate(NavigationName);
  //       break;
  //     case "OnlineHealtConsultant":
  //       //navigation.navigate(NavigationName);
  //       break;
  //   }
  // };

  if (dashboardItem === null) {
    return <Text>Loading</Text>;
  }

  // const HomeScreen = async ({ navigation }: Props) => {

  // start 1
  // let value = await AsyncStorage.getItem(key);


  //end 1
  //};

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* <Text >{userInfo ? userInfo.email : 'Testttttttt User'}</Text> */}
      <View>

        <Text style={styles.titleStyle}>Average Heart Rate(BPM)</Text>
        <LineChart
          data={{
            labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thur", "Fri"],
            datasets: [
              {
                data: [
                  (heartData && heartData.user && heartData.user.monday ? heartData.user.monday : latest7DaysData[0]),
                  (heartData && heartData.user && heartData.user.tuesday ? heartData.user.tuesday : latest7DaysData[1]),
                  (heartData && heartData.user && heartData.user.wednesday ? heartData.user.wednesday : latest7DaysData[2]),
                  (heartData && heartData.user && heartData.user.thursday ? heartData.user.thursday : latest7DaysData[3]),
                  (heartData && heartData.user && heartData.user.friday ? heartData.user.friday : latest7DaysData[4]),
                  (heartData && heartData.user && heartData.user.saturday ? heartData.user.saturday : latest7DaysData[5]),
                  (heartData && heartData.user && heartData.user.sunday ? heartData.user.sunday : latest7DaysData[6]),
                ]
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#FFFFFF",
            //#e26a00",
            backgroundGradientFrom: "#FFFFFF",
            //#fb8c00",
            backgroundGradientTo: "#81BAB2",
            // #ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 89, 89, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 89, 89, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              // stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />


        <Text style={styles.titleStyle}>Heart Rate in Past 60 Seconds(BPM)</Text>
        <LineChart
          data={lineChartData}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          fromZero={true}
          chartConfig={{
            backgroundColor: "#FFFFFF",
            //#e26a00",
            backgroundGradientFrom: "#FFFFFF",
            //#fb8c00",
            backgroundGradientTo: "#81BAB2",
            // #ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 89, 89, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 89, 89, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "2",
              strokeWidth: "2",
              // stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
        <Text style={styles.titleStyle}>Today's Average Blood Pressure(mmHg)</Text>


        <StackedBarChart
          data={{
            labels: ["SYS", "DIA"],
            legend: [],
            data: [
              [132],
              [84]
            ],
            barColors: ['#339966', '#47bacc'],
            // #dfe4ea'
          }}
          width={Dimensions.get('window').width - 0}
          height={220}
          chartConfig={{
            backgroundColor: '#FFFFFF',
            backgroundGradientFrom: '#FFFFFF',
            backgroundGradientTo: '#81BAB2',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 89, 89, ${opacity})`,
            style: {
              borderRadius: 20,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 13,
          }}
          hideLegend
        />






      </View>
      {/* <UpcomingAppoinmentRow
        style={styles.upcomingAppoinmentRow}
        item={dashboardItem.appointment}
      />
      <SectionHeader title={getString("What are you looking for?")} />
      <FlatList
        data={generateMenuItems(getString)}
        keyExtractor={(item, index) => `key${index}ForMenu`}
        renderItem={row => (
          <TouchableHighlight onPress={() => onClickMenu(row.item)}>
            <DashboardMenuItemRow item={row.item} />
          </TouchableHighlight>
        )}
        ItemSeparatorComponent={() => <Divider h16 />}
        scrollEnabled={false}
      />
      <SectionHeader
        title={getString("New Campaigns")}
        rightTitle={getString("See More")}
        rightAction={() =>
          navigation.navigate(NavigationNames.CampaignListScreen)
        }
      />
      <FlatList
        data={dashboardItem.campaigns}
        renderItem={row => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(NavigationNames.HeartRateScreen, {
              // navigation.navigate(NavigationNames.CampaignDetailScreen, {
                model: JSON.stringify(row.item)
              })
            }
          >
            <DashboardCampaignsListItem item={row.item} />
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        ItemSeparatorComponent={() => <View style={styles.horizontalDivider} />}
        contentContainerStyle={styles.campaignsContainer}
        keyExtractor={(item, index) => `key${index}ForCampaign`}
      /> */}
      {/* <SectionHeader
        title={getString("All Specialists")}
        rightTitle={getString("See More")}
        rightAction={() =>
          navigation.navigate(NavigationNames.DoctorListScreen)
        }
      />
      <FlatList
        data={dashboardItem.doctors.slice(0, 3)}
        keyExtractor={(item, index) => `key${index}ForDoctor`}
        renderItem={row => (
          <TouchableOpacity
            style={styles.touchableDoctorItem}
            onPress={() =>
              navigation.navigate(NavigationNames.DoctorDetailScreen, {
                model: JSON.stringify(row.item)
              })
            }
          >
            <DoctorItemRow item={row.item} />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <Divider h16 />}
        scrollEnabled={false}
      />
      <SectionHeader
        title={getString("Our Departments")}
        rightTitle={getString("See More")}
        rightAction={() =>
          navigation.navigate(NavigationNames.DepartmentListScreen)
        }
      />
      <FlatList
        data={dashboardItem.departments}
        renderItem={row => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(NavigationNames.DepartmentDetailScreen, {
                model: JSON.stringify(row.item)
              })
            }
          >
            <DepartmentItem item={row.item} style={{ minWidth: 130 }} />
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        ItemSeparatorComponent={() => <View style={styles.horizontalDivider} />}
        keyExtractor={(item, index) => `key${index}ForDepartment`}
        contentContainerStyle={styles.departmentsContainer}
      />
    </ScrollView>
  );
}; */}
      <SectionHeader
        title={getString("Medicine Savings")}
        rightTitle={getString("See More")}
        rightAction={() =>
          navigation.navigate(NavigationNames.DepartmentListScreen)
        }
      />
      <FlatList
        data={dashboardItem.departments}
        renderItem={row => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(NavigationNames.DepartmentDetailScreen, {
                model: JSON.stringify(row.item)
              })
            }
          >
            <DepartmentItem item={row.item} style={{ minWidth: 130 }} />
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        ItemSeparatorComponent={() => <View style={styles.horizontalDivider} />}
        keyExtractor={(item, index) => `key${index}ForDepartment`}
        contentContainerStyle={styles.departmentsContainer}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    textAlign: "center",
    color: "#076349",
    fontFamily: "Cochin",
    fontSize: 18,
    fontWeight: "bold"
  },
  container: { paddingVertical: 24 },
  upcomingAppoinmentRow: {
    marginHorizontal: 16
  },
  touchableDoctorItem: {
    paddingStart: 16,
    paddingEnd: 8
  },
  campaignsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  departmentsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  horizontalDivider: { width: 12 }
});