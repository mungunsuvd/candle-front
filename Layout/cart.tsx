import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

export const Cart = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const trigger = () => {
    console.log("sda");
    onOpen();
  };
  return (
    <>
      <Flex
        onClick={() => trigger()}
        cursor="pointer"
        borderRadius="12px 0 0 12px"
        w={"150px"}
        right="0"
        top="500px"
        backgroundColor="#f0bc68"
        h="150px"
        position="fixed"
        p={5}
        flexDir="column"
        justifyContent="space-evenly"
      >
        <HStack>
          <Icon as={AiOutlineShoppingCart} />
          <Text>{1} Candle </Text>
        </HStack>
        <Flex borderRadius={"12px"} backgroundColor={"white"} p={2}>
          <Text>120,000MNT</Text>
        </Flex>
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>0 Candle</DrawerHeader>
          <Divider />

          <DrawerBody></DrawerBody>

          <DrawerFooter>
            <Button w="100%" colorScheme="green">
              Buy
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
