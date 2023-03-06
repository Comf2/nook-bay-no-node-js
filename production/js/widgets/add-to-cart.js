let cart = [];
function initCart() {
  const lsCart = localStorage.getItem('cart');
  if (lsCart === null) return;
  let cartArr = JSON.parse(lsCart);
  cart.push(...cartArr);
  console.log(cart);
}
initCart();
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
  if (cart === null) return;
  if (typeof cart === 'string' && cart.length > 0) {
    let cartCallToAction = document.querySelector('.cart-to-action-container');
    cartCallToAction.style.display = 'block';
  }
}
initCartCallToAction();
