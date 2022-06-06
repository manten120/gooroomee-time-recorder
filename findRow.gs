const findRow = (sheet, userName) => {
  const textFinder = sheet
    .getRange(1,1,sheet.getLastRow())
    .createTextFinder(userName)
    .matchEntireCell(true);

  if (!textFinder.findNext()) return '';

  const rowNum = textFinder.getCurrentMatch().getRow();
  return rowNum;
}