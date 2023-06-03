import React from "react";
import Box from "@mui/material/Box";
import MuiBoxList from "./Component/MuiBoxList";
import { Typography } from "@mui/material";

interface MuiBoxContainerProps {
  title: string;
  list: { key: string; value: string }[];
}

const splitList = (data: { key: string; value: string }[]) => {
  const halfLength = Math.ceil(data.length / 2);
  const firstHalf = data.slice(0, halfLength);
  const secondHalf = data.slice(halfLength);

  if (data.length % 2 !== 0) {
    secondHalf.push({ key: ":", value: ")" }); // Add an empty item to balance columns
  }

  return [firstHalf, secondHalf];
};

const TableWrapper: React.FC<MuiBoxContainerProps> = ({ title, list }) => {
  const [list1, list2] = splitList(list);

  return (
    <Box
      sx={{
        border: "1px solid #00B3E6",
        borderRadius: "50px", // Set a larger value to make the border more circular
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
          sx={{
            fontSize: "60px",
            color: "#00B3E6",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <MuiBoxList items={list1} />
        <MuiBoxList items={list2} />
      </Box>
    </Box>
  );
};

export default TableWrapper;
