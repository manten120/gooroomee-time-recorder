function makeUserList() {
  const GROUP_NAMES = ['room1','room2','room3','room1希望','room1希望なし','本人確認済み'];

  // 連絡先に登録済みの人 + 返信しただけで連絡先には登録していない人(その他の連絡先)のデータを取得する
  const contacts = ContactsApp.getContacts();

  const registerdUserData = []
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];

    const name = contact.getFullName();
    const data = [name];

    // コンタクトグループ(=ラベル)を格納した配列を取得する
    const contactGroups = contact.getContactGroups();

    // 返信しただけで連絡先には登録していない人(その他の連絡先)を除外する。
    // 返信しただけで連絡先には登録していない人(その他の連絡先)はコンタクトグループ(=ラベル)を持たない。
    // 連絡先に登録済みの人はコンタクトグループ'System Group: My Contacts'をデフォルトで持つ。
    if (!contactGroups.length) {
      continue
    }

    console.log(name);
    console.log(contact.getEmailAddresses());

    const groups = contactGroups.map((group) => {
        const groupName = group.getName();
        if (GROUP_NAMES.includes(groupName)) {
          return groupName;
        }
        return '';
      })
      .filter((element) => element);

    GROUP_NAMES.forEach((GROUP_NAME) => {
      if (groups.includes(GROUP_NAME)) {
         data.push(GROUP_NAME);
      } else {
         data.push('');
      }
    });

    registerdUserData.push(data);
    Utilities.sleep(1000)
  }

  console.log(registerdUserData);
  console.log(registerdUserData.length);
  
  const sheet = getSheet('userList');

  const numOfRegisterdUserData = registerdUserData.length;

  const numOfRowsToDelete = Math.max(0, sheet.getLastRow() - numOfRegisterdUserData);

  if (numOfRowsToDelete) {
    sheet.deleteRows(numOfRegisterdUserData + 1, numOfRowsToDelete);
  }
  
  sheet.getRange(1, 1, numOfRegisterdUserData, GROUP_NAMES.length + 1).setValues(registerdUserData).setNumberFormat("@");

  console.log(`Googleコンタクトに登録済みユーザーをシート"userList"に記入し、ユーザー一覧を作成しました`);
}
