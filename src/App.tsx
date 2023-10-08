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
    step: { component: () => <DCFCalculator /> },
    stepName: "DCF",
  },
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

const App = observer(() => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route element={<Layot />}>
              <Route path="input" element={<InputSymbolPage />} />
              <Route path="summary" element={<FormSummary />} />
              <Route path="Multiple" element={<MultipleValuation />} />
              <Route path="dcf" element={<DCFCalculator />} />
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
