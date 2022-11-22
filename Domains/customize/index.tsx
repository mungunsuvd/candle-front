import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";

export const Cutomize = () => {
  const toast = useToast();
  const [imgs, setImgs] = useState(
    "https://media.discordapp.net/attachments/1043902121185116221/1044281357804773496/Group_174.png"
  );
  const img = [
    "https://media.discordapp.net/attachments/1043902121185116221/1044263167833952286/glass3.png.webp?width=662&height=662",
    "https://media.discordapp.net/attachments/1043902121185116221/1044263167188013076/glass1.webp?width=501&height=662",
    "https://media.discordapp.net/attachments/1043902121185116221/1044263167527763978/glass2.webp",
  ];
  const [name, setName] = useState("My Candle");
  const [pic, setPic] = useState("");
  console.log(pic);
  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setPic(URL.createObjectURL(event.target.files[0]));
    }
  };
  return (
    <>
      <VStack py={12}>
        <Heading>Customize Your Candle</Heading>
      </VStack>
      <HStack
        w="80%"
        mx="auto"
        justifyContent={"space-evenly"}
        my={["10px", "90px"]}
        px={["15px", "15px", "40px", "", "80px"]}
      >
        <Flex position={"relative"}>
          <Flex
            pos="absolute"
            h="300px"
            bottom="50px"
            left={"50px"}
            right={"50px"}
          >
            <Image borderRadius={"12px"} w="800px" src={pic} alt="" />
          </Flex>

          <Flex
            borderRadius={"12px"}
            h="60px"
            bgGradient="linear(to-r, gray.300, yellow.400, pink.200)"
            p={4}
            bottom="50px"
            // left={"120px"}
            opacity={"0.5"}
            mx="auto"
            left={"50px"}
            right={"50px"}
            position={"absolute"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text opacity={"1"} color="black" textAlign={"center"}>
              {name}
            </Text>
          </Flex>
          <Image w="400px" h="500px" src={imgs} alt="" />
        </Flex>

        <Stack p={3} justifyContent={"start"} w="40%">
          <Text textAlign={"left"}>Бичих үг </Text>
          <Input
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Бичих үг"
            bg={"white"}
          />
          <Text textAlign={"left"}>Үнэрээ бичнэ үү </Text>
          <Input placeholder="Үнэрээ бичнэ үү " bg={"white"} />
          <Text textAlign={"left"}>Зураг оруулах </Text>
          <Input onChange={onImageChange} type="file" />
          <Text textAlign={"left"}>Шил сонгох </Text>
          <SimpleGrid columns={3}>
            {img.map((el: any, ind: number) => {
              return (
                <Image
                  onClick={() => setImgs(el)}
                  borderRadius={"12px"}
                  key={ind}
                  src={el}
                  alt="shil"
                  w="140px"
                  h="140px"
                  cursor={"pointer"}
                />
              );
            })}
          </SimpleGrid>
          <Box h="50px" />
          <Button
            onClick={() =>
              toast({
                title: "Success",
                description: "We've created your candle for you.",
                status: "success",
                duration: 9000,

                isClosable: true,
              })
            }
          >
            Илгээх
          </Button>
        </Stack>
      </HStack>
    </>
  );
};
