import BalanceTwoToneIcon from "@mui/icons-material/BalanceTwoTone";
import FlakyTwoToneIcon from "@mui/icons-material/FlakyTwoTone";
import SpeakerNotesTwoToneIcon from "@mui/icons-material/SpeakerNotesTwoTone";
import { TableCell, TableHead, TableRow } from "@mui/material";

const CustomTabelHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        <TableCell>
          <BalanceTwoToneIcon color="primary" />
        </TableCell>
        <TableCell>
          <FlakyTwoToneIcon color="primary" />
        </TableCell>
        <TableCell>
          <SpeakerNotesTwoToneIcon color="primary" />
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default CustomTabelHead;
