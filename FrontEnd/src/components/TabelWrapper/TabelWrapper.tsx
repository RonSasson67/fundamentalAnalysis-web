import { FinancialData } from "../../Entity/FinancialData.interface.ts.ts";
import MetricsType from "../../Entity/MetricsType.tsx";
import CheckBoxStore from "../../Store/CheckBoxStore.tsx";
import TextInputStore from "../../Store/TextInputStore.tsx";
import { useGetMetricData } from "../../api/MetricsApi.tsx";
import BoxList from "./Component/BoxList.tsx";
import "./TabelWrapper.css";

interface TableWrapperProps {
  symbol: string;
  metricsType: MetricsType;
}
const checkBoxStore = new CheckBoxStore();
const textInputStore = new TextInputStore();

function TableWrapper({ symbol, metricsType }: TableWrapperProps) {
  const { data, isLoading, error } = useGetMetricData(symbol, metricsType);

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
      <BoxList financialData={data as FinancialData[]} checkBoxStore={checkBoxStore} textInputStore={textInputStore} />
    </div>
  );
}

export default TableWrapper;
