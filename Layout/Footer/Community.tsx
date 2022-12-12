import { VStack, Text, Heading } from "@chakra-ui/react";
import Link from "next/link";

export const Community = () => {
  const links = [
    // {
    //   label: "Explore Marketplace",
    //   path: "/nfts",
    // },
    {
      label: "Лаа авах ",
      path: "/",
    },
    {
      label: "Бидний тухай",
      path: "/about-us",
    },
    {
      label: "Түгээмэл асуулт, хариулт",
      path: "/faq",
    },
    {
      label: "Тусгай захиалга өгөх ",
      path: "/customize",
    },
  ];
  return (
    <VStack
      alignItems="flex-start"
      ml={["0 !important", "4", null]}
      pt={["5", "0", "0"]}
    >
      <Heading style={{fontFamily:'Comfortaa'}} size="lg">{"Үндсэн цэс"}</Heading>
      {links.map((el: any, idx: number) => (
        <Link legacyBehavior href={el.path} key={el.label}>
          <a>
            <Text opacity={0.5} size="sm">
              {el.label}
            </Text>
          </a>
        </Link>
      ))}
    </VStack>
  );
};
