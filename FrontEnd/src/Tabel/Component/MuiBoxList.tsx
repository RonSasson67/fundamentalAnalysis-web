import Box from "@mui/material/Box";
import CheckBoxStore from "../../Store/CheckBoxStore";
import { observer } from "mobx-react";
import BoxContent from "./BoxContent";
import ScrollBar from "../../Utils/Style/ScrollBar";
import TextInputStore from "../../Store/TextInputStore";
import { FinancialData } from "../../Entity/FinancialData.interface.ts";

interface BoxListProps {
  financialData: FinancialData[];
  checkBoxStore: CheckBoxStore;
  textInputStore: TextInputStore;
}

const MuiBoxList = observer(
  ({ financialData, checkBoxStore, textInputStore }: BoxListProps) => {
    return (
      <Box
        height="90%"
        paddingLeft={"20px"}
        paddingRight={"20px"}
        paddingBottom={2}
        className={ScrollBar().scrollBox}
      >
        {financialData.map((entry) => (
          <Box width="100%" marginBottom="10px" key={entry.title}>
            <BoxContent
              title={entry.title}
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
