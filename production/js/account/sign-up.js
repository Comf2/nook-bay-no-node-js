//"Psuedo Sign In"
//TODO: CLean this code up
const account = {
  signupInputs: {
    username: document.querySelector('#username-signup'),
    password: document.querySelector('#password-signup'),
    // phrase: document.querySelector('#phrase-signup'),
    submit: document.querySelector('#signup-submit-button'),
  },
  signinInputs: {
    username: document.querySelector('#username-signin'),
    password: document.querySelector('#password-signin'),
    submit: document.querySelector('#signin-submit-button'),
  },
};
const accountInfo = {
  username: '',
  password: '',
};

const submitAccount = (event) => {
  event.preventDefault();
  accountInfo.username = account.signupInputs.username.value;
  accountInfo.password = account.signupInputs.password.value;

  addAccount(accountInfo);
};

const addAccount = (account) => {
  //adds an account to the database
  const db = request.result;
  const transaction = db.transaction('accounts', 'readwrite');

  const store = transaction.objectStore('accounts');

  localStorage.setItem('signedIn', account.username);
  store.put({
    username: `${account.username}`,
    password: `${account.password}`,
    posts: [],
    profileData: 'null',
    profileImage: '',
    bannerImage: '',
    signedIn: true,
  });
  window.location.reload();
};
