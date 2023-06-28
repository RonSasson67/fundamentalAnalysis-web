import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { observer } from "mobx-react";
import MetricsType from "./Entity/MetricsType";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { useState } from "react";
import TableWrapper from "./components/TabelWrapper/TabelWrapper";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import TabelWrapperPage from "./Pages/TabelWrapperPage/TabelWrapperPage";
import ChartSliderWrapper from "./components/ChartSlider/ChartSliderWrapper";
import RatioType from "./Entity/RatioType";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const queryClient = new QueryClient();
const symbol = "META";

const App = observer(() => {
  const [stage, setStage] = useState(0);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <div className="App">
                  <Outlet />
                </div>
              }
            >
              <Route
                path="chart"
                element={<ChartSliderWrapper symbol={symbol} ratioType={RatioType.PE} />}
              />
              <Route
                path="over-view"
                element={<TabelWrapperPage symbol={symbol} metricsType={MetricsType.General} />}
              />
              <Route
                path="valuation"
                element={<TabelWrapperPage symbol={symbol} metricsType={MetricsType.Valuation} />}
              />
              <Route
                path="financial-health"
                element={
                  <TabelWrapperPage symbol={symbol} metricsType={MetricsType.FinancialHealth} />
                }
              />
              <Route
                path="cash-flow"
                element={<TabelWrapperPage symbol={symbol} metricsType={MetricsType.CashFlow} />}
              />
              <Route path="*" element={<div />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <div className="App">
          <button onClick={() => setStage((prevStage) => prevStage + 1)}>change circle</button>
          <div className="circle" style={{ filter: `blur(${((stage * 50) % 600) + 30}px)` }} />
          <div className="content">
            <TableWrapper symbol="META" metricsType={MetricsType.General} />
          </div>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
});

export default App;
