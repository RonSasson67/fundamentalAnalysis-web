import { TooltipProps } from "recharts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import lodash from "lodash";

function CustomToolTipTimeStamp({ payload, label, active }: TooltipProps<ValueType, NameType>) {
  if (active) {
    // return every item in the payload as a box with the keydata and value and the label in stroke color
    return (
      <Box
        sx={{
          backgroundColor: "background.default",
          p: 1,
          borderRadius: 1,
          border: "1px solid #ddd",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {new Date(label * 1000).toISOString().slice(0, 10)}
        </Typography>
        {payload?.map((item, index) => (
          <Typography key={index} variant="body2" color={item.color} sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: item.color,
                mr: 1,
              }}
            />
            {lodash.startCase(item.name as string)}: {item.value?.toLocaleString()}
          </Typography>
        ))}
      </Box>
    );
  }
  return null;
}
export default CustomToolTipTimeStamp;
