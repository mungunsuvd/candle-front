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
import { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import { UseApi } from "../../Hooks/UseApi";
import { payment as _payment } from "../../Services/lib/candle";
import { checker as _checker } from "../../Services/lib/candle";
import { useRouter } from "next/router";
export const Order = ({ data }: any) => {
  console.log(data);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [additional, setAdditional] = useState("");
  const [isPaid, setIsPaid] = useState(false);

  const [loading, setLoading] = useState(false);
  const { get_token } = useUser();
  const [isOrder, setIsOrder] = useState(true);
  const [invId, setInvId] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [{ data: datas, isLoading, error }, fetch] = UseApi({
    service: _payment,
  });
  const [{ data: data1, isLoading: isLoading1 }, fetch1] = UseApi({
    service: _checker,
  });
  const router = useRouter();
  function getBase64Img(item: any) {
    return `data:image/png;base64,${item}`;
  }
  useEffect(() => {
    if (datas) {
      setIsOrder(false);
      let base64img = getBase64Img(datas.data.qr_image);
      setQrImage(base64img);
      setInvId(datas.data.invoice_id);
      console.log(datas);
    }
  }, [datas, qrImage]);
  useEffect(() => {
    if (data1?.data.isPaid == true) {
      console.log("sda");
      setIsPaid(true);
    }
  }, [data1]);
  const body = {
    name,
    phoneNumber: number,
    address,
    additionalInfo: additional,
    items: data,
    totalPrice: 10,
  };
  const handler = () => {
    fetch({ body, token: get_token() });
  };
  if (!data) {
    return null;
  }
  if (!data1) {
    return null;
  }
  const tnxChecker = () => {
    fetch1({ token: get_token(), invoice_id: invId });
  };
  return (
    <>
      {isOrder ? (
        <HStack
          w="100%"
          justifyContent={"space-evenly"}
          my={["10px", "90px"]}
          px={["15px", "15px", "40px", "", "20px"]}
        >
          <SimpleGrid columns={1}>
            {data?.map((el: any, ind: number) => {
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
              <Input
                onChange={(e: any) => setName(e.target.value)}
                bg={"white"}
                placeholder="Bat Solongo"
              />
              <Input
                onChange={(e: any) => setNumber(e.target.value)}
                bg={"white"}
                placeholder="80008544"
              />
            </HStack>

            <Textarea
              onChange={(e: any) => setAddress(e.target.value)}
              bg={"white"}
              placeholder="Дүүрэг Хороо"
            />

            <Input
              onChange={(e: any) => setAdditional(e.target.value)}
              bg={"white"}
              placeholder="Нэмэлт мэдээлэл"
            />

            <HStack justifyContent={"space-between"}>
              <Text>Нийт үнэ:</Text>
              <Text>MNT</Text>
            </HStack>
            <Button onClick={() => handler()} colorScheme={"green"}>
              Proceed
            </Button>
          </Stack>
        </HStack>
      ) : isPaid == false ? (
        <HStack
          justifyContent={"space-evenly"}
          my={["10px", "90px"]}
          px={["15px", "15px", "40px", "", "20px"]}
        >
          <Stack>
            <Text>Та QR кодоо уншуулж төлбөрөө хийнэ үү</Text>
            <Image w="250px" h="250px" src={qrImage} />
          </Stack>

          <Stack h="200px" justifyContent={"space-between"} w="30%">
            <Heading>Нийт дүн: {data[0].price}MNT</Heading>
            <Heading fontSize="20px">
              Та төлбөрөө хийсэн бол шалгах товчийг дарж баталгаажуулна уу
            </Heading>
            <Button onClick={() => tnxChecker()}>Шалгах</Button>
          </Stack>
        </HStack>
      ) : (
        <Stack>
          <Heading>
            Таны төлбөр Амжилттай баталгаажлаа. Манайхыг сонгосон таньд баярллаа
          </Heading>
        </Stack>
      )}
    </>
  );
};
