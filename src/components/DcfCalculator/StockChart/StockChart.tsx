import axios from "axios";
import { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import CustomTooltip from "../../ChartSlider/Component/CoustomToolTip";
import CustomTick from "../../ChartSlider/Component/CustomTick ";
import { TextField } from "@mui/material";

interface StockPriceChartProps {
  date: string;
  close: number;
}
const StockChart = () => {
  const [stockPricesChart, setStockPricesChart] = useState<StockPriceChartProps[]>([]);
  const [StockPriceCahce, setStockPriceCahce] = useState<StockPriceChartProps[]>([]);
  const [stockPricesChartRange, setStockPricesChartRange] = useState<number>(2);

  useEffect(() => {
    const fetchData = async () => {
      const FINNHUB_API_KEY = "ck6qs5pr01qmp9pd4l90ck6qs5pr01qmp9pd4l9g";

      const currentDate = new Date();
      const chosingYearsAgo = new Date(currentDate.getTime() - stockPricesChartRange * 365 * 24 * 60 * 60 * 1000);

      const to = Math.floor(currentDate.getTime() / 1000);
      const symbol = "aapl";

      const result = await axios.get(
        `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${0}&to=${to}&token=${FINNHUB_API_KEY}`
      );

      const stockPrice: StockPriceChartProps[] = result.data.c.map((value: number, index: number) => {
        const date = new Date(result.data.t[index] * 1000);
        return {
          date: date.toString(),
          close: value,
        };
      });
      const filterStockPrice: StockPriceChartProps[] = stockPrice.filter((value) => {
        const date = new Date(value.date);
        return date.getTime() >= chosingYearsAgo.getTime();
      });

      console.log(filterStockPrice);
      setStockPricesChart(filterStockPrice);
      setStockPriceCahce(stockPrice);
    };
    if (stockPricesChart.length === 0) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (StockPriceCahce.length > 0) {
      const currentDate = new Date();
      const chosingYearsAgo = new Date(currentDate.getTime() - stockPricesChartRange * 365 * 24 * 60 * 60 * 1000);

      const tempStockPrice: StockPriceChartProps[] = StockPriceCahce.filter((value) => {
        const date = new Date(value.date);
        return date.getTime() >= chosingYearsAgo.getTime();
      });

      setStockPricesChart(tempStockPrice);
    }
  }, [stockPricesChartRange]);

  if (stockPricesChart.length === 0) {
    return <></>;
  }

  return (
    <>
      <TextField
        id="outlined-number"
        label="Years"
        type="number"
        value={stockPricesChartRange}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        onChange={(event) => {
          const value = parseInt(event.target.value);
          if (value > 0) {
            setStockPricesChartRange(value);
          }
        }}
      ></TextField>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={stockPricesChart} margin={{ top: 5, right: 20, bottom: 40, left: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={CustomTick} />
          <YAxis tick={{ fontSize: 15 }} domain={["auto", "auto"]} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="close" stroke="#8884d8" dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default StockChart;
