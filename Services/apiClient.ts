import axios from "axios";
import { useToast } from '@chakra-ui/react'
import Theme from "../Theme";

// eslint-disable-next-line react-hooks/rules-of-hooks
// const toast = useToast();

const axiosClient = axios.create({
	baseURL: `http://localhost:2470//`,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
		service: process.env.NEXT_PUBLIC_BASE_URL || "core",
	},
});

axiosClient.interceptors.response.use(
	function (response) {
		// console.log(response.request?.responseURL, response.data);
		return response.data;
	},
	function (error) {
		// toast({
		// 	title: error.response.data.error || "Алдаа гарлаа",
		// 	description:
		// 		error.response.data.message ||
		// 		"Одоогоор таны хүсэлтыг биелүүлэх боломжгүй байна.",
		// 	status: "error",
		// 	duration: 9000,
		// 	variant: "left-accent",
		// 	isClosable: true,
		// });
		return Promise.reject(error);
	}
);

export { axiosClient };
