import { axiosClient } from "../apiClient";
import { AxiosRequestConfig } from "axios";
import { axiosCoreClient } from "../coreClient";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export function GetNftById({ config, body }: Prop) {
  return axiosCoreClient.get(`/nft/${body}`, config);
}

export function fetchNFTs({ config, body }: Prop) {
  return axiosClient.get(`/nft1003/v1/nft/search/${body}`, config);
}

export function fetchNFTlog({ config, body }: Prop) {
  return axiosCoreClient.get(`/nft/${body}/logs`, config);
}
