import { Heading, Stack, Text } from "@chakra-ui/react";
import { Orders } from "../Domains/Order";
import { useEffect, useState } from "react";
import { UseApi } from "../Hooks/UseApi";
import { getCartList as _getCartList } from "../Services/lib/candle";
import { useUser } from "../Context/UserContext";
export default function Orderss() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const { get_token } = useUser();
  const [{ data, isLoading, error }, fetch] = UseApi({
    service: _getCartList,
  });
  useEffect(() => {
    if (get_token() != undefined) {
      fetch(get_token()).then((res) => {
        setDatas(res.data);
      });
    }
  }, [get_token()]);
  console.log(data);

  return (
    <Stack>
      <Orders order={data?.data} />
    </Stack>
  );
}
