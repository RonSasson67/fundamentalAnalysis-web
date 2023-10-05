import { observer } from "mobx-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ChartIndexStore from "../../../Store/ChartIndexStore";
import CustomTooltip from "../../Common/CustomToolTip/CoustomToolTip";
import CustomTick from "./CustomTick ";

type ChartLineProps = {
  chartIndexStore: ChartIndexStore;
};

function GetDataKey(data: any[]) {
  // valitate that data is not empty
  if (data.length === 0) {
    return [];
  }
  data.filter((element) => {
    return element.date !== undefined;
  });

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
const LineChartIndex = observer(({ chartIndexStore }: ChartLineProps) => {
  // create bar colors array for the chart that contain 10 dark colors, make sure the are diffrent

  const barColors = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
  ];
  return (
    <ResponsiveContainer width="100%" height="80%">
      <LineChart data={chartIndexStore.getIndexData} margin={{ top: 5, right: 20, bottom: 40, left: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={CustomTick} />
        <YAxis tick={{ fontSize: 15 }} />
        <Tooltip content={<CustomTooltip />} />
        {GetDataKey(chartIndexStore.getIndexData).map((dataKey, index) => {
          return (
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={barColors[index % barColors.length]}
              dot={false}
              strokeWidth={2}
              key={index}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
});

export default LineChartIndex;
