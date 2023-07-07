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
      step: { component: () => <TabelWrapper symbol="META" metricsType={MetricsType.General} /> },
      stepName: "META - General",
    },
    {
      step: { component: () => <ChartSliderWrapper symbol="META" ratioType={RatioType.PE} /> },
      stepName: "META - PE",
    },
    {
      step: { component: () => <TabelWrapper symbol="AAPL" metricsType={MetricsType.General} /> },
      stepName: "AAPL - General",
    },
    {
      step: { component: () => <ChartSliderWrapper symbol="AAPL" ratioType={RatioType.PE} /> },
      stepName: "AAPL - PE",
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
              <Route path="*" element={<div />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
});

export default App;
