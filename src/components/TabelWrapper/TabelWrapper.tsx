import GppBadIcon from "@mui/icons-material/GppBad";
import GppGoodIcon from "@mui/icons-material/GppGood";
import { TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { FinancialData } from "../../Entity/FinancialData.interface.ts.ts";
import MetricsType from "../../Entity/MetricsType.tsx";
import CheckBoxStore from "../../Store/CheckBoxStore.tsx";
import TextInputStore from "../../Store/TextInputStore.tsx";
import ScrollBar from "../../Utils/Style/ScrollBar.tsx";
import { useGetMetricData } from "../../api/MetricsApi.tsx";
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
    return <div>Something went wrong: {(error as any).message}</div>;
  }

  return (
    <div className="tabel-wrapper">
      <h1 className="tabel-title">
        {metricsType} - {symbol}
      </h1>
      <div className={"list-container scroll-bar"}>
        {(data as FinancialData[]).map((entry) => (
          <div className="box-content">
            <p className="box-title box-text">{entry.title}</p>
            <p className="box-text">{entry.value}</p>
            <Checkbox
              icon={<GppBadIcon />}
              checkedIcon={<GppGoodIcon />}
              checked={checkBoxStore.isChecked(entry.title)}
              onChange={() => checkBoxStore.toggle(entry.title)}
            />
            <TextField
              label="Note"
              variant="standard"
              id="standard-basic"
              key={entry.title}
              onChange={(e) => textInputStore.updateInput(entry.title, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableWrapper;
