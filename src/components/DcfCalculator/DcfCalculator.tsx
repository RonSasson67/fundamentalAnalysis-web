import ReceiptIcon from "@mui/icons-material/Receipt";
import TimelineIcon from "@mui/icons-material/Timeline";
import {
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  Grow,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import CustomTooltip from "../ChartSlider/Component/CoustomToolTip";
import "./DcfCalculator.css";
import FinencialResults from "./FinancialReuslts/FinencialResults";
import FinencialMetricsChart, { FinencialMetricschartData } from "./FinencialChart/FinencialChart";
import StockChart from "./StockChart/StockChart";

interface StockCalculatorProps {
  data: {
    symbol: string;
    stockPrice: number;
    MarketCap: number;
    recomandedMetrics: {
      priceToErnings: number;
      priceTofcf: number;
      discountRate: number;
      growthRate: number;
      terminalGrowthRate: number;
    };
    historicalFinancials: {
      year: number;
      netIncome: number;
      revenue: number;
      cashFromOperations: number;
      freeCashFlow: number;
    }[];
  };
}

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

const DCFCalculator: React.FC<StockCalculatorProps> = ({ data }) => {
  const [selectedChart, setSelectedChart] = React.useState<Charts>(Charts.StockChart);
  const avrageNetIncomeToFcf =
    data.historicalFinancials
      .map((financials) => financials.netIncome / financials.freeCashFlow)
      .reduce((acc, value) => acc + value, 0) / data.historicalFinancials.length;

  const lastYearIndex = data.historicalFinancials.length - 1;
  //calculate feature next 5 years net income
  const firstHistoricalYear = data.historicalFinancials[lastYearIndex].year;
  const estimatedFinancialsDependOnNetIncome: EstimatedFinancials[] = Array.from({ length: 5 }, (_, i) => {
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
  });

  const historicalNetIncome = data.historicalFinancials.map((financials) => financials.netIncome);
  const historicalRevenue = data.historicalFinancials.map((financials) => financials.revenue);
  const historicalFreeCashFlow = data.historicalFinancials.map((financials) => financials.freeCashFlow);
  const historicalOperatingCashFlow = data.historicalFinancials.map((financials) => financials.cashFromOperations);

  const intrinsicValueDependOnNetIncome =
    (estimatedFinancialsDependOnNetIncome[estimatedFinancialsDependOnNetIncome.length - 1].freeCashFlowCapitalize *
      (1 + data.recomandedMetrics.terminalGrowthRate / 100)) /
    (data.recomandedMetrics.discountRate / 100 - data.recomandedMetrics.terminalGrowthRate / 100) /
    Math.pow(1 + data.recomandedMetrics.discountRate / 100, 6);

  const estemateMarketCapDependOnNetIncome =
    estimatedFinancialsDependOnNetIncome.reduce((acc, value) => acc + value.freeCashFlowCapitalize, 0) +
    intrinsicValueDependOnNetIncome;

  const finencialMetricsChartProps: FinencialMetricschartData[] = data.historicalFinancials
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

  //reactor
  return (
    <div className="dcf">
      <Paper className="inputs" elevation={3} style={{ padding: "16px" }}>
        <TextField
          type="number"
          id="outlined-basic"
          label="Stock Price"
          variant="outlined"
          value={data.stockPrice}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <TextField
          type="number"
          id="outlined-basic"
          label="Market Cap"
          variant="outlined"
          value={data.MarketCap}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <TextField
          type="number"
          id="outlined-basic"
          label="Price to Earnings Ratio"
          variant="outlined"
          value={data.recomandedMetrics.priceToErnings}
        />
        <TextField
          type="number"
          id="outlined-basic"
          label="Price to Free Cash Flow Ratio"
          variant="outlined"
          value={data.recomandedMetrics.priceTofcf}
        />
        <TextField
          type="number"
          id="outlined-basic"
          label="Discount Rate"
          variant="outlined"
          value={data.recomandedMetrics.discountRate}
          InputProps={{
            startAdornment: <InputAdornment position="start">%</InputAdornment>,
          }}
        />
        <TextField
          type="number"
          id="outlined-basic"
          label="Growth Rate"
          variant="outlined"
          value={data.recomandedMetrics.growthRate}
          InputProps={{
            startAdornment: <InputAdornment position="start">%</InputAdornment>,
          }}
        />
        <TextField
          type="number"
          id="outlined-basic"
          label="Terminal Growth Rate"
          variant="outlined"
          value={data.recomandedMetrics.terminalGrowthRate}
          InputProps={{
            startAdornment: <InputAdornment position="start">%</InputAdornment>,
          }}
        />
      </Paper>
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
              [Charts.StockChart]: <StockChart />,
              [Charts.FinencialMetricsChart]: <FinencialMetricsChart chartData={finencialMetricsChartProps} />,
            }[selectedChart]
          }
        </div>
        <Divider />
        <div className="dcf_results_section">
          {
            {
              [Charts.StockChart]: <>aaa</>,
              [Charts.FinencialMetricsChart]: (
                <FinencialResults markectCap={data.MarketCap} estimateMarkectCap={estemateMarketCapDependOnNetIncome} />
              ),
            }[selectedChart]
          }
        </div>
      </Paper>
    </div>
  );

  return (
    <div className="dcf_page">
      <Grow in={true} timeout={500}>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <Typography variant="h6">{data.symbol} Stock Valuation Calculator</Typography>
          <CustomTable
            headers={["Parameter", "Value"]}
            data={[
              ["Stock Price", `$${data.stockPrice.toLocaleString()}`],
              ["Market Cap", `$${data.MarketCap.toLocaleString()}`],
              ["Price to Earnings Ratio", data.recomandedMetrics.priceToErnings.toLocaleString()],
              ["Price to Free Cash Flow Ratio", data.recomandedMetrics.priceTofcf.toLocaleString()],
              ["Discount Rate", `${data.recomandedMetrics.discountRate.toLocaleString()}%`],
              ["Growth Rate", `${data.recomandedMetrics.growthRate.toLocaleString()}%`],
              ["Terminal Growth Rate", `${data.recomandedMetrics.terminalGrowthRate.toLocaleString()}%`],
            ]}
          />
        </Paper>
      </Grow>
      <Grow in={true} timeout={1500}>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <Typography variant="h6">Historical Financials</Typography>
          <CustomTable
            headers={["", "", ...data.historicalFinancials.map((financials) => financials.year.toString())]}
            data={[
              [
                "Net Income",
                <LineChartWrapper data={data.historicalFinancials} dataKey={"netIncome"} />,
                ...historicalNetIncome.map((value) => `$${value.toLocaleString()}`),
              ],
              [
                "Revenue",
                <LineChartWrapper data={data.historicalFinancials} dataKey={"revenue"} />,
                ...historicalRevenue.map((value) => `$${value.toLocaleString()}`),
              ],
              [
                "Free Cash Flow",
                <LineChartWrapper data={data.historicalFinancials} dataKey={"freeCashFlow"} />,
                ...historicalFreeCashFlow.map((value) => `$${value.toLocaleString()}`),
              ],
              [
                "Cash From Operations",
                <LineChartWrapper data={data.historicalFinancials} dataKey={"cashFromOperations"} />,
                ...historicalOperatingCashFlow.map((value) => `$${value.toLocaleString()}`),
              ],
            ]}
          />
        </Paper>
      </Grow>
      <Grow in={true} timeout={2500}>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <Typography variant="h6">Estimated Financials</Typography>
          <CustomTable
            headers={["", ...estimatedFinancialsDependOnNetIncome.map((financials) => financials.year.toString())]}
            data={[
              [
                "Net Income",
                <LineChartWrapper
                  data={estimatedFinancialsDependOnNetIncome.map((estimatedFinancials) => {
                    return { year: estimatedFinancials.year, netIncome: estimatedFinancials.netIncome };
                  })}
                  dataKey={"netIncome"}
                />,
                ...estimatedFinancialsDependOnNetIncome.map(
                  (value) => `$${value.netIncome.toLocaleString().toLocaleString()}`
                ),
              ],
              [
                "Free Cash Flow",
                <LineChartWrapper
                  data={estimatedFinancialsDependOnNetIncome.map((estimatedFinancials) => {
                    return { year: estimatedFinancials.year, freeCashFlow: estimatedFinancials.freeCashFlow };
                  })}
                  dataKey={"freeCashFlow"}
                />,
                ...estimatedFinancialsDependOnNetIncome.map((value) => `$${value.freeCashFlow.toLocaleString()}`),
              ],
              [
                "Free Cash Flow Present Value",
                <LineChartWrapper
                  data={estimatedFinancialsDependOnNetIncome.map((estimatedFinancials) => {
                    return {
                      year: estimatedFinancials.year,
                      freeCashFlowCapitalize: estimatedFinancials.freeCashFlowCapitalize,
                    };
                  })}
                  dataKey={"freeCashFlowCapitalize"}
                />,
                ...estimatedFinancialsDependOnNetIncome.map((value) => `$${value.freeCashFlowCapitalize.toLocaleString()}`),
              ],
            ]}
          />
        </Paper>
      </Grow>
      <Grow in={true} timeout={4500}>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <Typography variant="h6">Intrinsic Value</Typography>
          <CustomTable
            headers={["", "Value"]}
            data={[
              ["Discounted Cash Flow", `$${estemateMarketCapDependOnNetIncome.toLocaleString()}`],
              ["Intrinsic Value", `$${intrinsicValueDependOnNetIncome.toLocaleString()}`],
              [
                "Stock Price Estimated",
                `$${(estemateMarketCapDependOnNetIncome / (data.MarketCap / data.stockPrice)).toLocaleString()}`,
              ],
            ]}
          />
        </Paper>
      </Grow>
    </div>
  );
};

const LineChartWrapper = ({ data, dataKey }: { data: any[]; dataKey: string }) => (
  <LineChart width={75} height={75} data={data} margin={{ top: 15 }}>
    <XAxis dataKey="year" hide={true} />
    <YAxis hide={true} />
    <Tooltip content={<CustomTooltip />} />
    <Line type="monotone" dataKey={dataKey} stroke="#99FF99" dot={false} strokeWidth={2} />
  </LineChart>
);

// Create a reusable Table component
type CustomTableProps = {
  headers: string[];
  data: any[][];
};

const CustomTable = ({ headers, data }: CustomTableProps) => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableCell key={header}>{header}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <TableCell key={cellIndex}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default DCFCalculator;
