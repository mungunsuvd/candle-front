import {
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { UseAuthContext } from "../../Context/AuthModalContext";
import { useUser } from "../../Context/UserContext";

export const CandleDetail = ({ data, isLoading }: any) => {
  const [images, setImages] = useState("");
  const { get_token } = useUser();
  const { isOpen, onClose, onOpen } = UseAuthContext();
  const Handler = () => {
    onOpen();
  };
  useEffect(() => {
    setImages(data.bannerPic);
  }, [data]);
  console.log(data);
  const Container = ["95%", null, null, null, "1320px"];
  return (
    <HStack
      w="100%"
      justifyContent={"space-evenly"}
      my={["10px", "90px"]}
      px={["15px", "15px", "40px", "", "20px"]}
    >
      <Stack>
        <Heading>{data.name}</Heading> 
        <Image src={images} w="500px" />
        <SimpleGrid width={"500px"} columns={[4]}>
          {data.miniPic?.map((el: any, ind: number) => {
            return (
              <Flex onClick={() => setImages(el)} cursor={"pointer"} p={2}>
                <Image src={el} />
              </Flex>
            );
          })}
        </SimpleGrid>
      </Stack>
      <Flex w="50%" h="550px" justifyContent="space-evenly" flexDir={"column"}>
        <Text fontSize={"sm"}>Von Klara</Text>
        <Heading fontSize={"14"} fontWeight={"bold"}>
          {data.name}
        </Heading>
        <Heading fontSize={"14"}>Бүтээгдэхүүний тайлбар:</Heading> 
        <Text>{data.description}</Text>
        <Heading fontSize={"14"}>Найрлага:</Heading>
        <Text>{data.ingredients}</Text>
        <Heading fontSize={"14"}>Үнэр:</Heading>
        <Text>{data.scent}</Text>
        <Heading fontSize={"14"}>Хэмжээ:</Heading>
        <Text>{data.size}</Text>
        <Heading fontSize={"14"}>Асах хугацаа:</Heading>
        <Text>{data.lightLength} Цаг</Text>
        <Heading>{data.price}MNT</Heading>
        <HStack>
          <Button leftIcon={<AiOutlineHeart />} variant={"outline"}>
            Хадгалах
          </Button>
          <Button
            onClick={
              get_token()
                ? () => {
                    console.log("sda");
                  }
                : Handler
            }
            leftIcon={<AiOutlineShoppingCart />}
          >
            Сагсанд хийх
          </Button>
        </HStack>
      </Flex>
    </HStack>
  );
};