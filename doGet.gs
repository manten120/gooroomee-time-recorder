const getRegisterdUserNames = () => {
  const sheet = getSheet('userList');
  const data = sheet.getRange(1,1,sheet.getLastRow()).getValues();
  const registerdUserNames = data.map((array) => array[0]);
  return registerdUserNames;
}

const doGet = (e) => {
  const {type, name} = e.parameter;

  let responseData;

  switch (type) {
    case '0':
      makeUserList();
      responseData = JSON.stringify(getRegisterdUserNames());
      break
    case '1':
      responseData = makeResponseData(name);
      break
    default:
      responseData = 'エラー: クエリ"type"が必要です';
      console.log('エラー: クエリ"type"が必要です');
      break;
  }

  return (ContentService)
    .createTextOutput(responseData)
    .setMimeType(ContentService.MimeType.JSON);
}
