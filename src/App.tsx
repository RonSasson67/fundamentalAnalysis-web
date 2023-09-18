import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { observer } from "mobx-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import MetricsType from "./Entity/MetricsType";
import RatioType from "./Entity/RatioType";
import InputSymbolPage from "./Pages/InputSymbolPage/InputSymbolPage";
import ChartSliderWrapper from "./components/ChartSlider/ChartSliderWrapper";
import FormSummary from "./components/FomrSummary/FormSummary";
import MultipleValuation from "./components/MultipleValuation/MultipleValuation";
import TabelWrapper from "./components/TabelWrapper/TabelWrapper";
import FormikWizardWrapper, { FormStep } from "./components/WizzardForm/FormikWizardWrapper";
import DCFCalculator from "./components/DcfCalculator/DcfCalculator";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#18a59c",
    },
    secondary: {
      main: "#07312e",
    },
    text: {
      primary: "rgba(255,252,252,0.87)",
    },
    background: {
      default: "#062826",
      paper: "##24e0d3",
    },
  },
});

const queryClient = new QueryClient();

const Layot = () => {
  return (
    <div className="app">
      <Outlet />
    </div>
  );
};

const formStep: FormStep[] = [
  {
    step: { component: () => <TabelWrapper metricsType={MetricsType.General} /> },
    stepName: "General",
  },
  {
    step: { component: () => <TabelWrapper metricsType={MetricsType.Valuation} /> },
    stepName: "Valuation",
  },
  {
    step: { component: () => <TabelWrapper metricsType={MetricsType.FinancialHealth} /> },
    stepName: "FinancialHealth",
  },
  {
    step: { component: () => <TabelWrapper metricsType={MetricsType.Profitability} /> },
    stepName: "Profitability",
  },
  {
    step: { component: () => <ChartSliderWrapper symbol="Mock" ratioType={RatioType.PE} /> },
    stepName: "PE",
  },
  {
    step: { component: () => <MultipleValuation /> },
    stepName: "Multiple Valuation",
  },
];

const financeData = {
  symbol: "Meta",
  metrics: {
    "Over View": {
      "Market Cap": {
        checkbox: false,
        note: "aa",
        value: "734.76B",
      },
      Industry: {
        checkbox: false,
        note: "bb\n\nc",
        value: "Media",
      },
      "EPS (TTM)": {
        checkbox: false,
        note: "v",
        value: "8.63",
      },
      "Div & Yield": {
        checkbox: true,
        note: "c",
        value: "0.00 (0.00)",
      },
      "Shares Outstanding": {
        checkbox: true,
        note: "",
        value: "2.57B",
      },
      "Ex-Dividend": {
        checkbox: true,
        note: "",
        value: "--",
      },
      "Next Earnings": {
        checkbox: false,
        note: "a",
        value: "10-24",
      },
      "Payout Ratio": {
        checkbox: true,
        note: "",
        value: "0.00",
      },
      "Earnings Yield": {
        checkbox: true,
        note: "",
        value: "3.07",
      },
    },
    Valuation: {
      "P/E (TTM)": {
        checkbox: true,
        note: "",
        value: "34.23",
      },
      "Forward P/E": {
        checkbox: false,
        note: "good",
        value: "14.95",
      },
      "P/FCF (TTM)": {
        checkbox: false,
        note: "",
        value: "30.57",
      },
      "P/S (TTM)": {
        checkbox: true,
        note: "",
        value: "2.614",
      },
      "Forward PEG": {
        checkbox: true,
        note: "",
        value: "2.635",
      },
    },
    "Financial Health": {
      "Current Ratio": {
        checkbox: true,
        note: "aaa",
        value: "2.20",
      },
      "financial leverage": {
        checkbox: false,
        note: "",
        value: "0.48",
      },
    },
    profitability: {
      "Return On Equity": {
        checkbox: true,
        note: "",
        value: "17.40%",
      },
      "Profit Margin(TTM)": {
        checkbox: false,
        note: "aaaa",
        value: "78.30%",
      },
      "Operating margin(TTM)": {
        checkbox: true,
        note: "",
        value: "24.88%",
      },
      "Net Income Margin": {
        checkbox: false,
        note: "",
        value: "19.94%",
      },
    },
  },
  multiple_valuation: {
    value: {
      eps: 8.59,
      groth_rate: 19.55,
      pe: 27.78,
      number_of_years_to_project: 5,
      wanted_yield_rreturn: 12,
      current_price: 285.5,
    },
    result: {
      sefety_margin: "-1.76",
      expected_price: "330.66",
    },
  },
};

const App = observer(() => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route element={<Layot />}>
              <Route path="input" element={<InputSymbolPage />} />
              <Route path="summary" element={<FormSummary data={financeData} />} />
              <Route path="Multiple" element={<MultipleValuation />} />
              <Route
                path="dcf"
                element={
                  <DCFCalculator
                    data={{
                      symbol: "aapl",
                      stockPrice: 175.01,
                      MarketCap: 2778862.8,
                      recomandedMetrics: {
                        priceToErnings: 24.22913,
                        priceTofcf: 22.026384999999998,
                        discountRate: 8,
                        growthRate: 6.36,
                        terminalGrowthRate: 2,
                      },
                      historicalFinancials: [
                        {
                          year: 2022,
                          netIncome: 99803000000 / 1000000,
                          revenue: 394328000000 / 1000000,
                          cashFromOperations: 122151000000 / 1000000,
                          freeCashFlow: 111443000000 / 1000000,
                        },
                        {
                          year: 2021,
                          netIncome: 94680000000 / 1000000,
                          revenue: 365817000000 / 1000000,
                          cashFromOperations: 104038000000 / 1000000,
                          freeCashFlow: 92953000000 / 1000000,
                        },
                        {
                          year: 2020,
                          netIncome: 57411000000 / 1000000,
                          revenue: 274515000000 / 1000000,
                          cashFromOperations: 80674000000 / 1000000,
                          freeCashFlow: 73365000000 / 1000000,
                        },
                        {
                          year: 2019,
                          netIncome: 55256000000 / 1000000,
                          revenue: 260174000000 / 1000000,
                          cashFromOperations: 69391000000 / 1000000,
                          freeCashFlow: 58896000000 / 1000000,
                        },
                        {
                          year: 2018,
                          netIncome: 59531000000 / 1000000,
                          revenue: 265595000000 / 1000000,
                          cashFromOperations: 77434000000 / 1000000,
                          freeCashFlow: 64121000000 / 1000000,
                        },
                      ],
                    }}
                  />
                }
              />
              <Route path="form">
                <Route path=":symbol" element={<FormikWizardWrapper formSteps={formStep} />} />
              </Route>
              <Route path="/" element={<Navigate to={"input"} replace={true} />}></Route>
              <Route path="*" element={<div>404 :(</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
});

export default App;
