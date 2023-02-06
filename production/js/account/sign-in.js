const signInInputs = {
  username: document.querySelector('#username-signin'),
  password: document.querySelector('#password-signin'),
  submit: document.querySelector('#signin-submit-button'),
};
signInInputs.submit.onclick = () => signIn();

function signIn() {
  //gets all accounts in database
  const transaction = db.transaction('accounts', 'readwrite');

  const store = transaction.objectStore('accounts');

  let signInUsername = signInInputs.username.value;
  let signInPassword = signInInputs.password.value;
  //used for searching purposes later
  const passwordIndex = store.index('password');

  let passwords = passwordIndex.getAll();
  //checks if username/password are in database
  let signedIn = false;
  //account auth check
  passwords.onsuccess = () => {
    for (let i = 0; i < passwords.result.length; i++) {
      let password = passwords.result[i].password;
      let username = passwords.result[i].username;
      if (username == signInUsername && password == signInPassword) {
        console.log('password is correct');
        signedIn = true;

        initSignIn(username, password);
        break;
      } else {
        console.log('password is wrong');
      }
    }
  };
}
function initSignIn(username, password) {
  const store = db.transaction('accounts', 'readwrite').objectStore('accounts');
  store.put({
    username: `${username}`,
    password: `${password}`,
    signedIn: true,
  });
}
