import ReceiptIcon from "@mui/icons-material/Receipt";
import TimelineIcon from "@mui/icons-material/Timeline";
import { BottomNavigation, BottomNavigationAction, Divider, Paper, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { stockPrice } from "../../Entity/DcfValuationEntity";
import useDcfValuation from "../../api/useDcfValuation";
import FinencialChart, { FinencialMetricschartData } from "./Charts/FinencialChart/FinencialChart";
import StockChart from "./Charts/StockChart/StockChart";
import "./DcfCalculator.css";
import DcfInputs from "./DcfInputs/DcfInputs";
import FinencialResults from "./Results/FinancialReuslts/FinencialResults";
import StockResults from "./Results/StockResults/StockResults";

interface EstimatedFinancials {
  year: number;
  netIncome: number;
  freeCashFlow: number;
  freeCashFlowCapitalize: number;
}

enum Charts {
  StockChart = "StockChart",
  FinencialMetricsChart = "FinencialMetricsChart",
}

const DCFCalculator = () => {
  const { getValues } = useFormContext();
  const [symbol, _] = useState(getValues().symbol);

  const { data, isLoading, isError } = useDcfValuation(symbol);

  const [selectedChart, setSelectedChart] = React.useState<Charts>(Charts.StockChart);
  const [finencialMetricsChartProps, setFinencialMetricsChartProps] = React.useState<FinencialMetricschartData[]>([]);
  const [fairMarketCapDependOnNetIncome, setFairMarketCapDependOnNetIncome] = React.useState<number>(0);
  const [estimatedStockPrice, setEstimatedStockPrice] = React.useState<stockPrice[]>([]);
  const [numberOfYearsToProject, setNumberOfYearsToProject] = React.useState<number>(6);

  useEffect(() => {
    if (data === undefined) return;

    const avrageNetIncomeToFcf =
      data.historicalFinancials
        .map((financials) => financials.netIncome / financials.freeCashFlow)
        .reduce((acc, value) => acc + value, 0) / data.historicalFinancials.length;

    const lastYearIndex = data.historicalFinancials.length - 1;
    //calculate feature next 5 years net income
    const firstHistoricalYear = data.historicalFinancials[lastYearIndex].year;
    const estimatedFinancialsDependOnNetIncome: EstimatedFinancials[] = Array.from(
      { length: numberOfYearsToProject },
      (_, i) => {
        const year = firstHistoricalYear + i + 1;
        const lastYearNetIncome = data.historicalFinancials[lastYearIndex].netIncome;
        const netIncome = lastYearNetIncome * Math.pow(1 + data.recomandedMetrics.growthRate / 100, i + 1);
        const freeCashFlow = netIncome / avrageNetIncomeToFcf;
        const freeCashFlowCapitalize = freeCashFlow / Math.pow(1 + data.recomandedMetrics.discountRate / 100, i + 1);
        return {
          year: year,
          netIncome: netIncome,
          freeCashFlow: freeCashFlow,
          freeCashFlowCapitalize: freeCashFlowCapitalize,
        };
      }
    );

    const intrinsicValueDependOnNetIncome =
      (estimatedFinancialsDependOnNetIncome[estimatedFinancialsDependOnNetIncome.length - 1].freeCashFlowCapitalize *
        (1 + data.recomandedMetrics.terminalGrowthRate / 100)) /
      (data.recomandedMetrics.discountRate / 100 - data.recomandedMetrics.terminalGrowthRate / 100) /
      Math.pow(1 + data.recomandedMetrics.discountRate / 100, 6);

    const fairMarketCapDependOnNetIncome =
      estimatedFinancialsDependOnNetIncome.reduce((acc, value) => acc + value.freeCashFlowCapitalize, 0) +
      intrinsicValueDependOnNetIncome;

    const FinencialMetricsChartProps = data.historicalFinancials
      .map((financials) => {
        return {
          year: financials.year,
          netIncome: financials.netIncome,
          freeCashFlow: financials.freeCashFlow,
        };
      })
      .concat(
        estimatedFinancialsDependOnNetIncome.map((estimatedFinancials) => {
          return {
            year: estimatedFinancials.year,
            netIncome: estimatedFinancials.netIncome,
            freeCashFlow: estimatedFinancials.freeCashFlow,
            freeCashFlowPresentValue: estimatedFinancials.freeCashFlowCapitalize,
          };
        })
      );

    const estimatedStockPrice = [
      {
        date: data.stockPricesAllHistory[data.stockPricesAllHistory.length - 1].date,
        close: data.stockPricesAllHistory[data.stockPricesAllHistory.length - 1].close,
      },
      {
        date: data.stockPricesAllHistory[data.stockPricesAllHistory.length - 1].date + 86400,
        close: fairMarketCapDependOnNetIncome / (data.MarketCap / data.stockPrice),
      },
    ];

    setFairMarketCapDependOnNetIncome(fairMarketCapDependOnNetIncome);
    setFinencialMetricsChartProps(FinencialMetricsChartProps);
    setEstimatedStockPrice(estimatedStockPrice);
  }, [data, numberOfYearsToProject]);

  //insert skeleton loader
  if (isLoading)
    return (
      <div className="dcf">
        <Paper className="inputs" elevation={3} style={{ padding: "16px" }}>
          <Skeleton variant="rounded" width={"100%"} height={"7%"} />
          <Skeleton variant="rounded" width={"100%"} height={"7%"} />
          <Skeleton variant="rounded" width={"100%"} height={"7%"} />
          <Skeleton variant="rounded" width={"100%"} height={"7%"} />
          <Skeleton variant="rounded" width={"100%"} height={"7%"} />
          <Skeleton variant="rounded" width={"100%"} height={"7%"} />
          <Skeleton variant="rounded" width={"100%"} height={"7%"} />
        </Paper>
        <Paper className="present_dcf" elevation={3} style={{ padding: "16px" }}>
          <div className="choosing_charts">
            <Skeleton variant="rounded" width={"100%"} height={"7%"} />
          </div>
          <Divider />
          <div className="chart">
            <Skeleton variant="rounded" width={"100%"} height={"50%"} />
          </div>
          <Divider />
          <div className="dcf_results_section">
            <Skeleton variant="rounded" width={"100%"} height={"7%"} />
            <Skeleton variant="rounded" width={"100%"} height={"7%"} />
          </div>
        </Paper>
      </div>
    );

  if (isError || data === undefined) return <>Error</>;
  //reactor
  return (
    <div className="dcf">
      <div className="title">
        <Typography variant="h3">Multiple Valuation</Typography>
      </div>
      <div className="dcf-logic">
        <DcfInputs
          stockPrice={data.stockPrice}
          markectCap={data.MarketCap * 1000000}
          numberOfYearsToProject={numberOfYearsToProject - 1}
          numberOfYearsToProjectOnChange={(_, value) => {
            if (value === null) return;
            setNumberOfYearsToProject(parseInt(value) + 1);
          }}
          priceToErnings={data.recomandedMetrics.priceToErnings}
          priceToErningsOnChange={() => {}}
          priceTofcf={data.recomandedMetrics.priceTofcf}
          priceTofcfOnChange={() => {}}
          discountRate={data.recomandedMetrics.discountRate}
          discountRateOnChange={() => {}}
          growthRate={data.recomandedMetrics.growthRate}
          growthRateOnChange={() => {}}
          terminalGrowthRate={data.recomandedMetrics.terminalGrowthRate}
          terminalGrowthRateOnChange={() => {}}
        />
        <Paper className="present_dcf" elevation={3} style={{ padding: "16px" }}>
          <div className="choosing_charts">
            <BottomNavigation
              showLabels
              value={selectedChart}
              onChange={(_, newValue) => {
                setSelectedChart(newValue);
              }}
            >
              <BottomNavigationAction label="Stock Price" icon={<TimelineIcon />} value={Charts.StockChart} />
              <BottomNavigationAction label="Financial Reports" icon={<ReceiptIcon />} value={Charts.FinencialMetricsChart} />
            </BottomNavigation>
          </div>
          <Divider />
          <div className="chart">
            {
              {
                [Charts.StockChart]: (
                  <StockChart
                    stockPricesAllHistory={data.stockPricesAllHistory}
                    stockPricesToday={data.stockPricesToday}
                    estimatedStockPrice={estimatedStockPrice}
                  />
                ),
                [Charts.FinencialMetricsChart]: <FinencialChart chartData={finencialMetricsChartProps} />,
              }[selectedChart]
            }
          </div>
          <Divider />
          <div className="dcf_results_section">
            {
              {
                [Charts.StockChart]: (
                  <StockResults
                    stockPrice={data.stockPrice}
                    fairPrice={fairMarketCapDependOnNetIncome / (data.MarketCap / data.stockPrice)}
                  />
                ),
                [Charts.FinencialMetricsChart]: (
                  <FinencialResults markectCap={data.MarketCap} fairMarkectCap={fairMarketCapDependOnNetIncome} />
                ),
              }[selectedChart]
            }
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default DCFCalculator;
