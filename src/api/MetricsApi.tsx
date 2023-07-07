import MetricsType from "../Entity/MetricsType";
import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";
import { FinancialData } from "../Entity/FinancialData.interface.ts";

const mapMetricTypeToUrl = (metricType: MetricsType) => {
  const url = "http://localhost:3000/metrics/";
  switch (metricType) {
    case MetricsType.General:
      return `${url}overview`;
    case MetricsType.Valuation:
      return `${url}valuation`;
    case MetricsType.FinancialHealth:
      return `${url}financial-health`;
    case MetricsType.CashFlow:
      return `${url}cash-flow`;
    default:
      return "";
  }
};

const useGetMetricData = (symbol: string, metricType: MetricsType): UseQueryResult<FinancialData[]> => {
  const url = `${mapMetricTypeToUrl(metricType)}/${symbol}`;

  return useQuery<FinancialData[]>(["metrics", symbol, metricType], () => {
    return axios.get(url).then((res) => res.data);
  });
};

export { useGetMetricData };
