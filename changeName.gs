const changeName = () => {
  const before = 'あーちゃん';
  const after = 'あーちゃん元アメンボ';

  const allSheets = SpreadsheetApp
    .openById(SPREADSHEET_ID)
    .getSheets();

  allSheets.forEach((sheet) => {
    console.log(sheet.getName());
    const textFinder = sheet
      .createTextFinder(`${before}`)
      .matchEntireCell(true);

    textFinder.replaceAllWith(after);
  })
  console.log(`全てのシートで"${before}"を"${after}"に変更しました`)
}