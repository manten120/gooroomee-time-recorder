function setUserNames(sheet, newUserNames) {
  const len = newUserNames.length;
  if (!len) return;
  range = sheet.getRange(sheet.getLastRow()+1,1,len);
  const data = arrayToArrayArray(newUserNames);
  range.setValues(data).setNumberFormat("@");
  sortByUserName(sheet, 1);
}
