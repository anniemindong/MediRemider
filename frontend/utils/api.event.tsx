import axios from "axios";
import { AsyncStorage } from "react-native";
const BASE_URL = require("./api.js").BASE_URL;

export const getEvents = async function () {
  const result = await axios.get(`${BASE_URL}/event`);
  return result.data;
};

export const postEvent = async function (event: any) {
  const user = (await AsyncStorage.getItem("user")) ?? "{}";
  event.userId = JSON.parse(user)._id;
  if (!event.userId) return;
  const result = await axios.post(`${BASE_URL}/event`, event);
  return result.data;
};

export const modifyEvent = async function (event: any) {
  const user = (await AsyncStorage.getItem("user")) ?? "{}";
  const result = await axios.put(`${BASE_URL}/event/${event._id}`, event);
  return result.data;
};

export const deleteEvent = async function (event: any) {
  const user = (await AsyncStorage.getItem("user")) ?? "{}";
  const result = await axios.delete(`${BASE_URL}/event/${event._id}`, event);
  return result.data;
};
