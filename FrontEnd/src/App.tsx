import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Grid } from "@mui/material";
import CharLineExample, { GenerateData } from "./examples/ChartLineExample";
import SliderExample from "./examples/SliderExample";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  var data = GenerateData();

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
          <CharLineExample data={data} />
          <SliderExample data={data} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
