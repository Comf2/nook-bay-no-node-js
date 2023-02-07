const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;
//index begins at two
//already made database and failed, so upgrade needed
//wasnt running
const request = indexedDB.open('AccountDatabase', 2);

let db;

request.onerror = (e) => {
  console.error('An error occured with IndexedDB');
  console.error(e);
};
//result is the database
request.onupgradeneeded = () => {
  db = request.result;
  const store = db.createObjectStore('accounts', { keyPath: 'username' });
  store.createIndex('password', ['password'], { unique: false });
  store.createIndex('posts', ['posts'], { unique: false });
  store.createIndex('profileData', 'profile-data', { unique: false });
  store.createIndex('profileImage', 'profile-image', { unique: false });
  store.createIndex('bannerImage', 'bannerImage', { unique: false });
  store.createIndex('signedIn', ['signedIn'], { unique: false });
};
request.onsuccess = () => {
  db = request.result;
  checkSignIn(db);
};

//adding data
function addAccountData(data) {
  let request = db
    .transaction(['accounts'], 'readwrite')
    .objectStore('accounts')
    .add(data);
}
//clearing data
let clearDatabutton = document.querySelector('.clear-data');
if (clearDatabutton != null) clearDatabutton.onclick = () => clearData();

const clearData = () => {
  db = request.result;
  localStorage.setItem('signedIn', null);
  const transaction = db
    .transaction('accounts', 'readwrite')
    .objectStore('accounts')
    .clear();

  transaction.onsuccess = () => {
    console.log('clear - successful');
  };
};
