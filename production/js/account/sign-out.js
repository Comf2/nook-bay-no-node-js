const signOutButton = document.querySelector('.sign-out');

if (signOutButton != null) signOutButton.onclick = () => signOut();

//if the current signed in is equal to the keypath of the account
//then it updates the account but with the signin being false
//it then reloads the page to init scripts that act when signed out
function signOut() {
  let currentSignIn = localStorage.getItem('signedIn');
  //   if (currentSignIn != null) {
  const store = db.transaction('accounts', 'readwrite').objectStore('accounts');
  const passwordIndex = store.index('password');
  const passwords = store.index('password').getAll();
  passwords.onsuccess = () => {
    let accounts = passwords.result;

    let currentPassword;

    accounts.forEach((account) => {
      if (account.username == currentSignIn) {
        console.log(account.password);
        currentPassword = account.password;
        store.put({
          username: `${currentSignIn}`,
          password: `${currentPassword}`,
          signedIn: false,
        });
        localStorage.setItem('signedIn', null);
        window.location.reload();
      }
    });
  };
}
