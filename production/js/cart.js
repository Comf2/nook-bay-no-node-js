const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'JPY',
});

const cartCountEle = document.querySelector('.cart-item-count');
(function initCart() {
  let cart = localStorage.getItem('cart');
  if (cart === null) return;
  let cartArray = JSON.parse(cart);
  initCartPage(cartArray);
})();
function initCartPage(cartArray) {
  let cartItemContainer = document.querySelector('main');

  let cartItemCount = 0;
  let totalPrice = 0;
  cartArray.forEach((item) => {
    cartItemCount++;
    let itemInfo = JSON.parse(item);
    totalPrice += JSON.parse(itemInfo.price);
    let cartItemMarkdown = getCartItemMarkdown(itemInfo);
    cartItemContainer.insertAdjacentHTML('afterbegin', cartItemMarkdown);
  });
  initCartInfo(cartItemCount, totalPrice);
}
function getCartItemMarkdown(item) {
  let itemMarkdown = `
    <section class="cart-item-container">
    <img
      src= "${item.image}"
      alt="Item Image"
      aria-hidden="true"
      class="cart-product-image"
    />
    <div class="cart-information-container">
      <div class="cart-item-info-container">
        <h2 class="text-blue">${item.fullName}</h2>
        <p class="text-green">Comf1</p>
        <p class="minor-text">Attribute: Natural</p>
        <p class="text-green">${item.price}</p>
      </div>
      <div class="cart-item-actions-container">
        <div>
          <p>Remove</p>
          <p>Send to Storage</p>
        </div>
        <button class="main-button-green">Purchase</button>
      </div>
    </div>
  </section>
    `;
  return itemMarkdown;
}

function initCartInfo(cartItemCount, price) {
  const priceTotal = document.querySelector('.price-total');

  cartCountEle.innerHTML = `
    ${cartItemCount} items in your pocket
  `;
  priceTotal.innerHTML = currencyFormatter.format(price);
}
clearCartButton = document.querySelector('.clear-cart-button');

clearCartButton.onclick = () => clearCart();
function clearCart() {
  localStorage.removeItem('cart');

  window.location.reload();
}
