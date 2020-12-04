import React, { useState, useEffect } from "react";
import {
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
  Divider,
  SectionHeader,
  DoctorItemRow,
} from "../../components";

import { DashboardItemsModel } from "../../models";
import { DashboardService } from "../../services";
import { useLocalization } from "../../localization";
import NavigationNames from "../../navigations/NavigationNames";
// import { HeartRateScreen } from "../campaign/HeartRateScreen";

const api = require('../../../utils/api');

type TProps = {};

export const MediScreen: React.FC<TProps> = props => {
  const [storeInfo, setStoreInfo] = useState(null);
  api.getStore().then(data => {
    if (!storeInfo) {
      // console.log(data)
      data = data.store.map(item => {
        return {
          fullName: item.name,
          title: "Drug Store",
          isOnline: false,
          rating: 5,
          imageUrl:
            "https://img.icons8.com/dusk/344/online-store.png",
          about: item.address,
          reviews: []
        }
      })
      setStoreInfo(data)
    }
    // console.log(storeInfo)
  })



  const navigation = useNavigation();
  const { getString, changeLanguage } = useLocalization();
  const [dashboardItem, setDashboardItem] = useState<DashboardItemsModel>(null);

  useEffect(() => {
    DashboardService.getDashboardItems().then(item => {
      setDashboardItem(item);
    });
  }, []);


  if (dashboardItem === null) {
    return <Text>Loading</Text>;
  }


  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* <Text >{userInfo ? userInfo.email : 'Testttttttt User'}</Text> */}


      <SectionHeader
        title={getString("All Stores Near You")}
        
      />
      <FlatList
        data={storeInfo}
        keyExtractor={(item, index) => `key${index}ForDoctor`}
        renderItem={row => (
          <TouchableOpacity
            style={styles.touchableDoctorItem}
            onPress={() =>
              navigation.navigate(NavigationNames.StoreDetailScreen, {
                // model: JSON.stringify(row.item),
                test: "==============",
                storeInfo: row.item
              })
            }
          >
            <DoctorItemRow item={row.item} />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <Divider h16 />}
        scrollEnabled={false}
      />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titleStyle: { alignItems: "center" },
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