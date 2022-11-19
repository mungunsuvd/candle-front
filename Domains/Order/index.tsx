import {
  Button,
  Heading,
  HStack,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";

export const Order = ({ data }: any) => {
  console.log(data);
  return (
    <HStack
      w="100%"
      justifyContent={"space-evenly"}
      my={["10px", "90px"]}
      px={["15px", "15px", "40px", "", "20px"]}
    >
      <SimpleGrid columns={1}>
        {data.map((el: any, ind: number) => {
          return (
            <HStack justifyContent={"space-between"} w="600px" p={5}>
              <Image borderRadius="12px" w={"200px"} src={el.BannerPic} />
              <Stack>
                <Text fontWeight={"bold"}>{el.name}</Text>
                <Heading fontSize={"24px"}>{el.price}MNT</Heading>
              </Stack>
              <Stack w="20%">
                <NumberInput defaultValue={el.count}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Stack>
            </HStack>
          );
        })}
      </SimpleGrid>
      <Stack>
        <HStack>
          <Input bg={"white"} placeholder="Bat Solongo" />
          <Input bg={"white"} placeholder="80008544" />
        </HStack>

        <Textarea bg={"white"} placeholder="Дүүрэг Хороо" />

        <Input bg={"white"} placeholder="Нэмэлт мэдээлэл" />
        <Textarea bg={"white"} placeholder="Bat Solongo " />
        <HStack justifyContent={"space-between"}>
          <Text>Нийт үнэ:</Text>
          <Text>{data[0].price}MNT</Text>
        </HStack>
        <Button colorScheme={"green"}>Proceed</Button>
      </Stack>
    </HStack>
  );
};
