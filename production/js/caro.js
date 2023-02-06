const caroImageContainer = document.querySelector('.caro-image-container');
const caroImages = document.querySelectorAll('.caro-image');
let count = -1;
const initCaro = () => {
  if (count + 1 < caroImages.length) {
    count++;
  } else if (count + 1 >= caroImages.length) {
    count = 0;
  }
  caroImages.forEach((image) => {
    image.style.display = 'none';
  });
  caroImages[count].style.display = 'block';
  setTimeout(() => {
    initCaro();
  }, 3000);
};
initCaro();
