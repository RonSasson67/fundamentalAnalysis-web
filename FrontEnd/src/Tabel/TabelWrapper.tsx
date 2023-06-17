import Box from "@mui/material/Box";
import MuiBoxList from "./Component/MuiBoxList";
import { Typography } from "@mui/material";
import CheckBoxStore from "../Store/CheckBoxStore";
import MetricsType from "../Entity/MetricsType";
import GetMetricData from "../api/MetricsApi";
import TextInputStore from "../Store/TextInputStore";

interface TableWrapperProps {
  symbol: string;
  metricsType: MetricsType;
}

function TableWrapper({ symbol, metricsType }: TableWrapperProps) {
  const list = GetMetricData(metricsType, symbol);
  const checkBoxStore = new CheckBoxStore();
  const textInputStore = new TextInputStore();

  return (
    <Box
      sx={{
        border: "1px solid #00B3E6",
        borderRadius: "50px", // Set a larger value to make the border more circular
        width: "550px",
        height: "800px",
        padding: "10px",
        overflow: "hidden",
      }}
    >
      <Box
        display={"flex"}
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          fontSize="60px"
          color="#00B3E6"
        >
          {metricsType}
        </Typography>
      </Box>
      <Box height="90%">
        <MuiBoxList
          items={list}
          checkBoxStore={checkBoxStore}
          textInputStore={textInputStore}
        />
      </Box>
    </Box>
  );
}

export default TableWrapper;
