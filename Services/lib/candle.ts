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
export const addToCart = async ({ body,config }: Prop) => {
	const res = await axiosClient.post(
		"/client/cart",{candleId: body.candleId},
		
		{
			headers: {
				Authorization: `Bearer ${body.token}`,
			},
		}
	);

	return res;
};
export const payment = async ({ body,config }: Prop) => {
	const res = await axiosClient.post(
		"/client/order",{...body.body},
		
		{
			headers: {
				Authorization: `Bearer ${body.token}`,
			},
		}
	);

	return res;
};
export const checker = async ({ body,config }: Prop) => {
	const res = await axiosClient.post(
		"/client/order_check",{invoice_id: body.invoice_id},
		
		{
			headers: {
				Authorization: `Bearer ${body.token}`,
			},
		}
	);

	return res;
};