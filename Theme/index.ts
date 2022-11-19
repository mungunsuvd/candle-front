import {
	extendTheme,
	ThemeConfig,
	withDefaultColorScheme,
	withDefaultVariant,
	// withDefaultVariant,
} from "@chakra-ui/react";
import components from "./Components";
import colors from "./colors";
import styles from "./styles";

const config: ThemeConfig = {
	initialColorMode: "light",
	useSystemColorMode: false,
};

const overrides = { styles, colors, components, config };

const _withDefaultColorScheme = withDefaultColorScheme({
	colorScheme: "brand",
	components: ["Button", "Tabs"],
});

const _withDefaultVariant = withDefaultVariant({
	variant: "left-accent",
	components: ["toast"],
});

export default extendTheme(
	overrides,
	_withDefaultColorScheme,
	_withDefaultVariant
);
