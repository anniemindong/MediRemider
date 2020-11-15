import React, { Component, useState } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView, AsyncStorage, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar, Divider, TouchableHighlight } from "../../components";
import { Theme } from "../../theme";
import { useLocalization } from "../../localization";

type TProps = {};

export const ProfileScreen: React.FC<TProps> = props => {
  const { getString } = useLocalization();

  // const userInfo = await AsyncStorage.getItemSync('user');
  // const value = JSON.parse(userInfo);
  // const name = value.name;
  const [userInfo, setUserInfo] = useState(null);
  AsyncStorage.getItem('user').then(data => {
    console.log("userInfo")
    console.log(userInfo)

    if (!userInfo) {
      setUserInfo(JSON.parse(data))
      console.log(userInfo.email)
    }
    console.log(userInfo)
  }).catch(error => {
    console.log(error)
  })

  const _onChangePressed = async() => {



  };


  return (
    <SafeAreaView style={styles.flex1}>
      <ScrollView
        style={styles.flex1}
        contentContainerStyle={styles.scrollContainer}
      >
        <Avatar
          imageStyle={styles.imageStyle}
          source={require('../../../assets/userProfile.png')}
        />
        <Text style={styles.nameText}>{userInfo ? userInfo.name : 'User'}</Text>
        <Text style={styles.nameText}>{userInfo ? userInfo.email : 'Email'}</Text>
        <Button title="Edit" onPress={_onChangePressed} />
        <View style={{ marginTop: 24 }}>
          {[
            {
              title: getString("My Information"),
              subtitle: "13. days",
              iconName: "ios-egg",
              iconColor: Theme.colors.primaryColor
            },
            {
              title: getString("Calendar"),
              subtitle: getString("Appointments"),
              iconName: "md-calendar",
              iconColor: "#2D9CDB"
            },
            {
              title: getString("Medical"),
              subtitle: getString("Programs"),
              iconName: "ios-medkit",
              iconColor: "#27AE60"
            },
            {
              title: getString("Notifications"),
              subtitle: getString("Show All Notifications"),
              iconName: "md-notifications",
              iconColor: "#F2994A"
            },
            {
              title: getString("Favorite Videos"),
              subtitle: getString("Saved Videos"),
              iconName: "ios-heart",
              iconColor: "#EB5757"
            }
          ].map((item, index) => {
            return (
              <TouchableHighlight key={index} onPress={() => { }}>
                <View>
                  <View style={styles.menuRowContent}>
                    <View style={styles.iconContent}>
                      <Ionicons
                        name={item.iconName}
                        size={26}
                        color={item.iconColor}
                        style={{ alignSelf: "center" }}
                      />
                    </View>
                    <View style={styles.menuRowsContent}>
                      <Text style={styles.menuRowTitle}>{item.title}</Text>
                      <Text style={styles.menuRowSubtitle}>
                        {item.subtitle}
                      </Text>
                    </View>
                    <Ionicons
                      name="ios-arrow-forward"
                      size={24}
                      color={Theme.colors.primaryColor}
                      style={{ alignSelf: "center" }}
                    />
                  </View>
                  <Divider style={styles.divider} />
                </View>
              </TouchableHighlight>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  flex1: { flex: 1 },
  scrollContainer: { paddingVertical: 16 },
  imageStyle: {
    width: 130,
    height: 130,
    borderRadius: 36,
    borderColor: Theme.colors.primaryColor,
    borderWidth: 0.5,
    alignSelf: "center",
    marginTop: 36
  },
  nameText: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "600",
    marginTop: 16,
    color: Theme.colors.black
  },
  daysText: {
    alignSelf: "center",
    fontSize: 14,
    marginTop: 6,
    color: Theme.colors.black
  },
  menuRowContent: {
    flexDirection: "row",
    paddingStart: 12,
    paddingEnd: 16,
    paddingVertical: 16
  },
  iconContent: {
    width: 32
  },
  menuRowsContent: { paddingHorizontal: 8, flex: 1 },
  menuRowTitle: {
    fontSize: 17
  },
  menuRowSubtitle: {
    fontSize: 12,
    marginTop: 4
  },
  divider: { marginStart: 46 }
});
