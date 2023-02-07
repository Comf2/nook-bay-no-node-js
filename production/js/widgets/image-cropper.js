//TODO: Fix the scale on the cropper

//---0---pfp cropper ---0---//

let mouseX = 0;
let mouseY = 0;

//changing object position based on mouse movement

let modalImageX;
let modalImageY;
let modalStartPosX;
let modalStartPosY;
let objectPosX;
let objectPosY;
let finalObjectPosY = 0;
let finalObjectPosX = 0;
let profilePicScale = 1;

let modalImage;

let imageHeightRelCrop = 1;
let imageWidthRelCrop = 1;

let imageScaleInput;

// changing account icon
const profilePic = document.querySelector('.account-profile-pic');

const profilePicInput = document.querySelector('#account-icon-input');
const editProfilePicButton = document.querySelector('#edit-crop-settings');

if (editProfilePicButton != null)
  editProfilePicButton.onclick = () => {
    initModel(profilePic);
  };

profilePicInput.addEventListener('change', (e) => {
  var tgt = e.target,
    files = tgt.files;

  // FileReader support
  if (FileReader && files && files.length) {
    var fr = new FileReader();
    fr.onload = function () {
      profilePic.src = fr.result;
      initModel(profilePic);
    };

    fr.readAsDataURL(files[0]);
  }
});

function setObjectPos() {
  modalImageX = modalImage.offsetLeft + modalImage.offsetWidth / 2;
  modalImageY = modalImage.offsetTop + modalImage.offsetHeight / 2;

  objectPosX = modalImageX - modalStartPosX;
  objectPosY = modalImageY - modalStartPosY;

  //make final position into a percentage so it is scalable to all types
  //rounded to the nearest hundreth
  finalObjectPosX =
    Math.round((objectPosX / accountIconCropper.offsetWidth) * 100) / 100;
  finalObjectPosY =
    Math.round((objectPosY / accountIconCropper.offsetHeight) * 100) / 100;
}

let profileDrag = false;

function toggleProfileDrag(isDragging, e) {
  modalImage = document.querySelector('#modal-image');
  profileDrag = isDragging;

  x = e.clientX;
  y = e.clientY;
}

document.addEventListener('mousemove', (e) => {
  if (profileDrag) {
    const dx = e.clientX - x;
    const dy = e.clientY - y;

    modalImage.style.top = `${modalImage.offsetTop + dy}px`;
    modalImage.style.left = `${modalImage.offsetLeft + dx}px`;

    x = e.clientX;
    y = e.clientY;

    modalImageX = modalImage.offsetLeft;
    modalImageY = modalImage.offsetTop;

    setObjectPos();
  }
});

//making a model

//calculate how big the image is compared to the crop range
//ex: height is 2 times as big as the crop range, and make that the size of the image

let closeModalButton;

const modalContainer = document.querySelector('.modal');
let accountIconCropper;

//TODO: Clean this code up
let finObjectPosX = 0;
let finObjectPosY = 0;

function setAccountImgPos() {
  const accountImages = document.querySelectorAll('.account-profile-pic');
  accountImages.forEach(function (profilePic) {
    finObjectPosX =
      Math.round(profilePic.offsetWidth * finalObjectPosX * 100) / 100;
    finObjectPosY =
      Math.round(profilePic.offsetHeight * finalObjectPosY * 100) / 100;

    imageWidthRelCrop =
      Math.round(
        (modalImage.offsetWidth / accountIconCropper.offsetWidth) * 100
      ) / 100;
    imageHeightRelCrop =
      Math.round(
        (modalImage.offsetHeight / accountIconCropper.offsetHeight) * 100
      ) / 100;

    profilePicScale = imageScaleInput.value;
    profilePic.style.objectPosition = `${finObjectPosX}px ${finObjectPosY}px`;

    root.style.setProperty('--image-rel-crop-height', `${imageHeightRelCrop}`);
    root.style.setProperty('--image-rel-crop-width', `${imageWidthRelCrop}`);
    root.style.setProperty('--profile-pic-scale', `${imageScaleInput.value}`);

    finObjectPosX = 0;
    finObjectPosY = 0;
  });
}

//changes images scale based off the scale input value
function updateScale() {
  modalImage.style.scale = `${imageScaleInput.value}`;
}

function closeModal() {
  setAccountImgPos();
  getAccountInfo();

  modalContainer.style.display = 'none';
  while (modalContainer.firstChild) {
    modalContainer.removeChild(modalContainer.lastChild);
  }
  modalImageX = '';
  modalImageY = '';
  modalStartPosX = '';
  modalStartPosY = '';
  objectPosX = '';
  objectPosY = '';
  finalObjectPosY = '';
  finalObjectPosX = '';
  imageHeightRelCrop = '';
  imageWidthRelCrop = '';
}

function initModel(pic) {
  modalContainer.style.display = 'grid';
  const modalMarkdown = `
	<input
			type="number"
			name="profile-pic-scale"
			id="profile-pic-scale"
			value="1.00"
		/>
   <img src="${pic.src}" id="modal-image">
   <div class="account-icon-crop-range"></div>
   <button class="close-modal-button"> Close Modal </div>
 `;
  modalContainer.innerHTML = modalMarkdown;

  accountIconCropper = document.querySelector('.account-icon-crop-range');
  accountIconCropper.onmousedown = (e) => toggleProfileDrag(true, e);
  modalContainer.onmouseup = (e) => toggleProfileDrag(false, e);

  modalImage = document.querySelector('#modal-image');

  modalStartPosX = window.innerWidth / 2;
  modalStartPosY = window.innerHeight / 2;

  closeModalButton = document.querySelector('.close-modal-button');

  closeModalButton.onclick = () => closeModal();

  imageScaleInput = document.querySelector('#profile-pic-scale');
  updateScale();

  imageScaleInput.addEventListener('change', (e) => {
    updateScale();
  });

  root.style.setProperty('--image-rel-crop-height', `1`);
  root.style.setProperty('--image-rel-crop-width', `1`);
  root.style.setProperty('--profile-pic-scale', `1`);
}
