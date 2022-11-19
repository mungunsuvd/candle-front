import { AxiosRequestConfig } from "axios";
import { axiosCoreClient } from "../coreClient";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export const GetSearchQuery = ({ config }: Prop) => {
  return axiosCoreClient.get(`/search`,config);
};
