import { DepartmentServiceModel } from "./DepartmentServiceModel";
import { NewsPostModel } from "./NewsPostModel";
import { ImageModel } from "./ImageModel";
import { Image } from "react-native-svg";

export type DepartmentModel = {
  title: string;
  imageUrl: string;
  shortDescription: string;
  htmlContent: string;
  // departmentServices: DepartmentServiceModel[];
  // newsPosts: NewsPostModel[];
  images: ImageModel[];
};
