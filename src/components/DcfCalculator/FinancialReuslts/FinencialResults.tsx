import { InputAdornment, TextField, TextFieldProps, Typography } from "@mui/material";
import "../DcfCalculator.css";

export interface FinencialResultsProps {
  markectCap: number;
  estimateMarkectCap: number;
}
const FinencialResults = ({ markectCap, estimateMarkectCap }: FinencialResultsProps) => {
  const seaftyMargin = (estimateMarkectCap - markectCap) / markectCap;
  return (
    <div>
      <Typography variant="h6">Financial Results</Typography>
      <div className="dcf_results">
        <TextFieldWrapper label="Markect Cap" value={markectCap} inputAdornment="$" />
        <TextFieldWrapper
          label="Seafty Margin"
          value={seaftyMargin}
          inputAdornment="%"
          color={seaftyMargin <= 0 ? "error" : seaftyMargin >= 20 ? "success" : "warning"}
        />
        <TextFieldWrapper label="Estimate Markect Cap" value={estimateMarkectCap} inputAdornment="$" />
      </div>
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
    />
  );
};

export default FinencialResults;
