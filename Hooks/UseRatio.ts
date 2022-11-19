import { useBreakpointValue } from "@chakra-ui/react";

type Prop = "main-ratio" | "banner-ratio" | "static-banner";

export function UseRatio(props: Prop) {
	const MainRatio = useBreakpointValue({
		base: 2 / 3,
		lg: 21 / 9,
	});

	const BannerRatio = useBreakpointValue({
		base: 2 / 3,
		lg: 16 / 9,
	});
	const StaticCollectionBannerRatio = useBreakpointValue({
		base: 3 / 2,
		md: 3 / 1,
		lg: 5 / 1,
	});

	switch (props) {
		case "main-ratio":
			return MainRatio;
		case "banner-ratio":
			return BannerRatio;
		case "static-banner":
			return StaticCollectionBannerRatio;
	}
}
