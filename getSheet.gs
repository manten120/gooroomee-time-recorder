function getSheet(sheetName) {
  const sheet = SpreadsheetApp
    .openById(SPREADSHEET_ID)
    .getSheetByName(sheetName);
  
  if(sheet) {
    console.log(`シート"${sheetName}"を取得しました`);
    return sheet;
  }

  const newSheet = SpreadsheetApp
    .openById(SPREADSHEET_ID)
    .insertSheet()
    .setName(sheetName);
  
  console.log(`シート"${sheetName}"を作成しました`);
  return newSheet;
}
