import Box from "@mui/material/Box";
import CheckBoxStore from "../../Store/CheckBoxStore";
import { observer } from "mobx-react";
import BoxContent from "./BoxContent";
import ScrollBar from "../../Utils/Style/ScrollBar";
import TextInputStore from "../../Store/TextInputStore";

interface BoxListProps {
  items: { key: string; value: string }[];
  checkBoxStore: CheckBoxStore;
  textInputStore: TextInputStore;
}

const MuiBoxList = observer(
  ({ items, checkBoxStore, textInputStore }: BoxListProps) => {
    return (
      <Box
        height="100%"
        paddingLeft={"20px"}
        paddingRight={"20px"}
        paddingBottom={2}
        className={ScrollBar().scrollBox}
      >
        {items.map((entry) => (
          <Box width="100%" marginBottom="10px" key={entry.key}>
            <BoxContent
              title={entry.key}
              value={entry.value}
              checkBoxStore={checkBoxStore}
              textInputStore={textInputStore}
            />
          </Box>
        ))}
      </Box>
    );
  }
);

export default MuiBoxList;
