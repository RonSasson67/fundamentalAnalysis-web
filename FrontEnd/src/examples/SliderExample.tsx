import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { observer } from "mobx-react";

type SliderProps = {
  data: any;
};

function valuetext(value: number) {
  return `${value}`;
}

function MarksAdapter(jsonData: any) {
  // Sort the JSON data by date
  var sortedData = jsonData.sort((a: any, b: any) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });
  // Transform sorted data into marks format
  var marks = sortedData.map((data: any, index: Number) => ({
    value: index,
    label: data.date,
  }));

  return marks;
}

function valueLabelFormat(
  value: number,
  marks: { value: number; label: string }[]
) {
  const mark = marks[value];
  return mark ? mark.label : "";
}

const SliderExample = observer(({ data }: SliderProps) => {
  const [value, setValue] = React.useState<number[]>([0, data.length - 1]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const marks = MarksAdapter(data);

  return (
    <Box sx={{ width: 800 }}>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        valueLabelFormat={(value) => valueLabelFormat(value, marks)}
        marks={marks}
        min={0}
        max={marks.length - 1}
      />
    </Box>
  );
});

export default SliderExample;
