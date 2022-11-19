import { ThemeComponentProps } from "@chakra-ui/theme";
import { Borders } from "../common";

const Button = {
  baseStyle: {
    borderRadius: Borders.md,
  },
  variants: {
    solid: (props: ThemeComponentProps) => ({}),
  },
};

export default Button;
