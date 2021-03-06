const makeResponseData = (userName) => {
  const d = dayjs.dayjs(new Date());
  const today = d.format('YYYY/MM/DD');
  const yesterday = d.add(-1, 'day').format('YYYY/MM/DD');
  const monthOfToday = d.format('YYYY/MM');
  const monthOfYesterday = d.add(-1, 'day').format('YYYY/MM');
  const lastMonth = d.add(-1, 'month').format('YYYY/MM');

  const getValue = (sheetName, userName, hedingValue) => {
    const getValueOfCell = (sheet, rowNum, columnNum) => {
      if (!rowNum || !columnNum) return 0;

      const value = sheet.getRange(rowNum, columnNum).getValue();

      if (value) {
        return value;
      } else {
        return 0;
      }
    }

    const sheet = getSheet(sheetName);
    const rowNum = findRow(sheet, userName);
    const columnNum = findColumn(sheet, hedingValue);
    const value = getValueOfCell(sheet, rowNum, columnNum);

    return value;
  }

  const minutesOfToday = getValue(monthOfToday, userName, today);
  const minutesOfYesterday = getValue(monthOfYesterday, userName, yesterday);
  const minutesOfThisMonth = getValue('total', userName, monthOfToday);
  const minutesOfLastMonth = getValue('total', userName, lastMonth);

  return `โ๐ป${userName}ใใใฎๆบ็นใซใผใ ๅฉ็จๆ้๏ผ ไปๆฅ ${minutesToHours(minutesOfToday)}ใๆจๆฅ ${minutesToHours(minutesOfYesterday)}ใไปๆ ${minutesToHours(minutesOfThisMonth)} (ไปๆใถใใฏ1ๆ้ใใจใซๆดๆฐ) ใๅๆ ${minutesToHours(minutesOfLastMonth)}๐ป๐ธ`

  // return `${userName}ใใใฎๆบ็นใซใผใ ๅฉ็จๆ้๏ผ ไปๆฅ ${minutesToHours(minutesOfToday)}ใๆจๆฅ ${minutesToHours(minutesOfYesterday)}ใไปๆ ${minutesToHours(minutesOfThisMonth)} (1ๆ้ใใจใซๆดๆฐ)ใๅๆ ${minutesToHours(minutesOfLastMonth)}`
}