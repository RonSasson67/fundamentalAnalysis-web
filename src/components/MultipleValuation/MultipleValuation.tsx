import { FormControlLabel, InputAdornment, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import useMultipleValuation from "../../api/useMultipleValuation";
import "./MultipleValuation.css";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import CustomTooltip from "../ChartSlider/Component/CoustomToolTip";
import { MultipleValuationEntity } from "../../Entity/MultipleValuationResponse";

type MultipleValuationProps = {
  symbol: string;
};

type MultipleValuationChart = {
  Year: string;
  EPS: number;
  StockPrice: number;
};

const MultipleValuation = ({ symbol }: MultipleValuationProps) => {
  const { data, isLoading, error } = useMultipleValuation(symbol);

  const [stockPrice, setStockPrice] = useState(60);
  const [eps, setEps] = useState(0);
  const [growthRateInPrecent, setGrowthRateInPrecent] = useState(0);
  const [pe, setPe] = useState(0);
  const [isAutocomplite, setIsAutocomplite] = useState(true);
  const [numberofYearsToProject, setNumberofYearsToProject] = useState(5);
  const [yieldReturn, setYieldReturn] = useState(12);
  const [multipleChartValues, setMultipleChartValues] = useState<MultipleValuationChart[]>([]);

  const setAutoComplite = (data: MultipleValuationEntity) => {
    setEps(data.eps);
    setGrowthRateInPrecent(data.GrowthRateInPrecent);
    setPe(data.peRecomended);
    return 0;
  };

  useEffect(() => {
    if (data) {
      if (isAutocomplite) {
        setAutoComplite(data as MultipleValuationEntity);
      }
      const multipleChartTemp: MultipleValuationChart[] = [];

      for (let index = 0; index <= numberofYearsToProject; index++) {
        const newEps = data.eps * Math.pow(1 + data.GrowthRateInPrecent / 100, index);
        multipleChartTemp.push({
          Year: (new Date().getFullYear() + index).toString(),
          EPS: newEps,
          StockPrice: newEps * data.peRecomended,
        });
      }

      setMultipleChartValues(multipleChartTemp);
    }
  }, [data]);

  useEffect(() => {
    const multipleChartTemp: MultipleValuationChart[] = [];

    for (let index = 0; index <= numberofYearsToProject; index++) {
      const newEps = eps * Math.pow(1 + growthRateInPrecent / 100, index);
      multipleChartTemp.push({
        Year: (new Date().getFullYear() + index).toString(),
        EPS: newEps,
        StockPrice: newEps * pe,
      });
    }

    setMultipleChartValues(multipleChartTemp);
  }, [pe, eps, growthRateInPrecent, numberofYearsToProject, yieldReturn]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    // cool error page with animation
    return <div>Something went wrong: {(error as any).message}</div>;
  }
  return (
    <div className="multiple-valuation">
      <div className="title">
        <h1>MultipleValuation - {data?.symbol}</h1>
      </div>
      <div className="input-fields">
        <div className="text-inputs">
          <TextField
            disabled={true}
            type="number"
            id="outlined-basic"
            label="EPS"
            variant="outlined"
            value={eps}
            onChange={(e) => setEps(parseInt(e.target.value))}
          />
          <TextField
            disabled={isAutocomplite}
            type="number"
            id="outlined-basic"
            label="Growth Rate"
            variant="outlined"
            InputProps={{
              startAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
            value={growthRateInPrecent}
            onChange={(e) => setGrowthRateInPrecent(parseInt(e.target.value))}
          />
          <TextField
            disabled={isAutocomplite}
            type="number"
            id="outlined-basic"
            label={isAutocomplite ? "Recomended PE" : "PE"}
            variant="outlined"
            value={pe}
            onChange={(e) => setPe(parseInt(e.target.value))}
          />
          <TextField
            defaultValue={numberofYearsToProject}
            type="number"
            id="outlined-basic"
            label="Number of Years To Project"
            variant="outlined"
            onChange={(e) => setNumberofYearsToProject(parseInt(e.target.value))}
          />
          <TextField
            type="number"
            id="outlined-basic"
            label="Wanted Yield Return"
            variant="outlined"
            InputProps={{
              startAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
            value={yieldReturn}
            onChange={(e) => setYieldReturn(parseInt(e.target.value))}
          />
        </div>
        <div className="autocomplite">
          <FormControlLabel
            control={
              <Switch
                checked={isAutocomplite}
                onChange={() => {
                  setIsAutocomplite(!isAutocomplite);
                  setAutoComplite(data as MultipleValuationEntity);
                }}
              />
            }
            label="AutoComplete"
          />
        </div>
      </div>
      <div className="charts">
        <div>
          <h2>StockPrice</h2>
          <LineChart width={600} height={300} data={multipleChartValues}>
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="Year" />
            <YAxis yAxisId="StockPrice" tick={{ fontSize: 15 }} />
            <Line
              yAxisId="StockPrice"
              type="monotone"
              dataKey={"StockPrice"}
              stroke={"#99FF99"}
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </div>
        <div>
          <h2>EPS</h2>
          <LineChart width={600} height={300} data={multipleChartValues}>
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="Year" />
            <YAxis yAxisId="EPS" tick={{ fontSize: 15 }} />
            <Line yAxisId="EPS" type="monotone" dataKey={"EPS"} stroke={"#FFB399"} dot={false} strokeWidth={2} />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default MultipleValuation;
