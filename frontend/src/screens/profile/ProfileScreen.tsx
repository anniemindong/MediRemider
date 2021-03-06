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
    if (!userInfo) {
      setUserInfo(JSON.parse(data))
    }
  }).catch(error => {
    console.log(error)
  })

  // const [name, setName] = useState({ value: '', error: '' });
  // const [email, setEmail] = useState({ value: '', error: '' });
  // const [dob, setDob] = useState({ value: '', error: '' });
  // const [Medicine, setMedicine] = useState({ value: '', error: '' });
  // const [emergencyContact, setEmergencyContact] = useState({ value: '', error: '' });

  // const _onChangePressed = async() => {



  // };


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
        {/* <Text style={styles.nameText}>{userInfo ? userInfo.email : 'Email'}</Text> */}
        {/* <Button title="Edit" onPress={_onChangePressed} /> */}
        <View style={{ marginTop: 24 }}>
          {[
            {
              title: getString("My Address"),
              subtitle: <Text>{userInfo ? userInfo.address : 'Address'}</Text>,
              iconName: "ios-egg",
              iconColor: Theme.colors.primaryColor
            },
            {
              title: getString("Email"),
              subtitle: <Text>{userInfo ? userInfo.email : 'email'}</Text>,
              iconName: "ios-heart",
              iconColor: "#EB5757"
            },
            {
              title: getString("Date of Birth"),
              subtitle: <Text>{userInfo ? userInfo.dob : 'dob'}</Text>,
              iconName: "md-calendar",
              iconColor: "#2D9CDB"
            },
            {
              title: getString("Medicine"),
              subtitle: <Text>{userInfo? userInfo.medicine : 'unknow'}</Text>,
              iconName: "ios-medkit",
              iconColor: "#27AE60"
            },
            {
              title: getString("Emergency Contact"),
              subtitle: <Text>{userInfo ? userInfo.emergency : 'unknow'}</Text>,
              iconName: "md-notifications",
              iconColor: "#F2994A"
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