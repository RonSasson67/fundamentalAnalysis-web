import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Grid } from "@mui/material";
import { observer } from "mobx-react";
import TableWrapper from "./Tabel/TabelWrapper";
import MetricsType from "./Entity/MetricsType";
import { QueryClient, QueryClientProvider } from "react-query";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const queryClient = new QueryClient();

const App = observer(() => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="center"
          paddingTop={4}
        >
          <Grid xs={3}>
            <TableWrapper symbol="AAPL" metricsType={MetricsType.General} />
          </Grid>
        </Grid>
      </ThemeProvider>
    </QueryClientProvider>
  );
});

export default App;
