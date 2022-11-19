import axios from "axios";
import { createStandaloneToast } from "@chakra-ui/react";
import Theme from "../Theme";

// eslint-disable-next-line react-hooks/rules-of-hooks
const toast = createStandaloneToast({ theme: Theme });

const axiosCoreClient = axios.create({
	baseURL: `https://micro.nft.mn`,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
		service: process.env.NEXT_PUBLIC_CORE_BASE_URL || "",
	},
});

axiosCoreClient.interceptors.response.use(
	function (response) {
		// console.log(response.request?.responseURL, response.data);
		return response.data;
	},
	function (error) {
		toast({
			title: error.response.data.error || "Алдаа гарлаа",
			description:
				error.response.data.message ||
				"Одоогоор таны хүсэлтыг биелүүлэх боломжгүй байна.",
			status: "error",
			duration: 9000,
			variant: "left-accent",
			isClosable: true,
		});
		return Promise.reject(error);
	}
);

export { axiosCoreClient };
