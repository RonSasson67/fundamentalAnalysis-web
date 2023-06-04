import MetricsType from "../Entity/MetricsType";
import { GenerateDataForTabel } from "../Utils/MockGenereator";

function GetMetricData(metricsType: MetricsType, symbol: string) {
  switch (metricsType) {
    case MetricsType.General:
      return GetGeneralData(symbol);
    case MetricsType.Valuation:
      return GetValuationData(symbol);
    case MetricsType.FinancialHealth:
      return GetFinancialHealthData(symbol);
    case MetricsType.CashFlow:
      return GetCashFlowData(symbol);
    default:
      return [];
  }
}

function GetGeneralData(symbol: string) {
  return GenerateDataForTabel();
}

function GetValuationData(symbol: string) {
  return GenerateDataForTabel();
}

function GetFinancialHealthData(symbol: string) {
  return GenerateDataForTabel();
}

function GetCashFlowData(symbol: string) {
  return GenerateDataForTabel();
}

export default GetMetricData;
