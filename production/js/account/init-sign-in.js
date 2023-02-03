//third script in the chain
//should be attatched to all scripts regarding account info,
//should be put before sign-up.js
//shoudl be put after the page init sign up script

//takes in the database and the current person signed ins username
//finds out what page you are on and calls the init script from that page
const initSignIn = (username, db) => {
  //gets what page your on through data attribute on body
  let currentPage = document.body.getAttribute("data-page");
  if (currentPage === "sign-up") {
    initAccountSignupPage();
  }
  console.log(currentPage, username);
};
