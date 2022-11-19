import style from "./loader.module.css";
import { Box, Center } from "@chakra-ui/react";
// import { useColor } from "../../Context/ColorContext";

export const Loader = () => {
  // const { revText } = useColor();

  return (
    <Center h="126px">
      <div className={style["lds-ellipsis"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Center>
  );
};
