import { Autocomplete, Paper, TextField } from "@mui/material";
import { TextFieldFormatNumber, TextFieldFormatNumberNoChange } from "../../Common/CustomTextField/TextFieldNumber";

interface DcfInputsProps {
  stockPrice: number;
  markectCap: number;
  numberOfYearsToProject: number;
  numberOfYearsToProjectOnChange: (event: any, value: string | null) => void;
  priceToErnings: number;
  priceTofcf: number;
  discountRate: number;
  discountRateOnChange: (event: { target: { name: string; value: string } }) => void;
  growthRate: number;
  growthRateOnChange: (event: { target: { name: string; value: string } }) => void;
  terminalGrowthRate: number;
  terminalGrowthRateOnChange: (event: { target: { name: string; value: string } }) => void;
}
const DcfInputs = ({
  stockPrice,
  markectCap,
  numberOfYearsToProject,
  numberOfYearsToProjectOnChange,
  priceToErnings,
  priceTofcf,
  discountRate,
  discountRateOnChange,
  growthRate,
  growthRateOnChange,
  terminalGrowthRate,
  terminalGrowthRateOnChange,
}: DcfInputsProps) => {
  return (
    <Paper className="inputs" elevation={3} style={{ padding: "16px" }}>
      <TextFieldFormatNumberNoChange label="Stock Price" value={stockPrice} startAdornment="$"></TextFieldFormatNumberNoChange>
      <TextFieldFormatNumberNoChange label="Market Cap" value={markectCap} startAdornment="$"></TextFieldFormatNumberNoChange>
      <Autocomplete
        sx={{}}
        value={numberOfYearsToProject.toLocaleString()}
        options={["3", "5", "10"]}
        renderInput={(params) => <TextField {...params} label="Number Of Years To Project" />}
        renderOption={(props, option) => (
          <span {...props} style={{ backgroundColor: "#062826" }}>
            {option}
          </span>
        )}
        onChange={numberOfYearsToProjectOnChange}
      />
      <TextFieldFormatNumberNoChange label="Price to Earnings Ratio" value={priceToErnings}></TextFieldFormatNumberNoChange>
      <TextFieldFormatNumberNoChange label="Price to Free Cash Flow Ratio" value={priceTofcf}></TextFieldFormatNumberNoChange>
      <TextFieldFormatNumber
        onChange={discountRateOnChange}
        label="Discount Rate"
        value={discountRate}
        startAdornment="%"
      ></TextFieldFormatNumber>
      <TextFieldFormatNumber
        onChange={growthRateOnChange}
        label="Growth Rate"
        value={growthRate}
        startAdornment="%"
      ></TextFieldFormatNumber>
      <TextFieldFormatNumber
        onChange={terminalGrowthRateOnChange}
        label="Terminal Growth Rate"
        value={terminalGrowthRate}
        startAdornment="%"
      ></TextFieldFormatNumber>
    </Paper>
  );
};

export default DcfInputs;
