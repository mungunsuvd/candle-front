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
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useUser } from "../Context/UserContext";
import { UseApi } from "../Hooks/UseApi";
import { getCartList as _getCartList } from "../Services/lib/candle";

export const Cart = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [count, setCounter] = useState(0);
  const [price, setPrice] = useState(0);
  const btnRef = React.useRef();
  const trigger = () => {
    console.log("sda");
    onOpen();
  };
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const { get_token } = useUser();
  const [{ data, isLoading, error }, fetch] = UseApi({
    service: _getCartList,
  });
  useEffect(() => {
    if (get_token() != undefined) {
      fetch(get_token()).then((res) => {
        console.log(res);
        setDatas(res.data);
      });
    }
    datas.map((el: any, ind: number) => {
      return setCounter(el.count), setPrice(el.price);
    });
  }, [get_token()]);

  return (
    <>
      <Flex
        zIndex={"1000"}
        onClick={() => trigger()}
        cursor="pointer"
        borderRadius="12px 0 0 12px"
        w={"150px"}
        right="0"
        top="500px"
        backgroundColor="#D6CFDF"
        h="150px"
        position="fixed"
        p={5}
        flexDir="column"
        justifyContent="space-evenly"
      >
        <HStack>
          <Icon as={AiOutlineShoppingCart} />
          <Text fontFamily={"Comfortaa, sans-serif"} fontSize={'14px'} fontWeight='bold'> Сагс</Text>
        </HStack>
        <Flex borderRadius={"12px"} backgroundColor={"white"} p={2}>
          <Text>{price}MNT</Text>
        </Flex>
      </Flex>
      <Drawer size="sm" isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Сагсан дахь бараа</DrawerHeader>
          <Divider />

          <DrawerBody>
            <SimpleGrid columns={1}>
              {datas?.map((el: any, ind: number) => {
                return (
                  <>
                    <HStack
                      key={ind}
                      justifyContent={"space-between"}
                      w="100%"
                      p={5}
                    >
                      <Image
                        w="100px"
                        borderRadius="12px"
                        src={el.BannerPic}
                        alt={"ss"}
                      />
                      <Stack>
                        <Text fontSize={"12px"} fontWeight={"bold"}>
                          {el.name}
                        </Text>
                        <Heading fontSize={"14px"}>{el.price}MNT</Heading>
                      </Stack>
                      <Stack w="80px">
                        <NumberInput defaultValue={el.count}>
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Stack>
                    </HStack>
                    <StackDivider />
                  </>
                );
              })}
            </SimpleGrid>
          </DrawerBody>

          <DrawerFooter>
            <Link style={{ width: "100%" }} href={"/order"}>
              <Button w="100%" colorScheme="green">
                Захиалах 
              </Button>
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
