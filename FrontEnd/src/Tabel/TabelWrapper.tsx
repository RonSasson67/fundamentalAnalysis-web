import Box from "@mui/material/Box";
import MuiBoxList from "./Component/MuiBoxList";
import { Typography } from "@mui/material";
import CheckBoxStore from "../Store/CheckBoxStore";
import MetricsType from "../Entity/MetricsType";
import GetMetricData from "../api/MetricsApi";

interface TableWrapperProps {
  symbol: string;
  metricsType: MetricsType;
}

const splitList = (data: { key: string; value: string }[]) => {
  const halfLength = Math.ceil(data.length / 2);
  const firstHalf = data.slice(0, halfLength);
  const secondHalf = data.slice(halfLength);

  if (data.length % 2 !== 0) {
    // secondHalf.push({ key: "", value: ")" }); // Add an empty item to balance columns
  }

  return [firstHalf, secondHalf];
};

function TableWrapper({ symbol, metricsType }: TableWrapperProps) {
  const [list1, list2] = splitList(GetMetricData(metricsType, symbol));
  const checkBoxStore = new CheckBoxStore();

  return (
    <Box
      sx={{
        border: "1px solid #00B3E6",
        borderRadius: "50px", // Set a larger value to make the border more circular
        width: "550px",
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
      <Box
        display="flex"
        justifyContent="space-between"
        paddingLeft={"20px"}
        paddingRight={"20px"}
        paddingBottom={2}
      >
        <MuiBoxList items={list1} checkBoxStore={checkBoxStore} />
        <MuiBoxList items={list2} checkBoxStore={checkBoxStore} />
      </Box>
    </Box>
  );
}

export default TableWrapper;
