import { Grid } from "@mui/material";
import { useEffect } from "react";
import { observer } from "mobx-react";
import LineChartIndex from "./Component/LineChartIndex";
import IndexSlider from "./Component/IndexSlider";
import ChartIndexStore from "../Store/ChartIndexStore";
import RatioType from "../Entity/RatioType";
import { GetRatioData } from "../api/RatioApi";

// props for ChartSliderWrapper
type ChartSliderWrapperProps = {
  symbol: string;
  ratioType: RatioType;
};

const ChartSliderWrapper = observer(
  ({ symbol, ratioType }: ChartSliderWrapperProps) => {
    // initialize the data for the charts with ChartIndexSotre and GenerateDataForCharts
    const chartIndexStore = new ChartIndexStore();
    chartIndexStore.setData(GetRatioData(ratioType, symbol) as any[]);
    chartIndexStore.setMaxIndex(chartIndexStore.getData.length - 1);

    useEffect(() => {
      chartIndexStore.setMinIndex(0);
      chartIndexStore.setMaxIndex(chartIndexStore.getData.length - 1);
    }, []);

    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <h1>{ratioType}</h1>
          <LineChartIndex chartIndexStore={chartIndexStore} />
          <IndexSlider chartIndexStore={chartIndexStore} />
        </Grid>
      </Grid>
    );
  }
);

export default ChartSliderWrapper;
