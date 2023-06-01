// function that get array and seperate it evently to number user input
function SpreadArrayEvenly(marks: any[], numToSpread: number) {
  var newArray = [];
  var step = Math.floor(marks.length / numToSpread);
  for (var i = 0; i < marks.length; i += step) {
    newArray.push(marks[i]);
  }
  return newArray;
}

//function that get array and return only the index that between minIndex and maxIndex from ChartIndexStore
function GetIndexData(data: any[], minIndex: number, maxIndex: number) {
  var indexData = [];

  for (var i = minIndex; i <= maxIndex; i++) {
    indexData.push(data[i]);
  }
  return indexData;
}

export { SpreadArrayEvenly, GetIndexData };
