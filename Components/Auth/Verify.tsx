import {
  Alert,
  Button,
  HStack,
  PinInput,
  PinInputField,
  Stack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Cred } from ".";
import { useUser } from "../../Context/UserContext";
import { UseApi } from "../../Hooks/UseApi";
import { UseInput } from "../../Hooks/UseInput";
import { Toaster } from "../../Services/assets/Toaster";
import { Verify } from "../../Services/lib/Auth";

function VerifyUser({ cred }: { cred: Cred }) {
  const { setValue: setOtp, value: otp } = UseInput();
  const [{ data, isLoading, error }, fetch] = UseApi({
    service: Verify,
  });
  const { dispatcher } = useUser();

  useEffect(() => {
    if (otp.length === 6) {
      fetch({
        otp,
        ...cred,
      });
    }
  }, [otp]);

  useEffect(() => {
    if (data) {
      Toaster({ type: "login_success" });
      dispatcher({
        type: "login",
        state: {
          token: data.access_token,
          refresh_token: data.refresh_token,
        },
      });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setOtp("");
    }
  }, [error]);

  return (
    <Stack>
      <Alert>{"OTP"}</Alert>
      <HStack>
        <PinInput
          otp
          onChange={(e) => {
            setOtp(e);
          }}
        >
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>
      <Button isLoading={isLoading} isDisabled={otp.length < 6}>
        {"Login"}
      </Button>
    </Stack>
  );
}

export default VerifyUser;
