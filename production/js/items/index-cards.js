let container = document.querySelectorAll('.item-cards');
let purchaseButtons = [];
fetch(housewareURL)
  .then((res) => res.json())
  .then((data) => handleItemData(data))
  .catch((error) => console.log('ERROR', error));

function handleItemData(data) {
  console.log(data);
  let itemCount = 0;

  data.forEach((data) => {
    data.forEach((item) => {
      count++;
      if (count <= 10) {
        let itemCard = createItemCard(item);
        container[0].insertAdjacentHTML('beforeend', itemCard);
      } else if (count <= 20) {
        let itemCard = createItemCard(item);
        container[1].insertAdjacentHTML('beforeend', itemCard);
      }
    });
  });
  initPurchase();
}

function createItemCard(item) {
  let itemVarient = '';
  let itemPattern = '';
  if (item.variant != null) {
    itemVarient = item.variant;
  }
  if (item.pattern != null) {
    itemPattern = item.pattern;
  }
  let itemData = {
    name: `${item.name['name-USen']}`,
    fullName: `${itemVarient} ${itemPattern} ${item.name['name-USen']}`,
    image: item.image_uri,
    buyPrice: Math.floor(item['sell-price'] * 2.3),
    id: item['internal-id'],
  };
  let itemMarkdown = `
    <div class="item-card">
      <a href="./production/assets/pages/item.html">
        <div 
            class="purchase-item-card-container"
            data-image="${itemData.image}" 
            data-name="${itemData.fullName}" 
            data-price="${itemData.buyPrice}"
        >
            <img src="${itemData.image}" loading="lazy">
            <h3>${itemData.fullName}</h3>
        </div>
      </a>
        <div class="purchase-info-container">
            <button
            class="main-button-blue" 
            onclick="addToCart(
                '${itemData.image}'
                ,'${itemData.name}'
                ,'${itemData.fullName}'
                ,'${itemData.buyPrice}'
                ,'${itemData.id}')">
                <i 
                    class="fa-solid fa-cart-shopping"
                    aria-label="purchase"></i>
            </button>
            <div class="card-item-price-container">
                <img
                    src="./production/assets/images/bells-icon.png"
                    alt=""
                    loading="lazy"
                    class="bells-icon"
                />
                <p>${itemData.buyPrice}</p>
            </div>   
        </div>
    </div>`;
  return itemMarkdown;
}

//inits the purchase page with all needed data

function initPurchase() {
  let purchaseButtons = document.querySelectorAll(
    '.purchase-item-card-container'
  );
  purchaseButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
      initItemPage(button);
    });
  });
}

function initItemPage(button) {
  let itemImage = button.getAttribute('data-image');
  let itemName = button.getAttribute('data-name');
  let itemPrice = button.getAttribute('data-price');

  localStorage.setItem('itemImage', `${itemImage}`);
  localStorage.setItem('itemName', itemName);
  localStorage.setItem('itemPrice', itemPrice);
}
