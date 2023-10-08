type CustomTickProps = {
  x: number;
  y: number;
  payload: any;
};

// Custom tick for the x axis of the chart that rotate the text and make it smaller and change the color to white with opacity 0.7 and make the font family Inter  and Open Sans and make the font weight 400 and make the font size 0.875rem and make the line height 1.43 and make sure see all the text and not be
export const CustomTickTimeStamp = ({ x, y, payload }: CustomTickProps) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="white"
        transform="rotate(-35)"
        overflow={"visible"}
        style={{
          fontFamily: "Inter, Open Sans",
          height: "auto",
        }}
      >
        {new Date(payload.value * 1000).toISOString().slice(0, 10)}
      </text>
    </g>
  );
};
