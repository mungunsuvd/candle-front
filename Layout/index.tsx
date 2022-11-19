import { Box, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { AppProps } from "next/dist/shared/lib/router/router";
import { Sidebar } from "./Sidebar";
import Auth from "../Components/Auth";
import { useUser } from "../Context/UserContext";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { useRouter } from "next/router";
import { UseAuthContext } from "../Context/AuthModalContext";

import NextNProgress from "nextjs-progressbar";

const noFooter = ["/nfts"];

const Layout = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const { isLoading, get_token } = useUser();
  const { isOpen, onClose, onOpen } = UseAuthContext();
  const HH = useBreakpointValue({
    base: "54px",
    sm: "60.5px",
  });
  const {
    isOpen: drawerIsOpen,
    onClose: drawerOnClose,
    onOpen: drawerOnOpen,
  } = useDisclosure();

  const Handler = () => {
    if (get_token()) router.push("/user/wallet");
    else {
      onOpen();
    }
  };

  const userProps = { isLoading, get_token, Handler, onOpen: drawerOnOpen };

  const NoSpace = [""];

  return (
    <>
      <NextNProgress />
      {!NoSpace.includes(router.pathname) && <Box w="100%" h={HH} />}
      <Header {...userProps} />
      <Component {...pageProps} />
      {!noFooter.includes(router.pathname) && <Footer />}
      <Sidebar isOpen={drawerIsOpen} onClose={drawerOnClose} />
      <Auth isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Layout;
