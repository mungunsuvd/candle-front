import {
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

import { Borders } from "../../../Theme/common";

interface Step1 {
  setValue: Dispatch<SetStateAction<string>>;
  setDial: Dispatch<SetStateAction<string>>;
}

const Step1 = ({ setValue, setDial }: Step1) => {
  const bg = useColorModeValue("white", "#2d3748");

  return (
    <FormControl>
      <FormLabel>{"e-mail"}</FormLabel>
      {/* <PhoneInput
				masks={{ mn: ".... ...." }}
				inputStyle={{
					backgroundColor: "transparent",
					fontSize: "16px",
					fontFamily: "Nunito",
					width: "100%",
					height: "40px",
					borderRadius: Borders.md,
				}}
				dropdownStyle={{
					maxWidth: "272px",
					backgroundColor: bg,
				}}
				buttonStyle={{
					backgroundColor: "transparent",
					borderTopLeftRadius: Borders.md,
					borderBottomLeftRadius: Borders.md,
				}}
				country="mn"
				onChange={(
					phone,
					data: {
						dialCode: string;
					}
				) => {
					const dialLen = data.dialCode.length;
					const myPhone = phone.slice(dialLen);
					setDial(data.dialCode);
					setValue(myPhone);
				}}
			/> */}
      <Input type="email" onChange={(e) => setValue(e.target.value)} />
    </FormControl>
  );
};

export default Step1;
