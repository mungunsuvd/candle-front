import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BodyInterface } from ".";
import { UseApi } from "../../Hooks/UseApi";

import { SignIn as _SignIn } from "../../Services/lib/Auth";
import { UseInput } from "../../Hooks/UseInput";
import { FormEvent, useEffect } from "react";
import { useUser } from "../../Context/UserContext";
import { Toaster } from "../../Services/assets/Toaster";

function SignIn({ ChangeHandler, setCred }: BodyInterface) {
  const { bind: userNameBind, value: credential } = UseInput();
  const { bind: passwordBind, value: password } = UseInput();
  const { dispatcher } = useUser();
  const [{ data, isLoading }, fetch] = UseApi({
    service: _SignIn,
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      if (data.code) {
        setCred({
          code: data.code,
          credential: data.credential,
        });
      } else {
        const { accessToken, refreshToken } = data;
        Toaster({ type: "login_success" });
        dispatcher({
          type: "login",
          state: {
            token: accessToken,
            refresh_token: refreshToken,
          },
        });
      }
    }
  }, [data]);

  const IsDisabled = () => {
    return credential === "" || password === "";
  };

  const Handler = (e: FormEvent) => {
    e.preventDefault();
    fetch({ email: credential, password });
  };

  return (
    <Stack as="form" onSubmit={Handler}>
      <FormControl>
        <FormLabel>{"Цахим шуудан "}</FormLabel>
        <Input {...userNameBind} type="username" />
      </FormControl>
      <FormControl>
        <HStack alignItems="flex-start" justifyContent="space-between">
          <FormLabel>{"Нууц үг"}</FormLabel>
        </HStack>
        <Input {...passwordBind} type="password" />
      </FormControl>
      <Button isDisabled={IsDisabled()} type="submit" isLoading={isLoading}  style={{backgroundColor: '#D6CFDF', color:'black'}}>
        {"Нэвтрэх "}
      </Button>
      <Divider />
      <Button
        variant={"outline"}
        style={{borderColor:'#D6CFDF', color: 'black'}}
        isDisabled={isLoading}
        onClick={() => ChangeHandler("sign-up")}
      >
        {"Бүртгүүлэх "}
      </Button>
    </Stack>
  );
}

export default SignIn;
