import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, getEvents } from "../../../utils/api.event";
import { NavigationNames } from "../../navigations";
import { Theme } from "../../theme";
import { FabButton, Button } from "../../components/buttons";

export const CalendarScreen = ({ navigation }) => {
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();
  const events = useSelector((state) =>
    state.events.sort((a, b) => a.date - b.date)
  );
  // console.log(events)
  useEffect(() => {
    if (loaded) return;
    (async () => {
      const result = await getEvents();
      dispatch({
        type: "LOAD_EVENTS",
        data: result,
      });
      setLoaded(true);
    })();
  });

  if (loaded === false)
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: "darkgrey",
            textAlign: "center",
          }}
        >
          Loading..
        </Text>
      </View>
    );

  if (events.length === 0)
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <View style={styless.emptyDataContainer}>
          <Text style={styless.emptyDataTitle}>{"Event list is empty"}</Text>
          <View style={styless.emptyDataButtonContainer}>
            <Button
              title={"New Event"}
              type="outline"
              onPress={() => {
                navigation.navigate(NavigationNames.NewAppointmentScreen);
              }}
            />
          </View>
        </View>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 14,
          color: "darkgray",
          textAlign: "center",
          marginTop: 12,
        }}
      >
        Upcoming
      </Text>
      <View
        style={{
          height: `25%`,
          justifyContent: "center",
          alignItems: "center",
          borderBottomColor: "lightgray",
          borderBottomWidth: 1,
          width: "100%",
          padding: 10,
        }}
      >
        <Text style={styles.title}>{events[0].name}</Text>
        <Text style={styles.description}>
          {new Date(events[0].date).toLocaleString()}
        </Text>
        <Text style={styles.description}>{events[0].desc ?? ""}</Text>
        <View style={styles.separator}></View>
        <TouchableOpacity
          onPress={async () => {
            await deleteEvent(events[0]);
            dispatch({
              type: "DELETE_EVENT",
              data: events[0],
            });
          }}
        >
          <Text style={{ color: "red" }}>Dismiss</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%", alignItems: "center", paddingTop: 12 }}>
        <Text style={styles.description}>Up coming events</Text>
      </View>
      <ScrollView
        style={{
          width: "100%",
        }}
      >
        {events.map((event, idx) => {
          if (idx === 0) {
            return;
          }

          return (
            <View
              key={idx}
              style={{
                height: "auto",
                width: "100%",
                padding: 10,
              }}
            >
              <Text style={styles.title}>{event.name}</Text>
              <Text style={styles.description}>
                {new Date(event.date).toLocaleString()}
              </Text>
              <Text style={styles.description}>{event.desc ?? ""}</Text>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                }}
                onPress={async () => {
                  await deleteEvent(event);
                  dispatch({
                    type: "DELETE_EVENT",
                    data: event,
                  });
                }}
              >
                <Text style={{ color: "red" }}>Dismiss</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(NavigationNames.NewAppointmentScreen);
        }}
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          backgroundColor: "#45aaf2",
          padding: 12,
          borderRadius: 100,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
      >
        <Text
          style={{
            color: "white",
          }}
        >
          New Event
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    height: "100%",
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "darkgray",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

const styless = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: Theme.colors.formBackground,
  },
  infoText: {
    fontSize: 22,
    fontWeight: "600",
    paddingBottom: 12,
    marginTop: 8,
  },
  calendarItem: {
    backgroundColor: "white",
    marginStart: 8,
    marginEnd: 8,
    shadowRadius: 2,
    shadowColor: "gray",
    shadowOpacity: 0.1,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  emptyDataContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyDataTitle: {
    color: Theme.colors.black,
    marginTop: 8,
    paddingHorizontal: 40,
    fontSize: 15,
    textAlign: "center",
    fontWeight: "100",
  },
  emptyDataButtonContainer: {
    marginTop: 24,
  },
});
