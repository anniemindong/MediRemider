import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Theme } from "../theme";
import NavigationNames from "./NavigationNames";
import { useLocalization } from "../localization";
import { stackScreenOptions, tabScreenOptions } from "./NavigationHelper";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import {
  HomeScreen,
  ProfileScreen,
  MenuScreen,
  CalendarScreen,
  MediaScreen,
  CampaignListScreen,
  CampaignDetailScreen,
  DepartmentListScreen,
  DepartmentDetailScreen,
  MediaDetailScreen,
  NewAppointmentScreen,
  DoctorListScreen,
  DoctorDetailScreen,
  EventListScreen,
} from "../screens";
import { ToolbarBrandLogo } from "../components";
import { modifyEvent } from "../../utils/api.event";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabStack = () => {
  const { getString } = useLocalization();
  return (
    <Stack.Navigator headerMode="screen" screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={NavigationNames.HomeScreen}
        component={HomeScreen}
        options={{ headerTitle: () => <ToolbarBrandLogo /> }}
      />
      <Stack.Screen
        name={NavigationNames.CampaignListScreen}
        component={CampaignListScreen}
        options={{ title: getString("Campaigns") }}
      />
      <Stack.Screen
        name={NavigationNames.CampaignDetailScreen}
        component={CampaignDetailScreen}
      />
      <Stack.Screen
        name={NavigationNames.DepartmentListScreen}
        component={DepartmentListScreen}
       // options={{ title: getString("Our Departments") }}
        options={{ title: getString("Medicine Savings") }}
      />
      <Stack.Screen
        name={NavigationNames.DepartmentDetailScreen}
        component={DepartmentDetailScreen}
      />
      <Stack.Screen
        name={NavigationNames.NewAppointmentScreen}
        component={NewAppointmentScreen}
        options={{ title: getString("New Appointment") }}
      />
      <Stack.Screen
        name={NavigationNames.DoctorListScreen}
        component={DoctorListScreen}
        options={{ title: getString("Doctors") }}
      />
      {/* <Stack.Screen
        name={NavigationNames.DoctorDetailScreen}
        component={DoctorDetailScreen}
      /> */}
    </Stack.Navigator>
  );
};

async function permission() {
  // ... somewhere before scheduling notifications ...
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
}

permission();

const store = createStore(
  combineReducers({
    events: (state = [], action) => {
      switch (action.type) {
        case "LOAD_EVENTS":
          return action.data ?? [];
        case "ADD_EVENT":
          state.push(action.data);
          return state;
        case "SET_NOTIFIED":
          action.data.notified = true;
          modifyEvent(action.data);
          return state;
        case "DELETE_EVENT":
          const idx = state.findIndex((event) => event === action.data);
          if (idx >= 0) state.splice(idx, 1);
          action.data.alerted = true;
          return [...state];
        default:
          return state;
      }
    },
  })
);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
function sendNotification(content) {
  Notifications.scheduleNotificationAsync({
    content: {
      title: content.title ?? "No Title",
      body: content.body ?? "",
    },
    trigger: null,
  });
}

sendNotification({ title: "Welcome", body: "Yep" });

setInterval(() => {
  const root = store.getState();
  const events = root.events ?? [];
  console.log("Check Events");
  events.forEach((event) => {
    // console.log(event)
    if (event.notified !== true && event.date <= Date.now()) {
      store.dispatch({
        type: "SET_NOTIFIED",
        data: event,
      });
      // console.log(event);
      sendNotification({
        title: event.name,
        body: event.desc,
      });
    }
  });
}, 30000);

const CalendarTabStack = () => {
  const { getString } = useLocalization();
  return (
    <Provider store={store}>
      <Stack.Navigator headerMode="screen" screenOptions={stackScreenOptions}>
        <Stack.Screen
          name={NavigationNames.CalendarScreen}
          component={CalendarScreen}
          options={{ title: "Events" }}
        />
        <Stack.Screen
          name={NavigationNames.NewAppointmentScreen}
          component={NewAppointmentScreen}
          options={{ title: "New Event" }}
        />
        {/* <Stack.Screen
          name={NavigationNames.DoctorDetailScreen}
          component={DoctorDetailScreen}
        /> */}
      </Stack.Navigator>
    </Provider>
  );
};

const MediaTabStack = () => {
  const { getString } = useLocalization();
  return (
    <Stack.Navigator headerMode="screen" screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={NavigationNames.MediaScreen}
        component={MediaScreen}
        options={{ title: getString("Medicine") }}
      />
      <Stack.Screen
        name={NavigationNames.DoctorListScreen}
        component={DoctorListScreen}
        options={{ title: getString("Doctors") }}
      />
      <Stack.Screen
        name={NavigationNames.MediaDetailScreen}
        component={MediaDetailScreen}
        options={{ title: getString("Media") }}
      />
      <Stack.Screen
        name={NavigationNames.DoctorDetailScreen}
        component={DoctorDetailScreen}
      />
    </Stack.Navigator>
  );
};


const ProfileTabStack = () => {
  return (
    <Stack.Navigator headerMode="screen" screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={NavigationNames.ProfileScreen}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MenuTabStack = () => {
  const { getString } = useLocalization();
  return (
    <Stack.Navigator headerMode="screen" screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={NavigationNames.MenuScreen}
        component={MenuScreen}
        options={{ title: getString("Menu") }}
      />
      <Stack.Screen
        name={NavigationNames.EventListScreen}
        component={EventListScreen}
        options={{ title: getString("Events") }}
      />
    </Stack.Navigator>
  );
};

const HomePageTabNavigator = () => (
  <Tab.Navigator
    screenOptions={tabScreenOptions}
    tabBarOptions={{
      activeTintColor: Theme.colors.primaryColor,
      inactiveTintColor: Theme.colors.gray,
    }}
  >
    <Tab.Screen name={NavigationNames.HomeTab} component={HomeTabStack} />
    <Tab.Screen
      name={NavigationNames.CalendarTab}
      component={CalendarTabStack}
    />
    <Tab.Screen name={NavigationNames.MediaTab} component={MediaTabStack} />
    <Tab.Screen name={NavigationNames.ProfileTab} component={ProfileTabStack} />
    <Tab.Screen name={NavigationNames.MenuTab} component={MenuTabStack} />
  </Tab.Navigator>
);

export default HomePageTabNavigator;