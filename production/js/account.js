const togglePageButton = document.querySelector('.toggle-page-container');
const selectedPageBackground = document.querySelector(
  '.selected-page-background'
);
const togglePage = () => {
  selectedPageBackground.toggleAttribute('data-chats');
};

togglePageButton.onclick = () => togglePage();

//adding custom banner image
const bannerImageInput = document.querySelector('#banner-image-input');
const bannerImage = document.querySelector('.account-banner-image');
bannerImageInput.addEventListener('change', function (e) {
  var tgt = e.target,
    files = tgt.files;

  // FileReader support
  if (FileReader && files && files.length) {
    var fr = new FileReader();
    fr.onload = function () {
      bannerImage.src = fr.result;
    };

    fr.readAsDataURL(files[0]);
  }
});

//--DB: pushes banner image and profilepic to indexeddb :DB--//

//Step 1: Push info to database
//Step 2: Put Data into Source of image

//gets all information that will be pushed to database,
function getAccountInfo() {
  const profilePic = {
    height: imageHeightRelCrop,
    width: imageWidthRelCrop,
    scale: profilePicScale,
    pos: {
      x: finObjectPosX,
      y: finObjectPosY,
    },
  };
  const profilePicture = document.querySelector('.account-profile-pic').src;
  let bannerImage = document.querySelector('.account-banner-image');

  pushAccountInfoToDb(profilePic, bannerImage, profilePicture);
}

//retrieve data

//gets the database, and keeps existing data and updated other
//with new information
function pushAccountInfoToDb(profilePic, bannerImage, profilePicture) {
  const store = db.transaction('accounts', 'readwrite').objectStore('accounts');
  const passwordsIndex = store.index('password');
  const passwords = passwordsIndex.getAll();
  console.log(profilePic);
  passwords.onsuccess = () => {
    const passwordList = passwords.result;
    const signedIn = localStorage.getItem('signedIn');
    const currentAccount = passwordList.find(
      (value) => value.username === signedIn
    );
    let profileDataString = JSON.stringify(profilePic);
    store.put({
      username: `${currentAccount.username}`,
      password: `${currentAccount.password}`,
      posts: [],
      profileData: profileDataString,
      profileImage: JSON.stringify(profilePicture),
      bannerImage: JSON.stringify(bannerImage.src),
      signedIn: true,
    });
  };
}

//-0-0-0 Retrieves the data and sets it to images -0-0-0 //
