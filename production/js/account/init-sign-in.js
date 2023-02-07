//sets global variables for account information if the user is signed in

//method is called whenever database is got
//sets local storage to whoever is signed in
//intentionally vague to be more scalable;
const checkSignIn = (db) => {
  const store = db.transaction('accounts', 'readwrite').objectStore('accounts');

  const passwordIndex = store.index('password');

  let passwords = passwordIndex.getAll();

  passwords.onsuccess = () => {
    let accounts = passwords.result;

    accounts.forEach(function (account) {
      if (account.signedIn == true) {
        //make value null if no one is signed in
        window.localStorage.setItem('signedIn', `${account.username}`);
        console.log(window.localStorage.getItem('signedIn'));
        checkPageSignIn(account.username);
      }
    });
    let signedInLS = localStorage.getItem('signedIn');
    if (signedInLS == 'null') {
      console.log('running');
      checkPageSignOut();
    }
  };
};
const currentPage = document.body.getAttribute('data-page');

//gets current page and acts on it depending on what the current page is

const checkPageSignIn = (username) => {
  switch (currentPage) {
    case 'sign-up':
      window.location = './account.html';
      break;
    case 'log-in':
      window.location = './account.html';
      break;
    case 'account':
      initAccountPage(username);
      break;
  }
  initNavbar(currentPage);
};
const checkPageSignOut = () => {
  console.log('ls', localStorage.getItem('signedIn'));
  if (currentPage == 'account') {
    window.location = './log-in.html';
  }
};
