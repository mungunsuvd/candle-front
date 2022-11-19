import { mode, Styles } from "@chakra-ui/theme-tools";

const styles: Styles = {
	global: (props) => ({
		body: {
			fontFamily: "Comfortaa",
			bg: mode("gray.100", "gray.800")(props),
		},
	}),
};

export default styles;
