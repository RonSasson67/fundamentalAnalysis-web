import axios from "axios";
import { UseQueryResult, useQuery } from "react-query";
import { DcfValuationEntity } from "../Entity/DcfValuationEntity";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const useDcfValuation = (symbol: string): UseQueryResult<DcfValuationEntity> => {
  const url = `${apiUrl}/valuation/dcf/${symbol}`;

  if (localStorage.getItem(symbol) !== null && localStorage.getItem(symbol) !== "undefined") {
    return useQuery<DcfValuationEntity>(["symbol", symbol], () => {
      return JSON.parse(localStorage.getItem(symbol) as string);
    });
  }

  const reasult = useQuery<DcfValuationEntity>(["symbol", symbol], () => {
    return axios.get(url).then((res) => res.data);
  });

  console.log(reasult.data);

  localStorage.setItem(symbol, JSON.stringify(reasult.data));

  return reasult;
};

export default useDcfValuation;
