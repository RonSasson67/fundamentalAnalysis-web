function SpreadArrayEvenly(array: any[], numberOfIndex: number) {
  var spreadArray = [];
  var arrayLength = array.length;

  if (numberOfIndex > arrayLength) {
    numberOfIndex = arrayLength;
  }

  var spreadIndex = Math.ceil(arrayLength / numberOfIndex);
  var index = 0;

  for (var i = 0; i < numberOfIndex; i++) {
    spreadArray.push(array[index]);
    index += spreadIndex;
  }

  //if the array is not divide evenly add the last index
  if (spreadArray.length >= numberOfIndex) {
    spreadArray.push(array[arrayLength - 1]);
  }

  return spreadArray;
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
