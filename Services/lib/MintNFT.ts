import { axiosClient } from "../apiClient";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};
export function MintNFT({ config, body }: Prop) {
  return axiosClient.post(`/nft1004/transaction/mintNFT`, body, config);
}
