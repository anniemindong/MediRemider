import React, { useState } from "react";
import { View } from "react-native-animatable";
import { TextInput, StyleSheet, Text, Button, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getEvents, postEvent } from "../../../utils/api.event";
import { NavigationNames } from "../../navigations";
import { Theme } from "../../theme";

export function NewAppointmentScreen({ navigation }) {
  const [title, setTitle] = useState("New Event");
  const [desc, setDesc] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const dispatch = useDispatch();

  return (
    <View
      style={{
        backgroundColor: "#fff",
      }}
    >
      <TextInput
        style={{
          padding: 12,
          borderBottomColor: "lightgray",
          borderBottomWidth: 1,
        }}
        placeholder={"Title"}
        onChangeText={(text) => setTitle(text)}
        value={title}
      />

      {/* <TouchableOpacity onPress={() => setShowDate(true)}>
                <Text
                    style={{
                        padding: 12,
                        borderBottomColor: 'lightgray',
                        borderBottomWidth: 1,
                        color: 'rgb(0,90,200)'
                    }}>
                    {`Date: ${time.getHours()}:${time.getMinutes()}, ${date.getMonth() + 1
                        }/${date.getDate()}/${date.getFullYear()}`}
                </Text>
            </TouchableOpacity> */}

      <TextInput
        multiline
        numberOfLines={5}
        style={{
          padding: 12,
          borderBottomColor: "lightgray",
          borderBottomWidth: 1,
        }}
        placeholder="description"
        onChangeText={(t) => setDesc(t)}
        value={desc}
      />

      {
        <DateTimePicker
          testID="dp"
          value={date}
          mode="datetime"
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {
            // console.log(selectedDate);
            const cur = selectedDate ?? date;
            setShowDate(false);
            // setShowTime(true);
            setDate(cur);
          }}
        />
      }
      {/* {<DateTimePicker
                testID='dp'
                value={time}
                mode='time'

                display='default'
                onChange={(event, selectedDate) => {
                    const cur = selectedDate ?? date;
                    setShowTime(false);
                    setTime(cur);
                }} />} */}

      <Button
        title="Save"
        onPress={async () => {
          const d = new Date(date);
          // d.setHours(time.getHours());
          // d.setMinutes(time.getMinutes());
          d.setSeconds(0, 0);

          const payload = {
            name: title,
            date: d.getTime(),
            desc: desc,
          };
          await postEvent(payload);
          const events = await getEvents();
          dispatch({
            type: "LOAD_EVENTS",
            data: events,
          });
          navigation.navigate(NavigationNames.CalendarScreen);
        }}
      />
    </View>
  );
}

