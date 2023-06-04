import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Grid } from "@mui/material";
import { observer } from "mobx-react";
import TableWrapper from "./Tabel/TabelWrapper";
import MetricsType from "./Entity/MetricsType";

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
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid xs={3}>
          <TableWrapper symbol="AAPL" metricsType={MetricsType.General} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
});

export default App;
