import {
  Box,
  Flex,
  VStack,
  Text,
  HStack,
  Heading,
  Divider,
  Center,
} from "@chakra-ui/react";
import { Container } from "../Theme/common";
import Link from "next/link";

import { Nftfooter } from "./Footer/NFTFooter";
import { Community } from "./Footer/Community";

import { FooterDocs } from "./Footer/FooterDocs";
import { Socials } from "./Footer/Socials";

export function Footer() {
  return (
    <Center w="100%" bg={"white"}>
      <VStack w={Container} py={7}>
        <HStack
          w="100%"
          alignItems="flex-start"
          flexDir={["column", "column", "row"]}
        >
          <HStack
            bg={"#f5f5f5"}
            alignItems="flex-start"
            justifyContent="space-between"
            flexGrow={1}
            padding={'20px'}
            borderRadius='8px'
            w={["80%", null, null]}
            px={["4"]}
            flexDir={["column", "row", "row"]}
          >
            <Nftfooter />
            <Community />
          </HStack>
        </HStack>

        <Divider pt="7" />
        <HStack
          w="100%"
          justifyContent="space-between"
          flexDir={["column-reverse", "column-reverse", "row"]}
          px={["2", "2", "0"]}
        >
          <FooterDocs />
          <Socials />
        </HStack>
      </VStack>
    </Center>
  );
}
