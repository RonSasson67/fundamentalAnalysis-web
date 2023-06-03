import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Grid } from "@mui/material";
import { observer } from "mobx-react";
import TableWrapper from "./Tabel/TabelWrapper";
import { GenerateDataForTabel } from "./Utils/MockGenereator";

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
          <TableWrapper
            title="Metrics for AAPL"
            list={GenerateDataForTabel() as any[]}
          ></TableWrapper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
});

export default App;
