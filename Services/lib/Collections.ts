import { AxiosRequestConfig } from "axios";
import { axiosCoreClient } from "../coreClient";

type Prop = {
	config?: AxiosRequestConfig;
	body?: any;
	params?: any;
};

export const GetCollections = ({ config }: Prop) => {
	return axiosCoreClient.get("/collection", config);
};

export const GetUpComings = ({body, config} : Prop) => {
	return axiosCoreClient.get("/feature/upcoming" , {
		...config,
		params :{
			limit : body.limit  
		}
	})
}

export const GetCollectionByShort = ({ body, config }: Prop) => {
	return axiosCoreClient.get("/collection", {
		...config,
		params: {
			page: 1,
			limit: 10,
			short: true,
			search: body,
			...config?.params,
		},
	});
};
