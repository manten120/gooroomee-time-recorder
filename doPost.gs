const doPost = (e) => {
  const params = JSON.parse(e.postData.getDataAsString()); 
  const receivedUserNames = params.studyingUserNames;

  const sheet = getMonthlySheet();
  const userNames = getUserNames(sheet, 1);
  const newUserNames = receivedUserNames
    .filter((element) => !userNames.includes(element));

  setUserNames(sheet, newUserNames);
  addMinutes(sheet, receivedUserNames);

  
  const responseList = sheet.getDataRange().getValues();
  const response = {
    data: responseList,
    meta: { status: 'success' }
  };
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}
