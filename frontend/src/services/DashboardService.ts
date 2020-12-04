import { DashboardItemsModel, AppointmentModel } from "../models";
import {departmentList } from "../datas";
import moment from "moment";

export const globalAppointmentDate = moment(new Date())
  .add(7, "days")
  .hour(14)
  .minute(30)
  .toDate();

export const globalAppointment: AppointmentModel = {
  title: ".t",
  doctor: {
    fullName: ".",
    about: ".",
    title: ".",
    imageUrl:
      ".",
    isOnline: true,
    rating: 5,
    reviews: []
  },
  appointmentDate: globalAppointmentDate,
  locationName: "."
};

export default class DashboardService {
  public static getDashboardItems(): Promise<DashboardItemsModel> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const model: DashboardItemsModel = {
          appointment: globalAppointment,
          departments: departmentList
        };
        resolve(model);
      }, 100);
    });
  }
}
