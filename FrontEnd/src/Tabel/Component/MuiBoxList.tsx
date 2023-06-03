import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

interface BoxListProps {
  items: { key: string; value: string }[];
}

const entryBoxStyle = {
  border: "0.1px solid #00B3E6",
  borderRadius: "1px", // Set a larger value to make the border more circular
  padding: "10px",
  height: "80px", // Set a fixed height for the box
  width: "12.5vw", // Set the width relative to the viewport width
  display: "flex",
  alignItems: "center",
};

const MuiBoxList: React.FC<BoxListProps> = ({ items }) => (
  <Box sx={{ width: "50%" }}>
    {items.map((entry) => (
      <Box key={entry.key} sx={entryBoxStyle}>
        <Box sx={{ width: "50%" }}>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ marginRight: "10px" }}
          >
            {entry.key}
          </Typography>
        </Box>
        <Box sx={{ width: "50%", alignItems: "left" }}>
          {" "}
          <Typography variant="body1" component="div">
            {entry.value}
          </Typography>
        </Box>
      </Box>
    ))}
  </Box>
);

export default MuiBoxList;
