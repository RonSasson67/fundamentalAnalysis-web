import { observer } from "mobx-react-lite";
import { Checkbox, Typography, Box } from "@mui/material";
import CheckBoxStore from "../../Store/CheckBoxStore";
import GlowingText from "../../Utils/Style/GlowingText";

type BoxContentProps = {
  title: string;
  value: string;
  checkBoxStore: CheckBoxStore;
};

export const BoxContent = observer(
  ({ title, value, checkBoxStore }: BoxContentProps) => {
    return (
      <Box
        flexDirection="row"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        paddingRight="10px"
        paddingLeft="10px"
        height="50px"
        border="2px solid #00B3E6"
        borderRadius="10px"
      >
        <Typography className={GlowingText().glowingText}>{title}</Typography>
        <Typography fontSize="16px">{value}</Typography>
        <Checkbox
          checked={checkBoxStore.isChecked(title)}
          onChange={() => checkBoxStore.toggle(title)}
        />
      </Box>
    );
  }
);

export default BoxContent;
