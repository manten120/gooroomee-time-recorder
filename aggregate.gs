function aggregate(num=0) {
  const sheet = getMonthlySheet(num);
  const totalSheet = getTotalSheet();
  const userNames = getUserNames(totalSheet, 1);

  const arrayOfUserNameAndMinutes = userNames
    .map((userName) => {
      const textFinder = sheet
        .createTextFinder(userName)
        .matchEntireCell(true);

      if (!textFinder.findNext()) return '';

      const rowNum = textFinder.getCurrentMatch().getRow();

      const values = sheet
        .getRange(rowNum, 2, 1, sheet.getLastColumn()).getValues();

      const sum = (array) => {
        let sum = 0;
        array.forEach((value) => {
          if (!value) return;
          sum += value;
        })
        return sum;
      }

      return {
        userName,
        minutes: sum(values[0]),
      };
    })
    .filter((element) => element);

  const findOrMakeColumn = (sheet, value) => {
    let columnNum = findColumn(sheet, value);

    if (!columnNum) {
      columnNum = sheet.getLastColumn() + 1;

      sheet
        .getRange(1, columnNum)
        .setValue(value)
        .setNumberFormat("@");
    }

    return columnNum;
  }

  arrayOfUserNameAndMinutes.forEach((userNameAndMinutes) => {
      const userName = userNameAndMinutes.userName;

      const textFinder = totalSheet
        .createTextFinder(userName)
        .matchEntireCell(true);

      if (!textFinder.findNext()) return '';

      const rowNum = textFinder.getCurrentMatch().getRow();
      const columnName = dayjs.dayjs(new Date()).add(num, 'month').format('YYYY/MM');
      const columnNum = findOrMakeColumn(totalSheet, columnName);

      totalSheet
        .getRange(rowNum, columnNum)
        .setValue(userNameAndMinutes.minutes);
  });

  console.log(arrayOfUserNameAndMinutes);
}