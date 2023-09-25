import { FormControlLabel, InputAdornment, Switch, TextField } from "@mui/material";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { MultipleValuationEntity } from "../../Entity/MultipleValuationResponse";
import useMultipleValuation from "../../api/useMultipleValuation";
import {
  CURRENT_PRICE_PREFIX,
  DEFULT_NUMBER_OF_YEATS,
  DEFULT_WANTED_YIELD_RRETURN,
  EPS_PREFIX,
  EXPECTED_PRICE_PREFIX,
  GROTH_RATE_PREFIX,
  NUMBER_OF_YEARS_TO_PROJECT_PREFIX,
  PE_PREFIX,
  SEFETY_MARGIN_PREFIX,
  WANTED_YIELD_RRETURN_PREFIX,
} from "../../constants";
import CustomTooltip from "../ChartSlider/Component/CoustomToolTip";
import "./MultipleValuation.css";
import RowGrids from "./RowGrids/RowGrids";

type MultipleValuationChart = {
  Year: string;
  EPS: number;
  StockPrice: number;
};

const MultipleValuation = observer(() => {
  const { control, getValues, setValue, watch } = useFormContext();
  const watchUpdate = useWatch({
    control,
    name: [EPS_PREFIX, GROTH_RATE_PREFIX, PE_PREFIX, NUMBER_OF_YEARS_TO_PROJECT_PREFIX, WANTED_YIELD_RRETURN_PREFIX],
  });
  const [symbol, _] = useState(getValues().symbol);
  const { data, isLoading, error } = useMultipleValuation(symbol);

  const [isAutocomplite, setIsAutocomplite] = useState(true);
  const [multipleChartValues, setMultipleChartValues] = useState<MultipleValuationChart[]>([]);

  const setAutoComplite = (data: MultipleValuationEntity) => {
    setValue(EPS_PREFIX, parseFloat(data.eps.toFixed(2)));
    setValue(GROTH_RATE_PREFIX, data.GrowthRateInPrecent);
    setValue(PE_PREFIX, parseFloat(data.peRecomended.toFixed(2)));
  };

  useEffect(() => {
    if (data) {
      if (isAutocomplite) {
        setAutoComplite(data as MultipleValuationEntity);
      }
      !getValues(CURRENT_PRICE_PREFIX) ? setValue(CURRENT_PRICE_PREFIX, data.stockPrice) : "";
      !getValues(NUMBER_OF_YEARS_TO_PROJECT_PREFIX) ? setValue(NUMBER_OF_YEARS_TO_PROJECT_PREFIX, DEFULT_NUMBER_OF_YEATS) : "";
      !getValues(WANTED_YIELD_RRETURN_PREFIX) ? setValue(WANTED_YIELD_RRETURN_PREFIX, DEFULT_WANTED_YIELD_RRETURN) : "";
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const multipleChartTemp: MultipleValuationChart[] = [];
      const eps = getValues(EPS_PREFIX);
      const growthRateInPrecent = getValues(GROTH_RATE_PREFIX);
      const pe = getValues(PE_PREFIX);
      const numberofYearsToProject = getValues(NUMBER_OF_YEARS_TO_PROJECT_PREFIX);
      const yieldReturn = getValues(WANTED_YIELD_RRETURN_PREFIX);
      const stockPrice = getValues(CURRENT_PRICE_PREFIX);

      for (let index = 0; index <= numberofYearsToProject; index++) {
        const newEps = eps * Math.pow(1 + growthRateInPrecent / 100, index);
        multipleChartTemp.push({
          Year: (new Date().getFullYear() + index).toString(),
          EPS: parseFloat(newEps.toFixed(2)),
          StockPrice: parseFloat((newEps * pe).toFixed(2)),
        });
      }
      const expectedPriceTemp =
        (multipleChartTemp[multipleChartTemp.length - 1]?.StockPrice as number) /
        Math.pow(1 + yieldReturn / 100, numberofYearsToProject);

      setMultipleChartValues(multipleChartTemp);
      setValue(EXPECTED_PRICE_PREFIX, expectedPriceTemp.toFixed(2));
      setValue(
        SEFETY_MARGIN_PREFIX,
        (((parseInt(expectedPriceTemp.toFixed(0)) - parseInt(stockPrice.toFixed(0))) / stockPrice) * 100).toFixed(2)
      );
    }
  }, [watchUpdate]);

  if (error) {
    // cool error page with animation
    return <div>Something went wrong: {(error as any).message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="multiple-valuation">
      <div className="title">
        <h1>MultipleValuation - {data?.symbol}</h1>
      </div>
      <div className="input-fields">
        <div className="text-inputs">
          <Controller
            name={GROTH_RATE_PREFIX}
            control={control}
            render={({ field }) => (
              <TextField
                disabled={isAutocomplite}
                type="number"
                id="outlined-basic"
                label="Growth Rate"
                variant="outlined"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
                {...field}
              />
            )}
          />
          <Controller
            name={PE_PREFIX}
            defaultValue={0}
            control={control}
            render={({ field }) => (
              <TextField
                disabled={isAutocomplite}
                type="number"
                id="outlined-basic"
                label={isAutocomplite ? "Recomended PE" : "PE"}
                variant="outlined"
                {...field}
              />
            )}
          />
          <Controller
            name={NUMBER_OF_YEARS_TO_PROJECT_PREFIX}
            defaultValue={DEFULT_NUMBER_OF_YEATS}
            control={control}
            render={({ field }) => (
              <TextField type="number" id="outlined-basic" label="Number of Years To Project" variant="outlined" {...field} />
            )}
          ></Controller>
          <Controller
            name={WANTED_YIELD_RRETURN_PREFIX}
            defaultValue={DEFULT_WANTED_YIELD_RRETURN}
            control={control}
            render={({ field }) => (
              <TextField
                type="number"
                id="outlined-basic"
                label="Wanted Yield Return"
                variant="outlined"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
                {...field}
              />
            )}
          />
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
      <div className="chart">
        <ResponsiveContainer width="95%" height="80%">
          <LineChart data={multipleChartValues}>
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="Year" />
            <YAxis yAxisId="StockPrice" tick={{ fontSize: 15 }} />
            <Line yAxisId="StockPrice" type="monotone" dataKey={"StockPrice"} stroke={"#99FF99"} dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="results">
        <Controller
          name={CURRENT_PRICE_PREFIX}
          control={control}
          render={({ field }) => (
            <TextField
              id="outlined-basic"
              label="Current Price"
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              {...field}
            />
          )}
        />
        <Controller
          name={SEFETY_MARGIN_PREFIX}
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="text"
              id="outlined-basic"
              label="Sefety Margin"
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              color={watch(SEFETY_MARGIN_PREFIX) <= 0 ? "error" : watch(SEFETY_MARGIN_PREFIX) >= 20 ? "success" : "warning"}
              focused
              {...field}
            />
          )}
        />
        <Controller
          name={EXPECTED_PRICE_PREFIX}
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <TextField
              id="outlined-basic"
              label="Expected Price"
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              {...field}
            />
          )}
        />
      </div>
    </div>
  );
});

export default MultipleValuation;
