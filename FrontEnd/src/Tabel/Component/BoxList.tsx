import CheckBoxStore from "../../Store/CheckBoxStore.tsx";
import { observer } from "mobx-react";
import BoxContent from "./BoxContent.tsx";
import ScrollBar from "../../Utils/Style/ScrollBar.tsx";
import TextInputStore from "../../Store/TextInputStore.tsx";
import { FinancialData } from "../../Entity/FinancialData.interface.ts.ts";
import "../TabelWrapper.css";

interface BoxListProps {
  financialData: FinancialData[];
  checkBoxStore: CheckBoxStore;
  textInputStore: TextInputStore;
}

const BoxList = observer(
  ({ financialData, checkBoxStore, textInputStore }: BoxListProps) => {
    return (
      <div className={ScrollBar().scrollBox + " " + "list-container"}>
        {financialData.map((entry) => (
          <BoxContent
            title={entry.title}
            value={entry.value}
            checkBoxStore={checkBoxStore}
            textInputStore={textInputStore}
          />
        ))}
      </div>
    );
  }
);

export default BoxList;
