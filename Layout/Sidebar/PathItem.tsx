import { HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export const PathItem = ({
  el,
  icon,
  path,
  onClick,
}: {
  el: string;
  icon: any;
  path: string;
  onClick: () => void;
}) => {
  const { route } = useRouter();

  const active = route === `/${path}`;

  return (
    <Link href={`/${path}`}>
      <HStack
        cursor="pointer"
        w="100%"
        spacing="5"
        p="3"
        onClick={onClick}
        bg={active ? "white" : ""}
        color={active ? "white" : ""}
        borderRadius="4"
      >
        {icon}
        <Text>{el}</Text>
      </HStack>
    </Link>
  );
};
