import { InputAdornment, TextField, TextFieldProps, Typography } from "@mui/material";
import "../../DcfCalculator.css";

export interface FinencialResultsProps {
  markectCap: number;
  fairMarkectCap: number;
}
const FinencialResults = ({ markectCap, fairMarkectCap }: FinencialResultsProps) => {
  const seaftyMargin = ((fairMarkectCap - markectCap) / fairMarkectCap) * 100;
  return (
    <div className="dcf_results">
      <Typography variant="h6">Financial Results</Typography>
      <TextFieldWrapper label="Markect Cap" value={markectCap} inputAdornment="$" />
      <TextFieldWrapper
        label="Seafty Margin"
        value={seaftyMargin}
        inputAdornment="%"
        color={seaftyMargin <= 0 ? "error" : seaftyMargin >= 20 ? "success" : "warning"}
      />
      <TextFieldWrapper label="Fair Markect Cap" value={fairMarkectCap} inputAdornment="$" />
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

export default FinencialResults;
