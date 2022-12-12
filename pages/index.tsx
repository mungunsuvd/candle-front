import { Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { UseApi } from "../Hooks/UseApi";
import { getAllCandle as _getAllCandle } from "../Services/lib/candle";
import { HomePages } from "../Domains/Home";

export default function Home() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [{ data, isLoading, error }, fetch] = UseApi({
    service: _getAllCandle,
  });

  useEffect(() => {
    fetch()
      .then((res) => {
        setLoading(loading);

        setDatas(res!.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Stack bgColor={'white'}>
      <HomePages data={datas} isLoading={isLoading} />
    </Stack>
  );
}
