const itemName = localStorage.getItem('itemName');
const itemImage = localStorage.getItem('itemImage');
const itemPrice = localStorage.getItem('itemPrice');

const container = document.querySelector('.container');

//dynamic elements
const itemImageEles = document.querySelectorAll('.item-image');
const itemNameEles = document.querySelectorAll('.item-name');
const itemPriceEles = document.querySelectorAll('.item-price');
const addToCartButton = document.querySelectorAll('.add-to-cart-button');
//TODO:add bell icon to item page

(function initPurchasePage() {
  itemImageEles.forEach(function (img) {
    img.src = itemImage;
  });
  itemNameEles.forEach(function (img) {
    img.innerHTML = itemName;
  });

  itemPriceEles.forEach(function (img) {
    img.innerHTML = itemPrice;
  });
  addToCartButton.forEach((button) => {
    button.onclick = () => addToCart(itemImage, 'name', itemName, itemPrice, 0);
  });
})();
