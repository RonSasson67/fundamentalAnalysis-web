import { Box } from "@mui/material";
import "../MultipleValuation.css";

type RowGridsProps = {
  values: string[] | number[];
};

const RowGrids = ({ values }: RowGridsProps) => {
  return (
    <div className="row-grids">
      {values.map((value) => (
        <Box
          sx={{
            width: 600 / values.length,
            height: 30,
            border: `1px solid #E5E5E5`,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {value}
        </Box>
      ))}
    </div>
  );
};

export default RowGrids;
