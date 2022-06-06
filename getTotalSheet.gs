function getTotalSheet() {
  const totalSheet = getSheet('total');
  const userNames = getUserNames(totalSheet, 1);
  const userListSheet = getSheet('userList');
  const registeredUserNames = getUserNames(userListSheet, 0);

  const newUserNames = registeredUserNames
    .map((registeredUserName) => {
      if (!userNames.includes(registeredUserName)) {
        return registeredUserName;
      } else {
        return '';
      }
    })
    .filter((element) => element);

  const unregisteredUserNames = userNames
    .map((userName) => {
      if (!registeredUserNames.includes(userName)) {
        return userName;
      } else {
        return '';
      }
    })
    .filter((element) => element);

  if (newUserNames.length) {
    const lastRow = totalSheet.getRange(1, 1)
    .getNextDataCell(SpreadsheetApp.Direction.DOWN)
    .getRow();

    totalSheet
      .getRange(lastRow + 1, 1, newUserNames.length)
      .setValues(arrayToArrayArray(newUserNames))
      .setNumberFormat("@");
  }

  sortByUserName(totalSheet, 1);

  return totalSheet;
}
