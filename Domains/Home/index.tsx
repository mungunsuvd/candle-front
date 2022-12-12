import {
  AspectRatio,
  Button,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";

export const HomePages = ({ data, isLoading }: any) => {
  useEffect(() => {}, [isLoading]);
  if (!data) {
    return null;
  }
  const Container = ["95%", null, null, null, "1320px"];
  return (
    <Stack
      borderRadius="12px"
      w="100%"
      h="100%"
      maxW={Container}
      my={["10px", "90px"]}
      px={["15px", "15px", "40px", "", "20px"]}
      mx="auto"
      py={10}
      spacing={10}
    >
      <SimpleGrid gap={10} columns={[1, 2, 2, 4, 5]}>
        {data.map((el: any, ind: number) => {
          return (
            <Link key={ind} href={`candle_detail/${el._id}`}>
              <AspectRatio ratio={1 / 1}>
                <Stack
                  boxShadow="xl"
                  borderRadius="4px"
                  key={ind}
                  cursor="pointer"
                  justifyContent="space-between"
                >
                  <Image
                    _hover={{
                      transform: "scale(1.05)",
                      boderRadius: "0",
                    }}
                    transition="ease .2s"
                    w="100%"
                    h="100%"
                    src={el.bannerPic}
                    alt="banner"
                  />

                  <Flex flexDir={"column"} p={1} w="100%">
                    <Text fontWeight={"bold"} fontSize={"12"} color={"black"}>
                      {el.name}
                    </Text>

                    <Flex
                      p={1}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Text fontSize={"12"} color={"black"}>
                        {el.size}
                      </Text>
                      <Text fontWeight={"bold"} fontSize={"12"} color={"black"}>
                        {el.price}MNT
                      </Text>
                    </Flex>
                  </Flex>
                </Stack>
              </AspectRatio>
            </Link>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
};
