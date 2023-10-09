import { InputAdornment, TextField, TextFieldProps, Typography } from "@mui/material";
import "../../DcfCalculator.css";

export interface StockResultsResultsProps {
  stockPrice: number;
  fairPrice: number;
}
const StockResults = ({ stockPrice, fairPrice }: StockResultsResultsProps) => {
  const seaftyMargin = ((fairPrice - stockPrice) / fairPrice) * 100;
  return (
    <div className="dcf_results">
      <Typography variant="h6">Stock Results</Typography>
      <TextFieldWrapper label="Stock Price" value={stockPrice} inputAdornment="$" />
      <TextFieldWrapper
        label="Seafty Margin"
        value={seaftyMargin}
        inputAdornment="%"
        color={seaftyMargin <= 0 ? "error" : seaftyMargin >= 20 ? "success" : "warning"}
      />
      <TextFieldWrapper label="Fair Price" value={fairPrice} inputAdornment="$" />
    </div>
  );
};

const TextFieldWrapper = ({
  label,
  value,
  inputAdornment,
  color,
}: {
  label: string;
  value: number;
  inputAdornment: string;
  color?: TextFieldProps["color"];
}) => {
  return (
    <TextField
      id="outlined-basic"
      label={label}
      variant="outlined"
      value={value.toLocaleString()}
      InputProps={{
        startAdornment: <InputAdornment position="start">{inputAdornment}</InputAdornment>,
      }}
      color={color}
      focused
      sx={{
        "& .MuiInputBase-input": {
          textAlign: "center",
        },
      }}
    />
  );
};

export default StockResults;
