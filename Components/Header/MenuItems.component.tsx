import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Text,
} from "@chakra-ui/react";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";

import { useRouter } from "next/router";

type menuItemType = {
  label: string;
  path: "Home" | "Categoy" | "Information" | "Special Order";
};

const menus: menuItemType[] = [
  {
    label: "Эхлэл",
    path: "Home",
  },
  {
    label: "Ангилал ",
    path: "Categoy",
  },
  {
    label: "Мэдээ ",
    path: "Information",
  },
  {
    label: "Тусгай захиалга",
    path: "Special Order",
  },
];

export const MenuItems = () => {
  const { pathname } = useRouter();

  return (
    <Menu>
      <MenuButton>
        <HStack spacing="0">
          <Text mr="1">{"temka"}</Text>
          <AiFillCaretDown size="14px" />
        </HStack>
      </MenuButton>

      <MenuList>
        {menus.map((el, idx) => (
          <Link legacyBehavior key={el.path} passHref href={"/" + el.path}>
            <MenuItem bg={pathname === `/${el.path}` ? "red" : ""}>
              {[el.path]}
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </Menu>
  );
};
