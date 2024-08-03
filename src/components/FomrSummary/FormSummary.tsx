import CheckBoxOutlineBlankTwoToneIcon from "@mui/icons-material/CheckBoxOutlineBlankTwoTone";
import CheckBoxTwoToneIcon from "@mui/icons-material/CheckBoxTwoTone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Checkbox,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import TabelHeadCoustom from "../Common/CustomTableHead/CustomTabelHead";
import "./FormSummary.css";
import SecurityIcon from "@mui/icons-material/Security";
import { useLocation } from "react-router-dom";
import { useState } from "react";

interface Metric {
  checkbox: boolean;
  note: string;
  value: string;
}
interface SummaryFinanceData {
  symbol: string;
  metrics: {
    [category: string]: {
      [metric: string]: Metric;
    };
  };
  multiple_valuation: {
    value: {
      eps: number;
      groth_rate: number;
      pe: number;
      number_of_years_to_project: number;
      wanted_yield_rreturn: number;
      current_price: number;
    };
    result: {
      sefety_margin: string;
      expected_price: string;
    };
  };
}

const FormSummary = () => {
  const { state } = useLocation();
  const [data, setData] = useState<SummaryFinanceData | undefined>(undefined);

  useState(() => {
    if (state) {
      setData(state);
    }
  });

  if (!data) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="finance-container">
      <div className="title">
        <Typography variant="h4" component="div">
          {data.symbol} Finance Data
        </Typography>
      </div>
      <div className="catagory_list scroll-bar">
        {Object.keys(data.metrics).map((category) => (
          <div key={category} className="category-container">
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div className="accordion-summary">
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <h3>{category}</h3>
                    </Grid>
                    <Grid item xs={6} sx={{ display: "flex", gap: "20px" }}>
                      <Typography>{Object.keys(data.metrics[category]).length}</Typography>
                      <Typography>/</Typography>
                      <Typography>
                        {data.metrics[category]
                          ? Object.keys(data.metrics[category]).filter((metric) => data.metrics[category][metric].checkbox)
                              .length
                          : 0}
                      </Typography>
                      <CheckBoxTwoToneIcon color="success" />
                    </Grid>
                  </Grid>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer className="tabel-container scroll-bar" component={Paper}>
                  <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
                    <TabelHeadCoustom />
                    <TableBody>
                      {Object.keys(data.metrics[category]).map((metric) => (
                        <TableRow key={metric}>
                          <TableCell>{metric}</TableCell>
                          <TableCell>{data.metrics[category][metric].value}</TableCell>
                          <TableCell>
                            <Checkbox
                              icon={<CheckBoxOutlineBlankTwoToneIcon color="error" />}
                              checkedIcon={<CheckBoxTwoToneIcon color="success" />}
                              disabled
                              checked={data.metrics[category][metric].checkbox}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              label="Note"
                              variant="standard"
                              id="standard-basic"
                              multiline
                              disabled
                              defaultValue={data.metrics[category][metric].note}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
        <div className="valuation-container">
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div className="accordion-summary">
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <h3>Multiple Valuation</h3>
                  </Grid>
                  <Grid item xs={6} sx={{ display: "flex", gap: "20px", alignItems: "center", justifyContent: "start" }}>
                    <Typography>{data.multiple_valuation.result.sefety_margin}%</Typography>
                    {
                      <SecurityIcon
                        color={
                          parseFloat(data.multiple_valuation.result.sefety_margin) <= 0
                            ? "error"
                            : parseFloat(data.multiple_valuation.result.sefety_margin) >= 20
                            ? "success"
                            : "warning"
                        }
                      />
                    }
                  </Grid>
                </Grid>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Card className="json-card">
                <CardContent>
                  <div className="json-data">
                    <Typography>EPS: {data.multiple_valuation.value.eps}</Typography>
                    <Typography>Growth Rate: {data.multiple_valuation.value.groth_rate}</Typography>
                    <Typography>PE Ratio: {data.multiple_valuation.value.pe}</Typography>
                    <Typography>Years to Project: {data.multiple_valuation.value.number_of_years_to_project}</Typography>
                    <Typography>Yield Return: {data.multiple_valuation.value.wanted_yield_rreturn}</Typography>
                    <Typography>Current Price: {data.multiple_valuation.value.current_price}</Typography>
                  </div>
                  <div className="json-result">
                    <Typography>Safety Margin: {data.multiple_valuation.result.sefety_margin}</Typography>
                    <Typography>Expected Price: {data.multiple_valuation.result.expected_price}</Typography>
                  </div>
                </CardContent>
              </Card>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FormSummary;
