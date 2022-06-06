function addMinutes(sheet, receivedUserNames) {
  const d = new Date();
  const date = d.getDate();
  receivedUserNames.forEach((userName) => {
    const row = findRow(sheet, userName);
    const range = sheet.getRange(row, date+1);
    const value = range.getValue();
    range.setValue(value+1);
  })
}
