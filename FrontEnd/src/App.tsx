import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { observer } from "mobx-react";
import TableWrapper from "./Tabel/TabelWrapper";
import MetricsType from "./Entity/MetricsType";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const queryClient = new QueryClient();

const App = observer(() => {
  const [stage, setStage] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <div className="App">
          <button onClick={() => setStage((prevStage) => prevStage + 1)}>
            change circle
          </button>
          <div
            className="circle"
            style={{ filter: `blur(${((stage * 50) % 600) + 30}px)` }}
          />
          <div className="content">
            <TableWrapper symbol="META" metricsType={MetricsType.General} />
          </div>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
});

export default App;
