import { Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "../Context/UserContext";

const withAuth = (Component: NextPage) => {
  const Auth = (props: any) => {
    const router = useRouter();
    const { get_token, state } = useUser();

    useEffect(() => {
      if (!state.token) router.push("/");
    }, [state]);

    if (get_token() !== undefined) {
      return <Component {...props} />;
    } else {
      return <Text>Please Login</Text>;
    }
  };
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }
  return Auth;
};

export default withAuth;
