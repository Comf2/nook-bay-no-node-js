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
    initAccountProfileInfo(currentAccount);
  };
}

function initAccountProfileInfo(currentAccount) {
  console.log(finalObjectPosX, finalObjectPosY);
  const profileImages = {
    profilePictures: document.querySelectorAll('.account-profile-pic'),
    bannerImage: document.querySelector('.account-banner-image'),
  };
  if (currentAccount.bannerImage !== '') {
    profileImages.bannerImage.remove();
    let bannerImageMarkdown = `
      <img
          src=${currentAccount.bannerImage}
          class="account-banner-image"
          alt="Banner Image"
          aria-hidden="true"
        />
    `;
    const bannerImageContainer = document.querySelector(
      '.banner-image-container'
    );
    //inits the banner image
    bannerImageContainer.insertAdjacentHTML('afterbegin', bannerImageMarkdown);
  }
  // inits profile picture
  if (currentAccount.profileData !== '') {
    let profileData = JSON.parse(currentAccount.profileData);
    root.style.setProperty('--image-rel-crop-height', `${profileData.height}`);
    root.style.setProperty('--image-rel-crop-width', `${profileData.width}`);
    root.style.setProperty('--profile-pic-scale', `${profileData.scale}`);
    let currentPfp = document.querySelectorAll('.account-profile-pic');
    currentPfp.forEach(function (pfp) {
      pfp.remove();
    });
    //initing the image source
    let profilePicMarkdown = `
    <img
      class="account-profile-pic"
      src=${currentAccount.profileImage}
      alt="profile pic"
      aria-hidden="true"
    />
  `;
    const accountIcon = document.querySelectorAll('.account-icon');
    accountIcon.forEach((icon) => {
      console.log(icon);
      icon.insertAdjacentHTML('afterbegin', profilePicMarkdown);
    });
    currentPfp = document.querySelectorAll('.account-profile-pic');
    console.table(currentPfp);
    for (let i = 0; i < currentPfp.length; i++) {
      console.log('running');
      let getPicPos = calculateProfilePicturePos(
        accountIcon[i],
        profileData.pos.x,
        profileData.pos.y
      );
      currentPfp[
        i
      ].style.objectPosition = `${getPicPos[0]}px ${getPicPos[1]}px`;
    }

    // currentPfp.style.objectPosition = `${profileData.pos.x}px ${profileData.pos.y}px`;
  }
}
function calculateProfilePicturePos(img, x, y) {
  const finX = Math.round(img.offsetWidth * x * 100) / 100;
  const finY = Math.round(img.offsetHeight * y * 100) / 100;

  return [finX, finY];
}
