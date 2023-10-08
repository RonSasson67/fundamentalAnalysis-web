import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { stockPrice } from "../../../../Entity/DcfValuationEntity";
import { CustomTickTimeStamp } from "../../../Common/CustomTick/CustomTickTimeStamp ";
import CoustomToolTipTimeStamp from "../../../Common/CustomToolTip/CoustomToolTipTimeStamp";
interface StockPriceChartProps {
  stockPricesAllHistory: stockPrice[];
  stockPricesToday: stockPrice[];
  estimatedStockPrice: stockPrice[];
}

interface StockPriceChart {
  date: number;
  close?: number;
  estimated?: number;
}

const StockChart = ({ stockPricesAllHistory, estimatedStockPrice }: StockPriceChartProps) => {
  const [stockPricesChart, setStockPricesChart] = useState<StockPriceChart[]>([]);
  const [stockPricesChartRange, _] = useState<number>(10);

  useEffect(() => {
    if (stockPricesAllHistory.length > 0) {
      const stockPricesChart: StockPriceChart[] = SetFilterStockPrice(stockPricesChartRange, stockPricesAllHistory).map(
        (value) => {
          return {
            date: value.date,
            close: value.close,
          };
        }
      );
      const estimatedStockPricesChart: StockPriceChart[] = estimatedStockPrice.map((value) => {
        return {
          date: value.date,
          estimated: value.close,
        };
      });
      setStockPricesChart(stockPricesChart.concat(estimatedStockPricesChart));
    }
  }, [stockPricesAllHistory, estimatedStockPrice, stockPricesChartRange]);

  return (
    <>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={stockPricesChart} margin={{ top: 5, right: 20, bottom: 40, left: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={CustomTickTimeStamp} type="number" scale="time" domain={["min", "auto"]} />
          <YAxis tick={{ fontSize: 15 }} domain={["auto", "auto"]} />
          <Tooltip content={<CoustomToolTipTimeStamp />} />
          <Line type="monotone" dataKey="close" stroke="#82ca9d" dot={false} strokeWidth={2} />
          <Line type="monotone" dataKey="estimated" stroke="#ff0000" dot={true} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default StockChart;

const SetFilterStockPrice = (stockPricesChartRange: number, stockPricesAllHistory: stockPrice[]) => {
  const currentDate = new Date();
  const chosingYearsAgo = new Date(currentDate.getTime() - stockPricesChartRange * 365 * 24 * 60 * 60 * 1000);

  const stockPricesChart: stockPrice[] = stockPricesAllHistory.filter((value) => {
    const date = new Date(value.date * 1000);
    return date.getTime() >= chosingYearsAgo.getTime();
  });
  return stockPricesChart;
};
