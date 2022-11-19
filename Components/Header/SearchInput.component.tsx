import {
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  Text,
  Box,
  VStack,
  HStack,
  Avatar,
  InputRightElement,
  useOutsideClick,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { Borders } from "../../Theme/common";
import { IoIosCloseCircle } from "react-icons/io";
import { Loader } from "./Loader.component";

import { GetSearchQuery } from "../../Services/lib/Search";
import { UseApi } from "../../Hooks/UseApi";
import Link from "next/link";

const Result = ({ data, onClose }: { data: any; onClose: () => void }) => {
  const fields = [
    {
      key: "accounts",
      title: "Accounts",
      sub: "users",
      prelink: "/creators",
      postlink: "",
      link: "userId",
      display: "userName",
    },
    {
      key: "collections",
      title: "Collections",
      sub: "collections",
      prelink: "/collections",
      link: "_id",
      postlink: "",
      display_child: "en",
      display: "title",
      avatar: "avatar",
      avatar_child: "small",
    },
    {
      key: "candle",
      title: "candldes",
      sub: "templates",
      prelink: "/candle",
      link: "_id",
      postlink: "/nft",
      ppostlink: "defaultNFt",
      display_child: "en",
      display: "title",
    },
  ];

  return (
    <Box w="100%" animation="opInit 0.6s ease">
      {data && (
        <VStack px="2">
          {fields.map((el: any, index: number) => {
            let list = data[el.key][el.sub];
            if (list.length > 0) {
              return (
                <VStack
                  key={index}
                  w="100%"
                  alignItems="flex-start"
                  spacing={0}
                >
                  <Text opacity="0.5" fontSize="sm">
                    {el.title}
                  </Text>
                  <VStack spacing={0} w="100%" alignItems="flex-start">
                    {list.map((e: any, i: number) => (
                      <Box key={e._id} w="100%" onClick={onClose}>
                        <Link
                          href={`${el.prelink}/${e[el.link]}${el.postlink}${
                            e[el.ppostlink] ? "/" + e[el.ppostlink] : ""
                          }`}
                        >
                          {" "}
                          <HStack
                            _hover={{ background: "red" }}
                            w="100%"
                            py="2"
                          >
                            <Avatar
                              size="sm"
                              src={
                                e[el.avatar]
                                  ? e[el.avatar][el.avatar_child]
                                  : ""
                              }
                            />{" "}
                            <Text key={i}>
                              {" "}
                              {el.display_child
                                ? e[el.display][el.display_child]
                                : e[el.display]}{" "}
                            </Text>
                          </HStack>
                        </Link>
                      </Box>
                    ))}
                  </VStack>
                </VStack>
              );
            }
          })}

          {/* <Text cursor="pointer" p="3" w="100%" textAlign="center">
          Press Enter to see all results.
        </Text> */}
        </VStack>
      )}
    </Box>
  );
};

export const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const [active, setActive] = useState(false);
  const [state, setState] = useState("e");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const time = useRef(0);
  // const { locale } = useI11();
  const ref = useRef<any>();

  useOutsideClick({
    ref: ref,
    handler: () => setTimeout(onClose, 5),
  });

  const [{ data, isLoading }, fetch] = UseApi({
    service: GetSearchQuery,
  });

  // const { bg, secondaryBgHex } = useColor();

  const blurHandler = () => {
    // onClose();
    setActive(false);
  };

  const focusHandler = () => {
    setActive(true);
    searchValue.length > 2 && onOpen();
  };

  const clearField = () => {
    setSearchValue("");
  };

  const onChange = (value: string) => {
    setSearchValue(value);
  };

  const renderState = () => {
    switch (state) {
      case "t":
        return (
          <Box filter={"white" === "white" ? "grayscale(1)" : "invert(1)"}>
            {" "}
          </Box>
        );
      case "l":
        return <Loader />;
      case "d":
        return (
          <Result
            data={data}
            onClose={() => {
              onClose();
              clearField();
            }}
          />
        );
    }
  };

  useEffect(() => {
    let intervalId: any;
    if (active && searchValue.length > 2) {
      onOpen();
      setState("t");
      intervalId = setTimeout(() => {
        time.current = 0;
        clearInterval(intervalId);
        setState("l");

        fetch(
          {},
          {
            params: {
              q: searchValue,
            },
          }
        );
      }, 1500);
    } else {
      onClose();
    }
    return () => clearTimeout(intervalId);
  }, [searchValue]);

  useEffect(() => {
    setState(isLoading ? "l" : "d");
  }, [isLoading]);

  return (
    <Box pos="relative" w="100%">
      <InputGroup>
        <InputLeftElement pointerEvents="none" color="gray.300">
          <FiSearch size="20px" />
        </InputLeftElement>
        <Input
          ref={ref}
          onChange={(e) => onChange(e.target.value)}
          borderColor="gray.400"
          onBlur={blurHandler}
          onFocus={focusHandler}
          value={searchValue}
          placeholder={"Search..."}
        />
        {searchValue.length > 0 && (
          <InputRightElement>
            <IoIosCloseCircle
              color="#A0AEC0"
              cursor="pointer"
              onClick={clearField}
            />
          </InputRightElement>
        )}
      </InputGroup>
      {isOpen && (
        <VStack
          top="62px"
          pos="absolute"
          w="100%"
          bg={"white"}
          borderRadius={Borders.md}
          p="16px 8px 0"
          boxShadow="0 0 6px rgba(0,0,0,0.3)"
          spacing={0}
        >
          {renderState()}
        </VStack>
      )}
    </Box>
  );
};
