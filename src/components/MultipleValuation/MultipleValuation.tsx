import { FormControlLabel, InputAdornment, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { MultipleValuationEntity } from "../../Entity/MultipleValuationResponse";
import useMultipleValuation from "../../api/useMultipleValuation";
import CustomTooltip from "../ChartSlider/Component/CoustomToolTip";
import "./MultipleValuation.css";
import RowGrids from "./RowGrids/RowGrids";

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

  const [eps, setEps] = useState(0);
  const [growthRateInPrecent, setGrowthRateInPrecent] = useState(0);
  const [pe, setPe] = useState(0);
  const [numberofYearsToProject, setNumberofYearsToProject] = useState(5);
  const [yieldReturn, setYieldReturn] = useState(12);

  const [isAutocomplite, setIsAutocomplite] = useState(true);

  const [multipleChartValues, setMultipleChartValues] = useState<MultipleValuationChart[]>([]);

  const [stockPrice, setStockPrice] = useState(0);
  const [expectedPrice, setExpectedPrice] = useState(0);
  const [sefetyMargin, setSefetyMargin] = useState(0);

  const setAutoComplite = (data: MultipleValuationEntity) => {
    setEps(parseFloat(data.eps.toFixed(2)));
    setGrowthRateInPrecent(data.GrowthRateInPrecent);
    setPe(parseFloat(data.peRecomended.toFixed(2)));
  };

  useEffect(() => {
    if (data) {
      if (isAutocomplite) {
        setAutoComplite(data as MultipleValuationEntity);
      }
      setStockPrice(data.stockPrice);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const multipleChartTemp: MultipleValuationChart[] = [];

      for (let index = 0; index <= numberofYearsToProject; index++) {
        const newEps = eps * Math.pow(1 + growthRateInPrecent / 100, index);
        multipleChartTemp.push({
          Year: (new Date().getFullYear() + index).toString(),
          EPS: parseFloat(newEps.toFixed(2)),
          StockPrice: parseFloat((newEps * pe).toFixed(0)),
        });
      }

      const expectedPriceTemp =
        (multipleChartTemp.findLast((value) => value.StockPrice)?.StockPrice as number) /
        Math.pow(1 + yieldReturn / 100, numberofYearsToProject);

      setMultipleChartValues(multipleChartTemp);
      setExpectedPrice(expectedPriceTemp);
      setSefetyMargin(((parseInt(expectedPriceTemp.toFixed(0)) - parseInt(stockPrice.toFixed(0))) / stockPrice) * 100);
    }
  }, [pe, eps, growthRateInPrecent, numberofYearsToProject, yieldReturn]);

  if (isLoading || !!!expectedPrice) {
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
        <div className="chart">
          <div className="title">
            <h2>StockPrice</h2>
          </div>
          <LineChart width={525} height={250} data={multipleChartValues}>
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
          <RowGrids values={multipleChartValues.map((values) => `${values.StockPrice}$`)} />
        </div>
        <div className="chart">
          <div className="title">
            <h2>EPS</h2>
          </div>
          <LineChart width={525} height={250} data={multipleChartValues}>
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="Year" />
            <YAxis yAxisId="EPS" tick={{ fontSize: 15 }} />
            <Line yAxisId="EPS" type="monotone" dataKey={"EPS"} stroke={"#99FF99"} dot={false} strokeWidth={2} />
          </LineChart>
          <RowGrids values={multipleChartValues.map((values) => values.EPS)} />
        </div>
      </div>
      <div className="charts results">
        <TextField
          id="outlined-basic"
          label="Current Price"
          variant="outlined"
          value={stockPrice}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <TextField
          type="text"
          id="outlined-basic"
          label="Sefety Margin"
          variant="outlined"
          InputProps={{
            startAdornment: <InputAdornment position="start">%</InputAdornment>,
          }}
          value={sefetyMargin.toFixed(2)}
          color={sefetyMargin <= 0 ? "error" : sefetyMargin >= 20 ? "success" : "warning"}
          focused
        />
        <TextField
          id="outlined-basic"
          label="Expected Price"
          variant="outlined"
          value={expectedPrice.toFixed(0)}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </div>
    </div>
  );
};

export default MultipleValuation;
