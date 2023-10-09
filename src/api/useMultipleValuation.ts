import axios from "axios";
import { UseQueryResult, useQuery } from "react-query";
import { MultipleValuationEntity } from "../Entity/MultipleValuationResponse";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const useMultipleValuation = (symbol: string): UseQueryResult<MultipleValuationEntity> => {
  const url = `${apiUrl}/valuation/multiple/${symbol}`;

  return useQuery<MultipleValuationEntity>(["multiple", symbol], () => {
    return axios.get(url).then((res) => res.data);
  });
};

export default useMultipleValuation;
