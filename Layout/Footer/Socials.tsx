import { HStack, Box, Center } from "@chakra-ui/react";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import { FiFacebook, FiInstagram } from "react-icons/fi";

const IconButton = ({ icon, path }: { icon: any; path: string }) => {
  return (
    <Link legacyBehavior href={path}>
      <Center
        borderRadius="50%"
        bg={"white"}
        boxSize="30px"
        _hover={{ transform: "scale(1.1)" }}
        transition="cubic-bezier(.78,1.24,.71,.39) .4s"
      >
        {icon}
      </Center>
    </Link>
  );
};

export const Socials = () => {
  return (
    <HStack
      justifyContent="flex-start"
      w={["100%", "100%", "auto"]}
      py={["3", "4", "0"]}
    >
      <IconButton
        icon={<FiFacebook />}
        path="https://www.facebook.com/nftmgl"
      />
      <IconButton
        icon={<FiInstagram />}
        path="https://www.instagram.com/nft.mn.official/"
      />
      <IconButton icon={<FaDiscord />} path="https://discord.gg/qjD53Gnn57" />
    </HStack>
  );
};
