const findColumn = (sheet, hedingValue) => {
  const textFinder = sheet
    .getRange(1,1,1,sheet.getLastColumn())
    .createTextFinder(hedingValue)
    .matchEntireCell(true);
  
  if (!textFinder.findNext()) return '';

  const columnNum = textFinder.getCurrentMatch().getColumn();
  return columnNum;
}