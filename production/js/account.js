const togglePageButton = document.querySelector('.toggle-page-container');
const selectedPageBackground = document.querySelector(
  '.selected-page-background'
);
const togglePage = () => {
  selectedPageBackground.toggleAttribute('data-chats');
};

togglePageButton.onclick = () => togglePage();
