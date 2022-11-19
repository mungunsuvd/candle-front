import { useBreakpointValue } from "@chakra-ui/react";

type Prop = "modal-sm" | "drawer";

export function UseSize(props: Prop) {
	const modalSm = useBreakpointValue({
		base: "xs",
		sm: "sm",
	});

	const drawer = useBreakpointValue({
		base: "full",
		xs: "xs",
		md: "sm",
	});

	switch (props) {
		case "modal-sm":
			return modalSm;
		case "drawer":
			return drawer;
	}
}
