import { observer } from "mobx-react-lite";
import { Checkbox } from "@mui/material";
import CheckBoxStore from "../../Store/CheckBoxStore";
import TextField from "@mui/material/TextField";
import "../TabelWrapper.css";
import TextInputStore from "../../Store/TextInputStore";
import GppBadIcon from "@mui/icons-material/GppBad";
import GppGoodIcon from "@mui/icons-material/GppGood";
import { useEffect } from "react";

type BoxContentProps = {
  title: string;
  value: string;
  checkBoxStore: CheckBoxStore;
  textInputStore: TextInputStore;
};

export const BoxContent = observer(
  ({ title, value, checkBoxStore, textInputStore }: BoxContentProps) => {
    useEffect(() => {
      textInputStore.addInput(title);
    }, []);
    return (
      <div className="box-content">
        <p className="box-title box-text">{title}</p>
        <p className="box-text">{value}</p>
        <Checkbox
          icon={<GppBadIcon />}
          checkedIcon={<GppGoodIcon />}
          checked={checkBoxStore.isChecked(title)}
          onChange={() => checkBoxStore.toggle(title)}
        />
        <TextField
          label="Note"
          variant="standard"
          id="standard-basic"
          key={title}
          onChange={(e) => textInputStore.updateInput(title, e.target.value)}
        />
      </div>
    );
  }
);

export default BoxContent;
