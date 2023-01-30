const housewareURL = 'http://acnhapi.com/v1a/houseware/';
let container = document.querySelector('.item-cards');
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
        createItemCard(item);
      }
    });
  });
  //   init purchase will be here
}

function createItemCard(item) {
  let itemVarient = '';
  if (item.variant != null) {
    itemVarient = item.variant;
  }
  let itemData = {
    name: `${item.name['name-USen']}`,
    fullName: `${itemVarient} ${item.name['name-USen']}`,
    image: item.image_uri,
    buyPrice: Math.floor(item['sell-price'] * 2.3),
    id: item['internal-id'],
  };
  let itemMarkdown = `
    <div class="item-card">
        <img src="${itemData.image}" loading="lazy">
        <h3>${itemData.fullName}</h3>
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
  container.insertAdjacentHTML('beforeend', itemMarkdown);
}
