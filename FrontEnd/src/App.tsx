import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Grid } from "@mui/material";
import ChartIndexStore from "./Store/ChartIndexStore";
import { useEffect } from "react";
import { GenerateDataForCharts } from "./Utils/MockGenereator";
import { observer } from "mobx-react";
import ChartSliderWrapper from "./ChartSlider/ChartSliderWrapper";
import RatioType from "./Entity/RatioType";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = observer(() => {
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
          <ChartSliderWrapper symbol="AAPL" ratioType={RatioType.PE} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
});

export default App;
