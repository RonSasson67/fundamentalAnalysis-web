import BoxList from "./Component/BoxList.tsx";
import CheckBoxStore from "../Store/CheckBoxStore";
import MetricsType from "../Entity/MetricsType";
import TextInputStore from "../Store/TextInputStore";
import { useGetMetricData } from "../api/MetricsApi";
import { FinancialData } from "../Entity/FinancialData.interface.ts";
import "./TabelWrapper.css";

interface TableWrapperProps {
  symbol: string;
  metricsType: MetricsType;
}

function TableWrapper({ symbol, metricsType }: TableWrapperProps) {
  const { data, isLoading, error } = useGetMetricData(symbol, metricsType);
  const checkBoxStore = new CheckBoxStore();
  const textInputStore = new TextInputStore();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    // cool error page with animation
    return <div>Something went wrong: {error.message}</div>;
  }

  return (
    <div className="tabel-wrapper">
      <h1 className="tabel-title">
        {metricsType} - {symbol}
      </h1>
      <BoxList
        financialData={data as FinancialData[]}
        checkBoxStore={checkBoxStore}
        textInputStore={textInputStore}
      />
    </div>
  );
}

export default TableWrapper;
