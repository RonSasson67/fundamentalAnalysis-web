import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Grid, Typography } from "@mui/material";
import { observer } from "mobx-react";
import ChartSliderWrapper from "../ChartSlider/ChartSliderWrapper";
import RatioType from "../Entity/RatioType";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const BasicRatioAvrageFrom = observer(() => {
  if (true) {
    // create app that have a title in midle app of the page, and two charts with sliders in the middle of the page near the edges
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Grid xs={12}>
            <Typography variant="h3" align="center" sx={{ marginTop: "10rem" }}>
              AAPL
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={4} marginTop="5rem">
          <Grid xs={6} marginTop="0rem">
            <ChartSliderWrapper symbol="AAPL" ratioType={RatioType.PE} />
          </Grid>
          <Grid xs={6} marginTop="0rem">
            <ChartSliderWrapper
              symbol="AAPL"
              ratioType={RatioType.PToCashFlow}
            />
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
});

export default BasicRatioAvrageFrom;
