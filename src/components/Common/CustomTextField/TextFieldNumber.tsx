import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

interface TextFieldNumberProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  label: string;
  value: number;
  startAdornment?: string;
  readOnly?: boolean;
}

export const TextFieldFormatNumber = (props: TextFieldNumberProps) => {
  const startAdornment =
    props.startAdornment !== undefined
      ? { startAdornment: <InputAdornment position="start">{props.startAdornment}</InputAdornment> }
      : null;

  return (
    <TextField
      id="outlined-basic"
      type="number"
      label={props.label}
      variant="outlined"
      value={typeof props.value === "number" ? props.value.toLocaleString() : "Server error"}
      InputProps={{
        ...startAdornment,
      }}
      onChange={props.onChange}
    />
  );
};

interface TextFieldNumberNoChangeProps {
  label: string;
  value: number;
  startAdornment?: string;
}

export const TextFieldFormatNumberNoChange = (props: TextFieldNumberNoChangeProps) => {
  const startAdornment =
    props.startAdornment !== undefined
      ? { startAdornment: <InputAdornment position="start">{props.startAdornment}</InputAdornment> }
      : null;

  return (
    <TextField
      id="outlined-basic"
      label={props.label}
      variant="outlined"
      value={props.value.toLocaleString()}
      InputProps={{
        ...startAdornment,
      }}
    />
  );
};
