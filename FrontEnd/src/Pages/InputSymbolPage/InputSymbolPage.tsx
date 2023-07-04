import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { ResultSymbol, getSymbolSearch } from "../../api/getSymbolSearch";
import "./InputSymbolPage.css";

const urlToNavigate = "/over-view/";

export default function Asynchronous() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue] = useDebounce(inputValue, 500);
  const { data, isLoading, error } = getSymbolSearch(debouncedInputValue);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(isLoading || !data);
  }, [isLoading, data]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setInputValue(event.target.value);
  };

  const InoutText = (params: any) => (
    <TextField
      {...params}
      onChange={handleInputChange}
      value={inputValue}
      placeholder="Serache your symbol here"
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <React.Fragment>
            {loading ? <CircularProgress color="inherit" size={20} /> : null}
            {params.InputProps.endAdornment}
          </React.Fragment>
        ),
      }}
    />
  );

  return (
    <div className="input-page">
      <Autocomplete
        className="input-symbol"
        id="asynchronous-demo"
        isOptionEqualToValue={(option, value) => option.name === value.name || option.symbol === value.symbol}
        getOptionLabel={(option) => `${option.name} (${option.symbol})`}
        options={data || []}
        loading={loading}
        renderInput={InoutText}
        onChange={(event: any, value: ResultSymbol | null) => {
          if (value) {
            navigate(`${urlToNavigate}${value.symbol}`);
          }
        }}
      />
    </div>
  );
}
