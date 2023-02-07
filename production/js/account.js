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
