//generate data for recharts that x is number between 0-100 and y is date (dd-mm-yyyy) that go higer by log month each time make the name the date in format (dd-mm-yyyy) make the uv be e^i (e is the number 2.71828) and i is the number of the loop
function GenerateDataForCharts() {
  var data = [];
  var index = 0;
  for (var i = 0; i < 1; i += 0.1) {
    var date = new Date();
    date.setMonth(date.getMonth() + index);
    data.push({
      date:
        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear(),
      uv: Math.pow(2.71828, i),
      pv: Math.pow(2.71828, i) * -1,
      1: Math.pow(2.71828, i) * 2,
      2: Math.pow(2.71828, i) * 3,
      3: Math.pow(2.71828, i) * 4,
      4: Math.pow(2.71828, i) * 5,
      5: Math.pow(2.71828, i) * 6,
      6: Math.pow(2.71828, i) * 7,
      7: Math.pow(2.71828, i) * 8,
      8: Math.pow(2.71828, i) * 9,
    });
    index++;
  }
  return data;
}

function GenerateDataForTabel() {
  return [
    { key: "Market Cap", value: "$2.85T" },
    { key: "Industry", value: "Technology" },
    { key: "EPS (TTM)", value: "$5.95" },
    { key: "P/E (TTM)", value: "$30.17" },
    { key: "Div & Yield", value: "$0.96 (0.53%)" },
    { key: "FCF Payout Ratio", value: "15.49%" },
    { key: "P/S (TTM)", value: "7.39" },
    { key: "P/B", value: "45.79" },
    { key: "Shares Outstanding", value: "15.73B" },
    { key: "Ex-Dividend", value: "2023-05-12" },
    { key: "Next Earnings", value: "07-26" },
    { key: "Forward P/E", value: "28.08" },
    { key: "Payout Ratio", value: "16.01%" },
    { key: "P/FCF (TTM)", value: "29.19" },
    { key: "FCF Yield", value: "3.43%" },
    { key: "Earnings Yield", value: "3.31%" },
  ];
}

export { GenerateDataForCharts, GenerateDataForTabel };
