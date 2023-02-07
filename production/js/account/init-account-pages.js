//set of functions that are called depending on the page,
//changes page content based on if your signed in

//called on every page
function initNavbar(currentPage) {
  const signedOutNavEle = document.querySelectorAll('.signed-out-nav-ele');
  let dropdownMarkdown = '';
  if (currentPage == 'index') {
    dropdownMarkdown = `
    <li onclick="window.location = './production/assets/pages/account.html'">
      <i class="fa-solid fa-user"></i>
      <p>Account</p>
    </li>
    <li onclick="signOut()">
      <i class="fa-solid fa-user"></i>
      <p>Sign Out</p>
    </li>
  `;
  }
  //changes source of the links
  else {
    dropdownMarkdown = `
    <li onclick="window.location = './account.html'">
      <i class="fa-solid fa-user"></i>
      <p>Account</p>
    </li>
    <li onclick="signOut()">
      <i class="fa-solid fa-user"></i>
      <p>Sign Out</p>
    </li>
  `;
  }
  signedOutNavEle.forEach((ele) => {
    ele.remove();
  });
  const dropdown = document.querySelector('.account-dropdown ul');
  dropdown.insertAdjacentHTML('beforebegin', dropdownMarkdown);
}

function initAccountPage(username) {
  //placeholder
  const userGreetingEle = document.querySelector('.user-greeting');
  let usernameMarkdown = `<h1> Hi, ${username}</h1>`;
  userGreetingEle.insertAdjacentHTML('beforeend', usernameMarkdown);

  const store = db.transaction('accounts', 'readwrite').objectStore('accounts');
  const passwordsIndex = store.index('password');
  const passwords = passwordsIndex.getAll();
  passwords.onsuccess = () => {
    const passwordList = passwords.result;
    const signedIn = localStorage.getItem('signedIn');
    const currentAccount = passwordList.find(
      (value) => value.username === signedIn
    );
    // initAccountProfileInfo(currentAccount);
  };
}

// function initAccountProfileInfo(currentAccount) {
//   const profileImages = {
//     profilePictures: document.querySelectorAll('.account-profile-pic'),
//     bannerImage: document.querySelector('.account-banner-image'),
//   };
//   if (currentAccount.bannerImage !== '') {
//     console.log(profileImages.bannerImage);
//     profileImages.bannerImage.src = currentAccount.bannerImage;
//     console.log(profileImages.bannerImage.src);
//   }
// }
