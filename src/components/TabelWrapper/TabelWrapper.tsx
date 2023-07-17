import GppBadIcon from "@mui/icons-material/GppBad";
import GppGoodIcon from "@mui/icons-material/GppGood";
import { TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Controller, useFormContext } from "react-hook-form";
import { FinancialData } from "../../Entity/FinancialData.interface.ts.ts";
import MetricsType from "../../Entity/MetricsType.tsx";
import { useGetMetricData } from "../../api/MetricsApi.tsx";
import "./TabelWrapper.css";

interface TableWrapperProps {
  symbol: string;
  metricsType: MetricsType;
}

function TableWrapper({ symbol, metricsType }: TableWrapperProps) {
  const methods = useFormContext(); // retrieve those props

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
      <div className="list-container scroll-bar">
        {(data as FinancialData[]).map((entry: FinancialData) => (
          <div className="box-content" key={entry.title}>
            <p className="box-title box-text">{entry.title}</p>
            <p className="box-text">{entry.value}</p>
            <Controller
              name={`${symbol}:${entry.title}:isGood`}
              control={methods.control}
              defaultValue={false}
              render={({ field }) => (
                <Checkbox icon={<GppBadIcon />} checkedIcon={<GppGoodIcon />} checked={field.value} {...field} />
              )}
            />
            <Controller
              name={`${symbol}:${entry.title}:note`}
              control={methods.control}
              defaultValue=""
              render={({ field }) => <TextField label="Note" variant="standard" id="standard-basic" {...field} />}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableWrapper;
