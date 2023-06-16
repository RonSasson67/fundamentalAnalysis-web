import { observer } from "mobx-react-lite";
import { Checkbox, Typography, Box } from "@mui/material";
import CheckBoxStore from "../../Store/CheckBoxStore";
import TextField from "@mui/material/TextField";
import GlowingText from "../../Utils/Style/GlowingText";
import TextInputStore from "../../Store/TextInputStore";
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
      <Box
        flexDirection="row"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        paddingRight="10px"
        paddingLeft="10px"
        height="75px"
        border="2px solid #00B3E6"
        borderRadius="15px"
      >
        <Typography width="25%" className={GlowingText().glowingText}>
          {title}
        </Typography>
        <Typography width="25%" fontSize="16px">
          {value}
        </Typography>
        <Checkbox
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
      </Box>
    );
  }
);

export default BoxContent;
