import { TooltipProps } from "recharts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

function CustomTooltip({
  payload,
  label,
  active,
}: TooltipProps<ValueType, NameType>) {
  var boxSx = {
    bgcolor: "background.paper",
    m: 1,
    border: 1,
    style: { width: "5rem", height: "5rem" },
  };
  if (active) {
    return (
      <Box sx={boxSx}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {label}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {payload?.[0].value}
        </Typography>
      </Box>
    );
  }
  return null;
}
export default CustomTooltip;
