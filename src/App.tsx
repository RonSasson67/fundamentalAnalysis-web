import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { observer } from "mobx-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import MetricsType from "./Entity/MetricsType";
import RatioType from "./Entity/RatioType";
import InputSymbolPage from "./Pages/InputSymbolPage/InputSymbolPage";
import ChartSliderWrapper from "./components/ChartSlider/ChartSliderWrapper";
import TabelWrapper from "./components/TabelWrapper/TabelWrapper";
import FormikWizardWrapper, { FormikWizardWrapperProp } from "./components/WizzardForm/FormikWizardWrapper";
import MultipleValuation from "./components/MultipleValuation/MultipleValuation";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const queryClient = new QueryClient();

const Layot = () => {
  return <Outlet />;
};

const formikWizardWrapperProp: FormikWizardWrapperProp = {
  formSteps: [
    {
      step: { component: () => <TabelWrapper symbol="AAPL" metricsType={MetricsType.General} /> },
      stepName: "AAPL - General",
    },
    {
      step: { component: () => <TabelWrapper symbol="AAPL" metricsType={MetricsType.Valuation} /> },
      stepName: "AAPL - Valuation",
    },
    {
      step: { component: () => <TabelWrapper symbol="AAPL" metricsType={MetricsType.FinancialHealth} /> },
      stepName: "AAPL - FinancialHealth",
    },
    {
      step: { component: () => <TabelWrapper symbol="AAPL" metricsType={MetricsType.Profitability} /> },
      stepName: "AAPL - Profitability",
    },
    {
      step: { component: () => <ChartSliderWrapper symbol="META" ratioType={RatioType.PE} /> },
      stepName: "META - PE",
    },
  ],
};

const App = observer(() => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layot />}>
              <Route path="input" element={<InputSymbolPage />} />
              <Route path="form" element={<FormikWizardWrapper formSteps={formikWizardWrapperProp.formSteps} />} />
              <Route path="Multiple" element={<MultipleValuation symbol="META" />} />
              <Route path="*" element={<div />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
});

export default App;
