import { createTheme } from "@mui/material/styles";
import { observer } from "mobx-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import MetricsType from "./Entity/MetricsType";
import RatioType from "./Entity/RatioType";
import InputSymbolPage from "./Pages/InputSymbolPage/InputSymbolPage";
import TabelWrapperPage from "./Pages/TabelWrapperPage/TabelWrapperPage";
import ChartSliderWrapper from "./components/ChartSlider/ChartSliderWrapper";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const queryClient = new QueryClient();
const symbol = "META";

const Layot = <Outlet />;

const App = observer(() => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={Layot}>
            <Route path="input" element={<InputSymbolPage />} />
            <Route path="chart" element={<ChartSliderWrapper symbol={symbol} ratioType={RatioType.PE} />} />
            <Route
              path="over-view/:symbol"
              element={<TabelWrapperPage symbol={symbol} metricsType={MetricsType.General} />}
            />
            <Route
              path="valuation"
              element={<TabelWrapperPage symbol={symbol} metricsType={MetricsType.Valuation} />}
            />
            <Route
              path="financial-health"
              element={<TabelWrapperPage symbol={symbol} metricsType={MetricsType.FinancialHealth} />}
            />
            <Route path="cash-flow" element={<TabelWrapperPage symbol={symbol} metricsType={MetricsType.CashFlow} />} />
            <Route path="*" element={<div />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
});

export default App;
