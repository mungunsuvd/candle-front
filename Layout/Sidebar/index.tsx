import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Text,
  HStack,
  Spacer,
  Divider,
  Button,
  Icon,
  Select,
} from "@chakra-ui/react";
import { UseSize } from "../../Hooks/UseSize";
import { ThemeTrigger } from "../../Components/Header";

import { SiVirtualbox } from "react-icons/si";
import { BsFillCollectionFill, BsFillGrid1X2Fill } from "react-icons/bs";
import { MdUpcoming } from "react-icons/md";
import { FaLanguage, FaUser, FaUserAlt, FaWallet } from "react-icons/fa";
import { PathItem } from "./PathItem";
import { SearchInput } from "./SearchInput";
import { useUser } from "../../Context/UserContext";
import router from "next/router";
import { UseAuthContext } from "../../Context/AuthModalContext";
import { useState } from "react";
interface Sidebar {
  isOpen: boolean;
  onClose: () => void;
}

type path = "home" | "category" | "information";

type menuItemType = {
  label: string;
  path: path;
  icon: any;
};

const menus: menuItemType[] = [
  {
    label: "Home",
    path: "home",
    icon: <SiVirtualbox />,
  },
  {
    label: "Category",
    path: "category",
    icon: <BsFillCollectionFill />,
  },
  {
    label: "Information",
    path: "information",
    icon: <MdUpcoming />,
  },
  // {
  // 	label: "Creators",
  // 	path: "creators",
  // 	icon: <FaUserAlt />,
  // },
];

const items = [
  {
    label: "Wallet",
    path: "wallet",
    icon: <FaWallet />,
  },
  {
    label: "Assets",
    path: "assets",
    icon: <BsFillGrid1X2Fill />,
  },
  {
    label: "Info",
    path: "info",
    icon: <FaUserAlt />,
  },
];

const LoggedIn = ({
  onClose,
  dispatcher,
}: {
  onClose: () => void;
  dispatcher: any;
}) => {
  const onCloseClick = () => {
    onClose();
  };

  const logout = () => {
    dispatcher({
      type: "logout",
    });
    onClose();
  };

  return (
    <VStack w="100%" alignItems="flex-start" pb="3">
      <HStack w="100%">
        <Divider flexGrow={1} />
        <Text fontSize="xs" opacity="0.4" fontWeight="lighter">
          {" "}
          Profile{" "}
        </Text>
        <Divider title="Profile" />
      </HStack>
      {items.map((el: any, idx: number) => (
        <PathItem
          key={el.path + idx}
          el={el.label}
          icon={el.icon}
          path={`user/${el.path}`}
          onClick={onCloseClick}
        />
      ))}
      <Button variant="ghost" onClick={logout} p="0 12px">
        Logout
      </Button>
    </VStack>
  );
};

export const Sidebar = ({ isOpen, onClose }: Sidebar) => {
  const [reverse, setReverse] = useState(false);
  const size = UseSize("drawer");
  const { get_token, dispatcher } = useUser();
  const token = get_token();
  const { onOpen } = UseAuthContext();
  const Handler = () => {
    if (get_token()) router.push("/user/wallet");
    else {
      onOpen();
    }
  };

  const props = {
    isOpen,
    onClose,
  };

  const onLogin = () => {
    onClose();
  };

  return (
    <Drawer {...props} size={size}>
      {/* <DrawerOverlay /> */}
      <DrawerContent>
        <DrawerHeader>
          <DrawerCloseButton />
        </DrawerHeader>
        <DrawerBody pt={3} zIndex="12">
          <VStack w="100%" h="100%">
            <SearchInput onPick={() => onClose()} />
            {menus.map((el: any, idx: number) => (
              <PathItem
                key={"pi" + idx}
                el={[el.label][el.path]}
                icon={el.icon}
                path={el.path}
                onClick={onClose}
              />
            ))}

            <HStack
              w="100%"
              p="8px"
              _hover={{ opacity: 1 }}
              opacity={0.8}
              cursor={"pointer"}
              justifyContent="space-between"
            >
              <HStack pl="6px">
                <Icon as={FaLanguage} mr={3} />
              </HStack>
            </HStack>
            <HStack w="100%" py="12px" justifyContent="space-between">
              <ThemeTrigger setReverse={setReverse} reverse={reverse} />
            </HStack>
            <HStack w="100%" justifyContent="flex-start" pt="3">
              {token ? (
                <LoggedIn onClose={onClose} dispatcher={dispatcher} />
              ) : (
                <VStack w="100%" alignItems="flex-start">
                  <Divider mb="3" />
                  <Button onClick={Handler}>Нэвтрэх</Button>
                </VStack>
              )}
            </HStack>
            <Spacer />
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
