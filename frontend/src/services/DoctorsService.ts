import { DoctorModel } from "../models";

export default class DoctorsService {
  public static getDoctors(): Promise<DoctorModel[]> {
    return new Promise((resolve, reject) => {
    });
  }
}
