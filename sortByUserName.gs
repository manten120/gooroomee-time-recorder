function sortByUserName(sheet, heading = 0) {
    if (heading < 0 || !Number.isInteger(heading)) {
    console.log('第2引数は0以上の整数にしてください')
    return
  };

  const range = sheet.getRange(1+heading,1,sheet.getLastRow()-heading, sheet.getLastColumn());
  range.sort({column:1, ascending: true});
}
