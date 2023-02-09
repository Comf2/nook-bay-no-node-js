(function initCart() {
  let cart = localStorage.getItem('cart');
  if (cart == '') return;
  let cartArray = JSON.parse(cart);

  cartArray.forEach((item) => {
    console.log(JSON.parse(item));
  });
  initCartPage(cartArray);
})();
function initCartPage(cartArray) {
  let cartItemContainer = document.querySelector('main');

  cartArray.forEach((item) => {
    let itemInfo = JSON.parse(item);
    let cartItemMarkdown = getCartItemMarkdown(itemInfo);
    cartItemContainer.insertAdjacentHTML('afterbegin', cartItemMarkdown);
  });
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

clearCartButton = document.querySelector('.clear-cart-button');

clearCartButton.onclick = () => clearCart();
function clearCart() {
  localStorage.setItem('cart', '');
  console.log('running');

  window.location.reload();
}
