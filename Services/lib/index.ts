import { axiosClient } from "../apiClient";
import { axiosCoreClient } from "../coreClient";
import { AxiosRequestConfig } from "axios";

type Prop = {
	config?: AxiosRequestConfig;
	body?: any;
	params?: any;
};
export function CheckHealth({ config }: Prop) {
	return axiosClient.get("/nft1004", config);
}

export function MarketPlaceInit({ config }: Prop) {
	return axiosCoreClient.get("/init", config);
}
