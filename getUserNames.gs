function getUserNames(sheet, heading = 0) {
  if (heading < 0 || !Number.isInteger(heading)) {
    console.log('第2引数は0以上の整数にしてください')
    return
  };

  const lastRow = sheet.getRange(1, 1)
    .getNextDataCell(SpreadsheetApp.Direction.DOWN)
    .getRow();
  
  const userNamesLength = lastRow - heading;
  if(userNamesLength === 0) return [];
  
  const data = sheet.getRange(1 + heading,1,userNamesLength).getValues();
  const userNames = data.map((data) => data[0]);
  return userNames;
}
