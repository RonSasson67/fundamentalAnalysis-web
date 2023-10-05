import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import CustomTooltip from "../../Common/CustomToolTip/CoustomToolTip";
import CustomTick from "../../ChartSlider/Component/CustomTick ";

export interface FinencialMetricschartData {
  year: number;
  netIncome: number;
  freeCashFlow: number;
  freeCashFlowPresentValue?: number;
}

export interface FinencialMetricsChartProps {
  chartData: FinencialMetricschartData[];
}

const FinencialChart = ({ chartData }: FinencialMetricsChartProps) => {
  return (
    <ResponsiveContainer width="95%" height="80%">
      <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 40, left: 0 }}>
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="year" tick={CustomTick} />
        <YAxis tick={{ fontSize: 15 }} />
        <Line type="monotone" dataKey="netIncome" stroke="#8884d8" dot={false} strokeWidth={2} />
        <Line type="monotone" dataKey="freeCashFlow" stroke="#82ca9d" dot={false} strokeWidth={2} />
        <Line type="monotone" dataKey="freeCashFlowPresentValue" stroke="#FF0000" dot={false} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default FinencialChart;
