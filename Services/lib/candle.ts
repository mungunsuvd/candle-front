import { axiosClient } from "../apiClient";
import { AxiosRequestConfig } from "axios";

type Prop = {
	config?: AxiosRequestConfig;
	body?: any;
	params?: any;
};

export function getAllCandle({ config }: Prop) {
	return axiosClient.get("/client/candle_list", config);
}
export function getCandleDetail({body, config }: Prop) {
	return axiosClient.get(`/client/candle_detail?_id=${body}`, config);
}
export const getCartList = async ({ body }: Prop) => {
	const res = await axiosClient.get(
		"/client/cart",
		{
			headers: {
				Authorization: `Bearer ${body}`,
			},
		}
	);

	return res;
};