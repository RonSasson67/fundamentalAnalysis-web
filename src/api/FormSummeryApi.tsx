import MetricsType from "../Entity/MetricsType";
import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";
import { FinancialData } from "../Entity/FinancialData.interface.ts";
import { v4 as uuidv4 } from "uuid";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const useFormSummeryApi = (symbol: string, metricType: MetricsType): UseQueryResult<FinancialData[]> => {
  const formGuid = uuidv4();
  const url = `${apiUrl}/metrics/${formGuid}`;

  return useQuery<FinancialData[]>(["metrics", symbol, metricType], () => {
    return axios.get(url).then((res) => res.data);
  });
};

export { useFormSummeryApi };
