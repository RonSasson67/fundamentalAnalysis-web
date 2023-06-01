import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { observer } from "mobx-react";
import ChartIndexStore from "../Store/ChartIndexStore";
import { SpreadArrayEvenly } from "../Utils/ArraysLogic";

type SliderProps = {
  chartIndexStore: ChartIndexStore;
};

function valuetext(value: number) {
  return `${value}`;
}

function MarksAdapter(jsonData: any) {
  // Sort the JSON data by date
  var sortedData = jsonData.slice().sort((a: any, b: any) => {
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

const SliderExample = observer(({ chartIndexStore }: SliderProps) => {
  const [value, setValue] = React.useState<number[]>([0, chartIndexStore.getData.length - 1]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    chartIndexStore.setMinIndex(typeof newValue === "number" ? newValue : newValue[0]);
    chartIndexStore.setMaxIndex(typeof newValue === "number" ? newValue : newValue[1]);
  };

  const marks = MarksAdapter(chartIndexStore.getData);
  const spreadMarks = SpreadArrayEvenly(marks, 6);

  return (
    <Box sx={{ width: 800 }}>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={[chartIndexStore.getMinIndex, chartIndexStore.getMaxIndex]}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        valueLabelFormat={(value) => valueLabelFormat(value, marks)}
        marks={spreadMarks}
        min={0}
        max={marks.length - 1}
      />
    </Box>
  );
});

export default SliderExample;
