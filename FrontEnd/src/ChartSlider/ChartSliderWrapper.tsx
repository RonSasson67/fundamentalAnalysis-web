import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { observer } from "mobx-react";
import { GenerateDataForCharts } from "../Utils/MockGenereator";
import CharLineExample from "./Component/ChartLineExample";
import IndexSlider from "./Component/IndexSlider";
import ChartIndexStore from "../Store/ChartIndexStore";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const ChartSliderWrapper = observer(() => {
  // initialize the data for the charts with ChartIndexSotre and GenerateDataForCharts
  const chartIndexStore = new ChartIndexStore();
  chartIndexStore.setData(GenerateDataForCharts());
  chartIndexStore.setMaxIndex(chartIndexStore.getData.length - 1);

  useEffect(() => {
    chartIndexStore.setMinIndex(0);
    chartIndexStore.setMaxIndex(chartIndexStore.getData.length - 1);
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <h1>PE</h1>
          <CharLineExample chartIndexStore={chartIndexStore} />
          <IndexSlider chartIndexStore={chartIndexStore} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
});

export default ChartSliderWrapper;
