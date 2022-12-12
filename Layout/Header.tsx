import {
  HStack,
  Image,
  Box,
  Spacer,
  Text,
  Icon,
  VStack,
  Button,
  Select,
  Avatar,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiMenu } from "react-icons/fi";
import { SearchInput, ThemeTrigger } from "../Components/Header";
import { useUser } from "../Context/UserContext";
import style from "./header.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Borders, brandGradient } from "../Theme/common";
import { BsShieldLockFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

import { UseApi } from "../Hooks/UseApi";
import { getProfile } from "../Services/lib/Profile";
import { GoVerified } from "react-icons/go";

interface Header {
  isLoading: boolean;
  get_token: () => string | undefined;
  Handler: () => void;
  onOpen: () => void;
}

const menus = [
  {
    label: "Эхлэл",
    path: "/",
  },
  {
    label: "Ангиглал ",
    path: "category",
  },
  {
    label: "Мэдээ",
    path: "news",
  },
  {
    label: "Захиалга",
    path: "custom",
  },
];

interface DropMDetail {
  header: string;
  hide: boolean;
}

const DropDown = ({ hide, header }: DropMDetail) => {
  const { dispatcher } = useUser();
  const [reverse, setReverse] = useState(false);
  // const { brand } = useColor();
  // const { setLocale, locale } = useI11();

  const profileDetail = [
    { name: "", link: "info", icon: BsShieldLockFill },
  ];
  return hide ? (
    <VStack
    backgroundColor={'#D6CFDF'}
      w="100px"
      pos={"absolute"}
      bg={header}
      top={"60.5px"}
      spacing={"0px"}
      alignItems={"unset"}
      right={"0px"}
      fontWeight={"500"}
      borderBottomRadius={Borders.md}
      overflow={"hidden"}
    >
      <HStack
        onClick={() =>
          dispatcher({
            type: "logout",
          })
        }
        _hover={{ opacity: 1 }}
        opacity={0.5}
        px="25px"
        py="12px"
        w="100%"
        cursor={"pointer"}
      >
        <Icon as={FiLogOut} />
        <Text
          borderBottomRadius={Borders.md}
          letterSpacing={"1px"}
          cursor={"pointer"}
        >
          {"Гарах"}
        </Text>
      </HStack>
      
    </VStack>
    
  ) : null;
};

export const Header = ({ isLoading, get_token, Handler, onOpen }: Header) => {
  const router = useRouter();
  // const { bg, header } = useColor();
  const [hide, setHide] = useState(false);

  const token = get_token();
  const [{ isLoading: loading, data }, fetch] = UseApi({
    service: getProfile,
  });

  useEffect(() => {
    if (!isLoading) {
      // fetch();
    }
  }, [isLoading]);

  const goToHome = (event: any) => {
    router.push("/");
  };

  // const { locale, setLocale } = useI11();

  return (
    <Box
      bg={"white"}
      pos="fixed"
      backdropFilter="blur(8px)"
      top="0"
      w="100%"
      zIndex={10}
    >
      <HStack
        mx="auto"
        maxW={"1350px"}
        py={[3, 3, 3, 3, 0]}
        px={4}
        alignItems="center"
      >
        <HStack cursor="pointer" onClick={goToHome}>
          <Text
            fontFamily="'Comfortaa', sans-serif"
            fontWeight="bold"
            fontSize={["sm", "lg", "xl"]}
          >
            VON KLARA
          </Text>
        </HStack>
        <Spacer />
        <Box
          flexBasis="500px"
          display={["none", "none", "none", "none", "flex", "flex"]}
        >
          <SearchInput />
        </Box>
        <Spacer />
        <HStack>
          <Box
            onClick={onOpen}
            display={["block", "block", "block", "block", "none", "none"]}
          >
            <FiMenu />
          </Box>
          <HStack
            display={["none", "none", "none", "none", "flex", "flex"]}
            spacing={"24px"}
          >
            <HStack
              w="100%"
              pl="16px"
              py="8px"
              _hover={{ opacity: 1 }}
              opacity={0.8}
              cursor={"pointer"}
            ></HStack>
            {menus.map((el) => {
              return (
                <Link href={`/${el.path}`} key={el.label}>
                  <Text 
                    fontFamily={"Comfortaa, sans-serif"} 
                    fontSize={'14px'}
                    color={"black"}
                    cursor={"pointer"}
                    fontWeight={"500"}
                    letterSpacing={"1px"}
                  >
                    {el.label}
                  </Text>
                </Link>
              );
            })}
          </HStack>
          <Box
            p="3"
            pos={"relative"}
            display={["none", "none", "none", "none", "block", "block"]}
            onMouseEnter={() => setHide(true)}
            onMouseLeave={() => setHide(false)}
          >
            {get_token() ? (
              <Box pos="relative">
                <Avatar size="sm" src={data?.avatar} name='M S' />
                <DropDown header={'header'} hide={hide} />
                {data?.badgeGiven && (
                  <Icon
                    as={GoVerified}
                    color="rgba(29, 161,242)"
                    pos="absolute"
                    bottom="0"
                    right="-6px"
                    fontSize="12px"
                  />
                )}
              </Box>
            ) : (
              <Button
                bgImage={brandGradient}
                bgSize="300% 100%"
                backgroundColor={'#D6CFDF'}
                px={["5", "8"]}
                fontSize="14px"
                transition=" all .4s ease-in-out"
                _hover={{
                  backgroundPosition: "100% 0",
                  transition: "all .4s ease-in-out",
                }}
                isLoading={isLoading}
                onClick={get_token() ? () => {} : Handler}
              >
                {"Нэвтрэх"}
              </Button>
            )}
          </Box>
        </HStack>
      </HStack>
    </Box>
  );
};
