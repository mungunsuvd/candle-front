import toastText from "../../utils/toast.json";
import { createStandaloneToast } from "@chakra-ui/react";
import Theme from "../../Theme";

enum Types {
	success_edit_profile,
	copy_success,
	copy_fail,
	register_success,
	list_false,
	success_delist,
	login_success,
	reset_password,
	signup_success,
	make_profile_success,
}

type Toaster = {
	type: keyof typeof Types;
};

const toast: Function = createStandaloneToast({ theme: Theme });

export const Toaster = ({ type }: Toaster) => {
	toast({
		title: toastText[type].title,
		description: toastText[type].description,
		status: toastText[type].status,
		duration: 9000,
		isClosable: true,
		variant: "left-accent",
	});
};
