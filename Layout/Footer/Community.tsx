import { VStack, Text, Heading } from "@chakra-ui/react";
import Link from "next/link";

export const Community = () => {
  const links = [
    // {
    //   label: "Explore Marketplace",
    //   path: "/nfts",
    // },
    {
      label: "Help Center",
      path: "/help",
    },
    {
      label: "About us",
      path: "/about-us",
    },
    {
      label: "FAQ",
      path: "/faq",
    },
  ];
  return (
    <VStack
      alignItems="flex-start"
      ml={["0 !important", "4", null]}
      pt={["5", "0", "0"]}
    >
      <Heading size="lg">{"Community"}</Heading>
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
