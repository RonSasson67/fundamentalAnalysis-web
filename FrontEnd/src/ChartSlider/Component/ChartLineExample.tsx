import ChartIndexStore from "../../Store/ChartIndexStore";
import CustomTooltip from "./CoustomToolTip";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { observer } from "mobx-react";

type ChartLineProps = {
  chartIndexStore: ChartIndexStore;
};

function GetDataKey(data: any[]) {
  // valitate that data is not empty
  if (data.length === 0) {
    return [];
  }
  data.filter((element) => { return element.date !== undefined; });

  const exsistDatakeys: any[] = [];
  data.forEach((element) => {
    Object.keys(element).forEach((key) => {
      if (key != "date" && !exsistDatakeys.includes(key)) {
        exsistDatakeys.push(key);
      }
    });
  });
  return exsistDatakeys;
}

//create component that show line chart with data from GenerateData function and mock data
const CharLineExample = observer(({chartIndexStore}: ChartLineProps) => {
  return (
    <LineChart
      width={800}
      height={400}
      data={chartIndexStore.getIndexData}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <CartesianGrid vertical={false} strokeDasharray="3 3" />
      <XAxis dataKey="date" tick={{ fontSize: 15 }} />
      <YAxis tick={{ fontSize: 15 }} />
      <Tooltip content={<CustomTooltip />} />
      {
         GetDataKey(chartIndexStore.getIndexData).map((dataKey) => {
          return (
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#1e71f7"
              dot={false}
              strokeWidth={2}
            />);})
      }
    </LineChart>);
});

export default CharLineExample;