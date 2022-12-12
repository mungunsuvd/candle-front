import { Divider, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";

export const FooterDocs = () => {
  return (
    <HStack
      opacity="0.5"
      fontSize="sm"
      pt="2"
      flexDir={["column-reverse", "column-reverse", "row"]}
      px={["2", "2", "0"]}
      w={["100%", "100%", ""]}
      alignItems="flex-start"
      
    >
      <Text pr="1" pt="1"   fontFamily="'Comfortaa', sans-serif">
        ©2022 VON KLARA
      </Text>
      <HStack
        justifyContent="flex-start"
        marginStart={["0 !important", "0 !important", "10px !important"]}
        pb={["2", "2", ""]}
      >
        <Divider
          orientation="vertical"
          h="30px"
          px="1"
          display={["none", "none", "flex"]}
        />
        {/* <Link href="https://elfnft.s3.ap-southeast-1.amazonaws.com/termsandconditions/NFT.mn+_+Terms+of+Service+(1).pdf">
          <a target="_blank">
            <Text>{FooterI11[locale].terms}</Text>
          </a>
        </Link> */}
        <Text></Text>
        {/* <Link href="https://elfnft.s3.ap-southeast-1.amazonaws.com/termsandconditions/NFT.mn+_+Terms+of+Service+(1).pdf">
          <a target="_blank">
            <Text>{FooterI11[locale].privacyPolicy}</Text>
          </a>
        </Link> */}
      </HStack>
    </HStack>
  );
};
