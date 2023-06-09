import React from "react";
import Box from "@mui/material/Box";
import { Checkbox, Typography } from "@mui/material";
import CheckBoxStore from "../../Store/CheckBoxStore";
import { observer } from "mobx-react";
import BoxContent from "./BoxContent";

interface BoxListProps {
  items: { key: string; value: string }[];
  checkBoxStore: CheckBoxStore;
}

const entryBoxStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
};

const MuiBoxList = observer(({ items, checkBoxStore }: BoxListProps) => {
  return (
    <Box>
      {items.map((entry) => (
        <Box
          width="240px"
          marginBottom="10px"
          key={entry.key}
          sx={entryBoxStyle}
        >
          <BoxContent
            title={entry.key}
            value={entry.value}
            checkBoxStore={checkBoxStore}
          />
        </Box>
      ))}
    </Box>
  );
});

export default MuiBoxList;
