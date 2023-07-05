import { ThemeProvider, createTheme } from "@mui/material/styles";
import { observer } from "mobx-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import MetricsType from "./Entity/MetricsType";
import RatioType from "./Entity/RatioType";
import InputSymbolPage from "./Pages/InputSymbolPage/InputSymbolPage";
import ChartSliderWrapper from "./components/ChartSlider/ChartSliderWrapper";
import FormikWizardWrapper from "./components/WizzardForm/FormikWizardWrapper";
import { CssBaseline } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const queryClient = new QueryClient();
const symbol = "META";

const Layot = () => {
  return <Outlet />;
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
              <Route path="form" element={<FormikWizardWrapper />} />
              <Route path="*" element={<div />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
});

export default App;
