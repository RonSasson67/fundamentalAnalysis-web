import BalanceTwoToneIcon from "@mui/icons-material/BalanceTwoTone";
import CheckBoxOutlineBlankTwoToneIcon from "@mui/icons-material/CheckBoxOutlineBlankTwoTone";
import CheckBoxTwoToneIcon from "@mui/icons-material/CheckBoxTwoTone";
import FlakyTwoToneIcon from "@mui/icons-material/FlakyTwoTone";
import SpeakerNotesTwoToneIcon from "@mui/icons-material/SpeakerNotesTwoTone";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { observer } from "mobx-react";
import { FinancialData } from "../../Entity/FinancialData.interface.ts.ts";
import MetricsType from "../../Entity/MetricsType.tsx";
import CheckBoxStore from "../../Store/CheckBoxStore.tsx";
import TextInputStore from "../../Store/TextInputStore.tsx";
import { useGetMetricData } from "../../api/MetricsApi.tsx";
import "./TabelWrapper.css";

interface TableWrapperProps {
  symbol: string;
  metricsType: MetricsType;
}
const checkBoxStore = new CheckBoxStore(true);
const textInputStore = new TextInputStore();

const TableWrapper = observer(({ symbol, metricsType }: TableWrapperProps) => {
  const { data, isLoading, error } = useGetMetricData(symbol, metricsType);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    // cool error page with animation
    return <div>Something went wrong: {(error as any).message}</div>;
  }

  return (
    <div className="tabel-wrapper">
      <div className="title">
        <h1 className="tabel-title">
          {metricsType} - {symbol}
        </h1>
      </div>
      <div className="tabel">
        <TableContainer className="scroll-bar" component={Paper}>
          <Table stickyHeader aria-label="simple table">
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
            <TableBody>
              {(data as FinancialData[]).map((entry) => (
                <TableRow key={entry.title} sx={{ "&:last-child td, &:last0-child th": { border: 0 } }}>
                  <TableCell>{entry.title}</TableCell>
                  <TableCell>{entry.value}</TableCell>
                  <TableCell>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankTwoToneIcon color="error" />}
                      checkedIcon={<CheckBoxTwoToneIcon color="success" />}
                      checked={checkBoxStore.isChecked(entry.title)}
                      onChange={() => checkBoxStore.toggle(entry.title)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      label="Note"
                      variant="standard"
                      id="standard-basic"
                      onChange={(e) => textInputStore.updateInput(entry.title, e.target.value)}
                      multiline
                      value={textInputStore.inputsTexts.get(entry.title)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
});

export default TableWrapper;
