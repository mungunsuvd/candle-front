import { Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CandleDetail } from "../../Domains/candleDetail";
import { UseApi } from "../../Hooks/UseApi";
import { getCandleDetail as _getCandleDetail } from "../../Services/lib/candle";
export default function CandleDetails() {
  const router = useRouter();
  const id = router.query.id;
  const [{ data, isLoading, error }, fetch] = UseApi({
    service: _getCandleDetail,
  });
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    if (id != undefined) {
      fetch(id).then((res) => {
        setDatas(res.data);
      });
    }
  }, [id]);

  return (
    <Stack mx={"200px"} w="100%">
      <CandleDetail data={datas} loading={isLoading} />
    </Stack>
  );
}
