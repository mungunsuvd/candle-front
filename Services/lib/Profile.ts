import { axiosClient } from "../apiClient";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export function getProfile({ config, body }: Prop) {
  return axiosClient.get(`/nft1004/customer/profile/me`, config);
}

export function updateProfileSection2({ config, body }: Prop) {
  return axiosClient.post("/nft1004/customer/update/request", body, config);
}

export function approveEmail({ config, body }: Prop) {
  return axiosClient.post("/nft1004/customer/update/approve", body, config);
}
