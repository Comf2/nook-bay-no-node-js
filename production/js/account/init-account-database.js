//first script in the chain
//creates the database

//look through todos after
//TODO: Refactor
//make signup only add to database and nothing else
//dont do any of the create card stuff that we made
//or posting yet
//only make it read username to account page
//integrate this with creating the cards on the index cards later
//make automatically signup from signin
const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

//index begins at two
const request = indexedDB.open("AccountDatabase", 2);

request.onerror = (e) => {
  console.error("An error occured with IndexedDB");
  console.error(e);
};
let db = "";
//result is the database
//initializes account object store, and adds all associated account info
request.onupgradeneeded = () => {
  db = request.result;
  console.log("2");
  const store = db.createObjectStore("accounts", { keyPath: "username" });
  store.createIndex("password", ["password"], { unique: false });
  store.createIndex("posts", ["posts"], { unique: false });
  store.createIndex("signedIn", ["signedIn"], { unique: false });
};
//looks for previous logins and acts on if someone was logged in

request.onsuccess = () => {
  db = request.result;
  if (db != "") window.localStorage.setItem("dbFound", true);
  //TODO: Add These Functions after finishing migration
  //   checkSignIn(db);
  //   findPrevLogIn(db);
};
//clearing data
let clearDatabutton = document.querySelector(".clear-data");
clearDatabutton.onclick = () => clearData();

//removes all information from the database
const clearData = () => {
  db = request.result;

  const transaction = db
    .transaction("accounts", "readwrite")
    .objectStore("accounts")
    .clear();

  transaction.onsuccess = () => {
    window.localStorage.setItem("signedIn", null);
  };
};
