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
    "https://cdn.discordapp.com/attachments/1043902121185116221/1044108746944684042/zurag4.jpg",
  ];
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
        <Image w="400px" h="500px" src={imgs} alt="" />
        <Stack p={3} justifyContent={"start"} w="40%">
          <Text textAlign={"left"}>Бичих үг </Text>
          <Input placeholder="Бичих үг" bg={"white"} />
          <Text textAlign={"left"}>Үнэрээ бичнэ үү </Text>
          <Input placeholder="Үнэрээ бичнэ үү " bg={"white"} />
          <Text textAlign={"left"}>Зураг оруулах </Text>
          <Input type="file" />
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
