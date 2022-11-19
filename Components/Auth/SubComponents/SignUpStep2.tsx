import {
  Collapse,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { Bind } from "../../../utils/index.tdo";

import { useState } from "react";
import { Borders } from "../../../Theme/common";

interface Step2 {
  bindpassword: Bind;
  binduserName: Bind;
  bindpasswordRepeat: Bind;
  isValid: {
    password: boolean;
    username: boolean;
  };
}

type Req = {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
};

export const IsDisabled = (isPassValid: Req) => {
  return (
    isPassValid.length &&
    isPassValid.uppercase &&
    isPassValid.lowercase &&
    isPassValid.number &&
    isPassValid.special
  );
};

const Requirement = ({ isPassValid }: { isPassValid: Req }) => {
  const common = (valid: boolean) => (valid ? "green" : "red");
  return (
    <Stack
      borderRadius={Borders.md}
      border="1px solid"
      borderColor={IsDisabled(isPassValid) ? "green" : "red"}
      p={2}
    >
      <HStack>
        <Text color={common(isPassValid.length)}>{"lenght"}</Text>
      </HStack>
      <HStack>
        <Text color={common(isPassValid.uppercase)}>{"Uppercase"}</Text>
      </HStack>
      <HStack>
        <Text color={common(isPassValid.lowercase)}>{"Lowercase"}</Text>
      </HStack>
      <HStack>
        <Text color={common(isPassValid.number)}>{"Phone Number"}</Text>
      </HStack>
      <HStack>
        <Text color={common(isPassValid.special)}>{"Special"}</Text>
      </HStack>
    </Stack>
  );
};

const Step2 = ({
  bindpassword,
  binduserName,
  bindpasswordRepeat,
  isValid,
}: Step2) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isPassValid, setPassValid] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  return (
    <>
      <FormControl isInvalid={isValid.username}>
        <FormLabel>{"username"}</FormLabel>
        <Input type="username" {...binduserName} />
        <FormErrorMessage>
          Нэвтрэх нэр хоосон зай агуулж бологүй
        </FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={!IsDisabled(isPassValid) && bindpassword.value !== ""}
      >
        <FormLabel>{"password"}</FormLabel>
        <Input
          type="password"
          autoComplete="new-password"
          onFocusCapture={onOpen}
          onBlurCapture={onClose}
          value={bindpassword.value}
          onChange={(e) => {
            setPassValid(validatePassword(e.target.value));
            bindpassword.onChange(e);
          }}
        />
        <FormErrorMessage>Нууц үг шаардлага хангахгүй байна.</FormErrorMessage>
      </FormControl>
      <Collapse in={isOpen}>
        <Requirement isPassValid={isPassValid} />
      </Collapse>
      <FormControl isInvalid={isValid.password}>
        <FormLabel>{"password Repeat"}</FormLabel>
        <Input type="password" {...bindpasswordRepeat} />
        <FormErrorMessage>
          Давтан оруулсан нууц үг таарахгүй байна.
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

export const validatePassword = (password: string) => {
  const obj: Req = {
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  };
  if (password.length > 7) obj.length = true;
  if (/[A-Z]/g.test(password)) obj.uppercase = true;
  if (/[a-z]/g.test(password)) obj.lowercase = true;
  if (/[0-9]/g.test(password)) obj.number = true;
  if (/[\^$*.[\]{}()?\-“!@#%&/,><’:;|_~`]/g.test(password)) obj.special = true;
  return obj;
};

export default Step2;
