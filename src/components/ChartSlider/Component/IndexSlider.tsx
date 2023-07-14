import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { observer } from "mobx-react";
import ChartIndexStore from "../../../Store/ChartIndexStore";
import { SpreadArrayEvenly } from "../../../Utils/ArraysLogic";

type SliderProps = {
  chartIndexStore: ChartIndexStore;
};

function valuetext(value: number) {
  return `${value}`;
}

function MarksAdapter(jsonData: any[]): { value: number; label: string }[] {
  // Transform sorted data into marks format
  var marks = jsonData.map((data: any, index: Number) => ({
    value: index,
    label: data.date,
  }));

  return marks as { value: number; label: string }[];
}

function valueLabelFormat(value: number, marks: { value: number; label: string }[]) {
  const mark = marks[value];
  return mark ? mark.label : "";
}

const IndexSlider = observer(({ chartIndexStore }: SliderProps) => {
  const handleChange = (_: Event, newValue: number | number[]) => {
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

export default IndexSlider;
