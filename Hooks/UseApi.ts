import { AxiosRequestConfig } from "axios";
import { useState } from "react";

import { useUser } from "../Context/UserContext";

type Prop = {
	service: Function;
	params?: any;
};

type ConfigProp = {
	myConfig?: AxiosRequestConfig;
	token: string | undefined;

};

const build_config = ({ myConfig, token }: ConfigProp) => {
	return {
		...myConfig,
		headers: {
			...myConfig?.headers,
	
			Authorization: `Bearer ${token}`,
		},
	};
};

export function UseApi({ service, params }: Prop) {
	const [data, setData] = useState<any>(null);
	const [error, setError] = useState<any>(null);
	const [isLoading, setLoading] = useState(false);
	const { get_token, dispatcher } = useUser();


	const fetch = async (body?: any, myConfig?: AxiosRequestConfig) => {
		try {
			setLoading(true);
			setError(null);
			setData(null);
			const token = get_token();
			const config = build_config({ myConfig, token });
			const res = await service({ config, body, params });
			setData(res);
			setLoading(false);
			return res;
		} catch (err: any) {
			setError(err);
			setLoading(false);
			// if (err?.response?.status === 410)
			// 	dispatcher({
			// 		type: "logout",
			// 	});
			return err;
		}
	};

	return [{ data, isLoading, error }, fetch] as const;
}
