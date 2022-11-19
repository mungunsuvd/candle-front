import type { AppProps } from "next/app";
import Layout from "../Layout";
import { ChakraProvider } from "@chakra-ui/react";
import Theme from "../Theme";
import { UserProvider } from "../Context/UserContext";
import "../styles/globals.css";
import { AuthModalProvider } from "../Context/AuthModalContext";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";

function MyApp(AppProps: AppProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const pathname = router.pathname
      .split("/")[1]
      .replaceAll("-", " ")
      .split(" ");
    if (pathname.length === 1) return setTitle("Home");
    if (pathname.length === 0) return setTitle("Home");
    setTitle(
      pathname.map((el) => el.charAt(0).toUpperCase() + el.slice(1)).join(" ")
    );
  }, [router]);

  return (
    <>
      <ChakraProvider theme={Theme}>
        <Head>
          <title>{title}</title>
          {/* <link rel="icon" href="/logo_white.png" type="image/png" /> */}
        </Head>

        <UserProvider>
          <AuthModalProvider>
            <Layout {...AppProps} />
          </AuthModalProvider>
        </UserProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
