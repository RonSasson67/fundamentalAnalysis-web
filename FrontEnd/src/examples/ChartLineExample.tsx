import CustomTooltip from "./CoustomToolTip";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

//generate data for recharts that x is number between 0-100 and y is date (dd-mm-yyyy) that go higer by log month each time make the name the date in format (dd-mm-yyyy) make the uv be e^i (e is the number 2.71828) and i is the number of the loop
function GenerateData() {
  var data = [];
  var index = 0;
  for (var i = 0; i < 1; i += 0.1) {
    var date = new Date();
    date.setMonth(date.getMonth() + index);
    data.push({
      date:
        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear(),
      uv: Math.pow(2.71828, i),
    });
    index++;
  }
  return data;
}

function GetDataKey(data: any[]) {
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
function CharLineExample(props: any) {
  return (
    <LineChart
      width={800}
      height={400}
      data={props.data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <CartesianGrid vertical={false} strokeDasharray="3 3" />
      <XAxis dataKey="date" tick={{ fontSize: 15 }} />
      <YAxis tick={{ fontSize: 15 }} />
      <Tooltip content={<CustomTooltip />} />
      {GetDataKey(props.data).map((dataKey) => {
        return (
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#1e71f7"
            dot={false}
            strokeWidth={2}
          />
        );
      })}
    </LineChart>
  );
}

export { GenerateData };
export default CharLineExample;
