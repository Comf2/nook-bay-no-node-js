//second script in the account chain
//initializes sign up and adds it to database

//todo:
//add ids to all buttons
//TODO: Add init sign in on page thing
const account = {
  signupInputs: {
    username: document.querySelector("#username-signup"),
    password: document.querySelector("#password-signup"),
    submit: document.querySelector("#signup-submit-button"),
  },
  //TODO: Add this to a different object for signing in
  //   signinInputs: {
  //     username: document.querySelector("#username-signin"),
  //     password: document.querySelector("#password-signin"),
  //     submit: document.querySelector("#signin-submit-button"),
  //   },
};
const accountInfo = {
  username: "",
  password: "",
};

account.signupInputs.submit.onclick = () => submitAccount();
const submitAccount = () => {
  accountInfo.username = account.signupInputs.username.value;
  accountInfo.password = account.signupInputs.password.value;

  addAccount(accountInfo);
};

const addAccount = (account) => {
  //adds an account to the database
  const db = request.result;
  const transaction = db.transaction("accounts", "readwrite");

  const store = transaction.objectStore("accounts");

  store.put({
    username: `${account.username}`,
    password: `${account.password}`,
    signedIn: true,
  });
  initSignIn(account.username, db);
};
