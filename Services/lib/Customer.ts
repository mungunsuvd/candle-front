import { axiosClient } from "../apiClient";
import { AxiosRequestConfig } from "axios";

type Prop = {
	config?: AxiosRequestConfig;
	body?: any;
	params?: any;
};

type resType = {
	total: number;
	balance: number;
	locked: number;
	address: string | null;
};

export const getELFCBalance = async ({ body }: Prop) => {
	const res: resType = await axiosClient.get(
		"/nft1004/customer/getELFCBalance",
		{
			headers: {
				Authorization: `Bearer ${body}`,
			},
		}
	);

	return res;
};

export function GetInitialBuyers({ body, config }: Prop) {
	return axiosClient.get("/nft1004/customer/getInitialBuyers", {
		...config,
		params: {
			...config?.params,
			templateId: body,
		},
	});
}

export function GetElfcRate({ config }: Prop) {
	return axiosClient.get("/nft1004/customer/getElfcRate", config);
}
