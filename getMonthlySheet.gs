function getMonthlySheet(num=0) {
  const d = dayjs.dayjs(new Date()).add(num, 'month');
  const year = d.year();
  const monthDoubleDigit = d.format('MM')

  const endDateOfManth = d.endOf('month').format('D');
  const sheetName = d.format('YYYY/MM');
  const sheet = getSheet(sheetName);

  if (sheet.getDataRange().isBlank()) {
    sheet.setFrozenColumns(1);
    const firstRow = []
    const startOfMonth = dayjs.dayjs(new Date()).startOf('month');
    for(i = 0; i <= endDateOfManth; i++) {
      if(!i) {
        firstRow.push('名前');
      } else {
        const dateDoubleDigit = startOfMonth.add(i-1, 'day').format('DD');
        firstRow.push(`${year}/${monthDoubleDigit}/${dateDoubleDigit}`)
      }
    }
    sheet.appendRow(firstRow);
  }

  return sheet;  
}
