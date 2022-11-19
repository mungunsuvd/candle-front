import { axiosClient } from "../apiClient";
import { AxiosRequestConfig } from "axios";

type Prop = {
	config?: AxiosRequestConfig;
	body?: any;
	params?: any;
};

export function SignUp({ config, body }: Prop) {
	return axiosClient.post("/client/sign_up", body, config);
}

export function SignIn({ config, body }: Prop) {
	return axiosClient.post("/client/login", body, config);
}

export function AuthMe(refresh_token: string) {
	return axiosClient.post("/client/refresh_token", { refreshToken:refresh_token });
}

export function ForgotPasswordOtp({ config, body }: Prop) {
	return axiosClient.post("/nft1004/auth/requestChangePassword", body, config);
}

export function ForgotPasswordChange({ config, body }: Prop) {
	return axiosClient.post("/nft1004/auth/confirmChangePassword", body, config);
}
