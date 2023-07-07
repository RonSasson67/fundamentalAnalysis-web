// create api that get ratios data from server and return it

import RatioType from "../Entity/RatioType";
import { GenerateDataForCharts } from "../Utils/MockGenereator";

// function that get ratio type and make switche case to get the right data from server
function GetRatioData(ratioType: RatioType, symbol: string) {
  switch (ratioType) {
    case RatioType.PE:
      return GetPEData(symbol);
    case RatioType.PToCashFlow:
      return GetPToCashFlowData(symbol);
    default:
      return [];
  }
}

// function that get PE data from server
function GetPEData(symbol: string) {
  console.log(symbol);
  return GenerateDataForCharts();
}

// function that get PToCashFlow data from server
function GetPToCashFlowData(symbol: string) {
  console.log(symbol);
  return GenerateDataForCharts();
}

export { GetRatioData };
