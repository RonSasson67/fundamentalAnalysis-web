import { Grow, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import "./DcfCalculator.css";
import { ChartContainer, LinePlot, MarkPlot } from "@mui/x-charts";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import CustomTooltip from "../ChartSlider/Component/CoustomToolTip";

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

const DCFCalculator: React.FC<StockCalculatorProps> = ({ data }) => {
  const avrageNetIncomeToFcf =
    data.historicalFinancials
      .map((financials) => financials.netIncome / financials.freeCashFlow)
      .reduce((acc, value) => acc + value, 0) / data.historicalFinancials.length;

  //calculate feature next 5 years net income
  const firstHistoricalYear = data.historicalFinancials[0].year;
  const estimatedFinancialsDependOnNetIncome: EstimatedFinancials[] = Array.from({ length: 5 }, (_, i) => {
    const year = firstHistoricalYear + i + 1;
    const lastYearNetIncome = data.historicalFinancials[0].netIncome;
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

  const estemateMarcetCapDependOnNetIncome =
    estimatedFinancialsDependOnNetIncome.reduce((acc, value) => acc + value.freeCashFlowCapitalize, 0) +
    intrinsicValueDependOnNetIncome;

  return (
    <div className="dcf_page">
      <Grow in={true} timeout={500}>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <Typography variant="h4">{data.symbol} Stock Valuation Calculator</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Parameter</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Stock Price</TableCell>
                  <TableCell>${data.stockPrice.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Market Cap</TableCell>
                  <TableCell>${data.MarketCap.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Price to Earnings Ratio</TableCell>
                  <TableCell>{data.recomandedMetrics.priceToErnings.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Price to Free Cash Flow Ratio</TableCell>
                  <TableCell>{data.recomandedMetrics.priceTofcf.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Discount Rate</TableCell>
                  <TableCell>{data.recomandedMetrics.discountRate}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Growth Rate</TableCell>
                  <TableCell>{data.recomandedMetrics.growthRate}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Terminal Growth Rate</TableCell>
                  <TableCell>{data.recomandedMetrics.terminalGrowthRate}%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grow>
      <Grow in={true} timeout={1500}>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <Typography variant="h6">Historical Financials</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  {data.historicalFinancials
                    .slice(0)
                    .reverse()
                    .map((financials) => (
                      <TableCell key={financials.year}>{financials.year}</TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {historicalNetIncome.length > 0 && (
                  <TableRow>
                    <TableCell>Net Income</TableCell>
                    <TableCell>
                      {
                        <LineChart
                          width={75}
                          height={75}
                          data={data.historicalFinancials.slice(0).reverse()}
                          margin={{ top: 15 }}
                        >
                          <XAxis dataKey="year" hide={true} />
                          <YAxis hide={true} />
                          <Tooltip content={<CustomTooltip />} />
                          <Line type="monotone" dataKey="netIncome" stroke="#8884d8" dot={false} strokeWidth={2} />
                        </LineChart>
                      }
                    </TableCell>
                    {historicalNetIncome
                      .slice(0)
                      .reverse()
                      .map((netIncome) => (
                        <TableCell key={netIncome}>${netIncome.toLocaleString()}</TableCell>
                      ))}
                  </TableRow>
                )}
                {historicalRevenue.length > 0 && (
                  <TableRow>
                    <TableCell>Revenue</TableCell>
                    {historicalRevenue
                      .slice(0)
                      .reverse()
                      .map((revenue) => (
                        <TableCell key={revenue}>${revenue.toLocaleString()}</TableCell>
                      ))}
                  </TableRow>
                )}
                {historicalFreeCashFlow.length > 0 && (
                  <TableRow>
                    <TableCell>Free Cash Flow</TableCell>
                    {historicalFreeCashFlow
                      .slice(0)
                      .reverse()
                      .map((freeCashFlow) => (
                        <TableCell key={freeCashFlow}>${freeCashFlow.toLocaleString()}</TableCell>
                      ))}
                  </TableRow>
                )}
                {historicalOperatingCashFlow.length > 0 && (
                  <TableRow>
                    <TableCell>Cash From Operations</TableCell>
                    {historicalOperatingCashFlow
                      .slice(0)
                      .reverse()
                      .map((cashFromOperations) => (
                        <TableCell key={cashFromOperations}>${cashFromOperations.toLocaleString()}</TableCell>
                      ))}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grow>
      <Grow in={true} timeout={2500}>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <Typography variant="h6">Financials Depend On Net Income</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  {estimatedFinancialsDependOnNetIncome.map((financials) => (
                    <TableCell key={financials.year}>{financials.year}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Net Income</TableCell>
                  {estimatedFinancialsDependOnNetIncome.map((financials) => (
                    <TableCell key={financials.year}>${financials.netIncome.toLocaleString()}</TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell>Free Cash Flow</TableCell>
                  {estimatedFinancialsDependOnNetIncome.map((financials) => (
                    <TableCell key={financials.year}>${financials.freeCashFlow.toLocaleString()}</TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell>Free Cash Flow Capitalize</TableCell>
                  {estimatedFinancialsDependOnNetIncome.map((financials) => (
                    <TableCell key={financials.year}>${financials.freeCashFlowCapitalize.toLocaleString()}</TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grow>
      <Grow in={true} timeout={3500}>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <Typography variant="h6">Summary DCF</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Estimated Marcet Cap Depend On Net Income</TableCell>
                  <TableCell>${estemateMarcetCapDependOnNetIncome.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Intrinsic Value Depend On Net Income</TableCell>
                  <TableCell>${intrinsicValueDependOnNetIncome.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Estimated Stock Price Depend On Free Cash Flow</TableCell>
                  <TableCell>
                    ${(estemateMarcetCapDependOnNetIncome / (data.MarketCap / data.stockPrice)).toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grow>
    </div>
  );
};

export default DCFCalculator;
