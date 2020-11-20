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

export const HomeScreen: React.FC<TProps> = props => {
  //get the user info
  const [userInfo, setUserInfo] = useState(null);
  const [heartData, setHeartData] = useState(null);

  AsyncStorage.getItem('user').then(data => {
    if (!userInfo) {
      setUserInfo(JSON.parse(data))
    }
    const email = userInfo.email;

    console.log("eeeeeeeee")
    console.log(email)

    return api.HeartRate(email)
  }).then(data => {

    if (data) {
      if (!heartData) {
        setHeartData(data)
      }
      if (heartData.success) {
        console.log("6666666666666")
        console.log(heartData.user)
      } 
    }
  }).catch(error => {
    console.log(error)
    console.log("error====")
  })

  // all heart rate data in heartData.user


  const navigation = useNavigation();
  const { getString, changeLanguage } = useLocalization();
  const [dashboardItem, setDashboardItem] = useState<DashboardItemsModel>(null);

  useEffect(() => {
    DashboardService.getDashboardItems().then(item => {
      setDashboardItem(item);
    });
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
            labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
            datasets: [
              {
                data: [
                  heartData.user.monday,
                  heartData.user.tuesday,
                  heartData.user.wednesday,
                  heartData.user.thursday,
                  heartData.user.friday,
                  heartData.user.saturday,
                  heartData.user.sunday
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
    textAlign:"center",
     color:"#076349",
     fontFamily:"Cochin",
     fontSize:18,
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