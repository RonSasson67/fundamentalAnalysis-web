

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
      });
      index++;
    }
    return data;
  }
  

  export {GenerateDataForCharts}