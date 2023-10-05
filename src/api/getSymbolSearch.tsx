import axios from "axios";
import { UseQueryResult, useQuery } from "react-query";

export type ResultSymbol = {
  currency: string;
  exchange: string;
  name: string;
  symbol: string;
  resultType: string;
  exchangeName: string;
};

const getSymbolSearch = (symbol: string): UseQueryResult<ResultSymbol[]> => {
  const url = `https://api.stockunlock.com/symbol/getSymbolSearch?includeEtfInSearch=true&includeMutualFundInSearch=false&query=${symbol}`;

  const result = useQuery<ResultSymbol[]>(["symbol", symbol], () => {
    return axios.get(url).then((res) => res.data.results);
  });

  return result;
};

export { getSymbolSearch };
