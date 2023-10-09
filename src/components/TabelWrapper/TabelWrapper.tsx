import CheckBoxOutlineBlankTwoToneIcon from "@mui/icons-material/CheckBoxOutlineBlankTwoTone";
import CheckBoxTwoToneIcon from "@mui/icons-material/CheckBoxTwoTone";
import { Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FinancialData } from "../../Entity/FinancialData.interface.ts.ts";
import MetricsType from "../../Entity/MetricsType.tsx";
import { useGetMetricData } from "../../api/MetricsApi.tsx";
import { METRICS_CHECKBOX, METRICS_NOTE, METRICS_PREFIX, NUMBER_OF_COLUMS, VALUE } from "../../constants.ts";
import "./TabelWrapper.css";
import TabelHeadCoustom from "../Common/CustomTableHead/CustomTabelHead.tsx";
import "../../Utils/Utils.css";

interface TableWrapperProps {
  metricsType: MetricsType;
}

const TableWrapper = observer(({ metricsType }: TableWrapperProps) => {
  const { control, getValues, setValue } = useFormContext();
  const [symbol, _] = useState(getValues().symbol);
  const [isDataSet, setIsDataSet] = useState(false);
  const { data, isLoading, error } = useGetMetricData(symbol, metricsType);

  useEffect(() => {
    if (!isLoading && !isDataSet) {
      data?.forEach((entry) => {
        setValue(`${METRICS_PREFIX}.${metricsType}.${entry.title}.${VALUE}`, entry.value);
      });
      setIsDataSet(true);
    }
  }, [isLoading]);

  if (error) {
    // cool error page with animation
    return <div>Something went wrong: {(error as any).message}</div>;
  }

  return (
    <div className="tabel-wrapper">
      <div className="title">
        <Typography variant="h3" component="div">
          {metricsType} - {symbol}
        </Typography>
      </div>
      <TableContainer className="tabel scroll-bar" component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TabelHeadCoustom />
          <TableBody>
            {isLoading
              ? [...Array(10)].map((_, index) => (
                  <TableRow key={index}>
                    {[...Array(NUMBER_OF_COLUMS)].map((_) => (
                      <TableCell component="th" scope="row">
                        <Skeleton animation="wave" variant="text" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : (data as FinancialData[]).map((entry) => (
                  <TableRow key={entry.title} sx={{ "&:last-child td, &:last0-child th": { border: 0 } }}>
                    <TableCell>{entry.title}</TableCell>
                    <TableCell>{entry.value}</TableCell>
                    <TableCell>
                      <Controller
                        name={`${METRICS_PREFIX}.${metricsType}.${entry.title}.${METRICS_CHECKBOX}`}
                        control={control}
                        defaultValue={true}
                        render={({ field }) => (
                          <Checkbox
                            icon={<CheckBoxOutlineBlankTwoToneIcon color="error" />}
                            checkedIcon={<CheckBoxTwoToneIcon color="success" />}
                            checked={field.value}
                            {...field}
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        name={`${METRICS_PREFIX}.${metricsType}.${entry.title}.${METRICS_NOTE}`}
                        control={control}
                        defaultValue={""}
                        render={({ field }) => (
                          <TextField label="Note" variant="standard" id="standard-basic" multiline {...field} />
                        )}
                      />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});

export default TableWrapper;
