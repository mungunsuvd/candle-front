import { HStack, useColorMode, Text, Icon } from "@chakra-ui/react";
import { RiMoonCloudyFill } from "react-icons/ri";
import { FaSun, FaMoon } from "react-icons/fa";

export const ThemeTrigger = ({ setReverse, reverse }: any) => {
  const { toggleColorMode } = useColorMode();

  const handleToggle = () => {
    setReverse(!reverse);
    toggleColorMode();
  };
  // const { locale } = useI11();

  return (
    <HStack
      zIndex={0}
      w="100%"
      py="8px"
      alignItems={"center"}
      px="16px"
      onClick={handleToggle}
      cursor={"pointer"}
      opacity={["1", "0.8"]}
      _hover={{ opacity: "1" }}
      justifyContent={"space-between"}
    >
      <HStack spacing={[5, 2]}>
        <Icon as={RiMoonCloudyFill} />
        {/* <Text>{UserMenuI11[locale].NIGHTMODE} </Text> */}
      </HStack>
      <Icon as={reverse ? FaSun : FaMoon} />
    </HStack>
  );
};
