let cart = [];
const addToCart = (image, name, fullName, price, id) => {
  let itemObject = {
    image: image,
    name: name,
    fullName: fullName,
    price: price,
    id: id,
  };
  let item = JSON.stringify(itemObject);
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  initCartCallToAction();
};

function initCartCallToAction() {
  let cart = localStorage.getItem('cart');
  console.log(cart.length);
  if (typeof cart === 'string' && cart.length > 0) {
    console.log(localStorage.getItem('cart'));
    let cartCallToAction = document.querySelector('.cart-to-action-container');
    cartCallToAction.style.display = 'block';
  }
}
initCartCallToAction();
