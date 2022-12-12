import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormErrorMessage,
  Grid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import { BodyInterface } from ".";
import { UseInput } from "../../Hooks/UseInput";

import { UseApi } from "../../Hooks/UseApi";
import { SignUp as _SignUp } from "../../Services/lib/Auth";
import Step2, {
  IsDisabled as _IsDisabled,
  validatePassword,
} from "./SubComponents/SignUpStep2";
import Step1 from "./SubComponents/SignUpStep1";
import { Toaster } from "../../Services/assets/Toaster";

function SignUp({ ChangeHandler, setCred }: BodyInterface) {
  const { value: phoneNumber, setValue: setPhoneNumber } = UseInput();
  const { value: userName, bind: binduserName } = UseInput();
  const { value: password, bind: bindpassword } = UseInput();
  const { value: passwordRepeat, bind: bindpasswordRepeat } = UseInput();
  const { value: dial, setValue: setDial } = UseInput();
  const [isAgreed, setAgreed] = useState(false);
  const [isAgreedValid, setAgreedValid] = useState(false);
  const [isValid, setValid] = useState({
    password: false,
    username: false,
  });
  const [{ isLoading: SignUpIsloading, data }, fetch] = UseApi({
    service: _SignUp,
  });

  const AgreeHandler = () => {
    if (isAgreed) {
      setAgreedValid(false);
      return true;
    } else {
      setAgreedValid(true);
      return false;
    }
  };

  const usernameHandler = () => {
    if (!/\s/g.test(userName)) {
      setValid((p) => {
        return { ...p, username: false };
      });
      return true;
    } else {
      setValid((p) => {
        return { ...p, username: true };
      });
      return false;
    }
  };

  useEffect(() => {
    if (data) {
      Toaster({
        type: "signup_success",
      });
      setCred({
        code: data.code,
        credential: data.credential,
      });
      ChangeHandler("verify");
    }
  }, [data]);

  const passHandler = () => {
    if (passwordRepeat === password) {
      setValid((p) => {
        return { ...p, password: false };
      });
      return true;
    } else {
      setValid((p) => {
        return { ...p, password: true };
      });
      return false;
    }
  };

  const StepHandler = (e: FormEvent) => {
    e.preventDefault();
    if (passHandler() && usernameHandler() && AgreeHandler())
      fetch({
        email: phoneNumber,
        userName,
        password,
        // countryCode: `+${dial}`,
      });
  };

  const IsDisabled = () => {
    return (
      phoneNumber === "" ||
      password === "" ||
      passwordRepeat === "" ||
      userName === "" ||
      !_IsDisabled(validatePassword(password))
    );
  };

  const Step2Props = {
    bindpassword,
    binduserName,
    bindpasswordRepeat,
    isValid,
  };

  return (
    <form autoComplete="off" onSubmit={StepHandler}>
      <Stack>
        <Step1 setDial={setDial} setValue={setPhoneNumber} />
        <Step2 {...Step2Props} />
        <FormControl maxW="90%" isInvalid={isAgreedValid}>
          <Checkbox
            isChecked={isAgreed}
            onChange={(e) => setAgreed(e.target.checked)}
          >
            <Text fontSize="12px" textAlign="center">
             Үйлчилгээний нөхцөлийг зөвшөөрч байна.
            </Text>
          </Checkbox>
          <FormErrorMessage>
          Үйлчилгээний нөхцөлтэй танилцаж, зөвшөөрсөн тохиолдолд бүртгүүлэх боломжтой.
          </FormErrorMessage>
        </FormControl>
        <Button
           style={{backgroundColor: '#D6CFDF', color:"black"}}
          isLoading={SignUpIsloading}
          isDisabled={IsDisabled()}
          type="submit"
        >
          {"Бүртгүүлэх"}
        </Button>
        <Divider />
        <Button
          style={{borderColor:'#D6CFDF', color: 'black'}}
          isDisabled={SignUpIsloading}
          variant='link'
          onClick={() => ChangeHandler("login")}
        >
          {"Нэвтрэх"}
        </Button>
      </Stack>
    </form>
  );
}

export default SignUp;
