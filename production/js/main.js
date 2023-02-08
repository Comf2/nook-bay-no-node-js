//TODO:
//add searchbar to nav
//if signed in edit the mobile nav
//fix the modal crop styles for mobile
const housewareURL = 'https://acnhapi.com/v1a/houseware/';

//-----mobile navbar toggle-----//
const toggleNavButton = document.querySelector('.toggle-nav-button');
const navBar = document.querySelector('.nav-bar');
const navList = document.querySelector('.nav-list');
let navOpen = false;

const desktopBreakPoint = 900;

//when button is clicked toggle the nav bar
toggleNavButton.addEventListener('click', (e) => {
  toggleNav();
});

//toggles what to do based on if navbar is open or closed
const toggleNav = () => {
  navOpen = !navOpen;
  if (navOpen) {
    toggleNavButton.setAttribute('data-state', 'opened');
    toggleNavButton.setAttribute('aria-expanded', 'true');

    openNav();
  } else if (!navOpen) {
    toggleNavButton.setAttribute('data-state', 'closed');
    toggleNavButton.setAttribute('aria-expanded', 'false');

    closeNav();
  }
};

//styles nav bar to be open when its toggled
const openNav = () => {
  navBar.style.width = '75vw';
  navList.style.display = 'grid';
  setTimeout(() => {
    navList.style.opacity = '1';
  }, 500);
};

//styles nav bar to be closed when its toggled
const closeNav = () => {
  navBar.style.width = '0';
  navList.style.opacity = '0';
  setTimeout(() => {
    navList.style.display = 'none';
  }, 300);
};

window.addEventListener('resize', function (e) {
  if (window.innerWidth >= desktopBreakPoint) {
    navBar.style = '';
    navList.style = '';
  } else if (window.innerWidth <= desktopBreakPoint) {
    navOpen = true;
    toggleNav();
  }
});
//---account Dropdown for navabr---//

const accountIcon = document.querySelector('#account-icon');
const accountDropdown = document.querySelector('.account-dropdown');

let dropdownOpen = false;

accountIcon.onclick = () => toggleDropdown();

const toggleDropdown = () => {
  dropdownOpen = !dropdownOpen;
  if (dropdownOpen) openDropdown();
  else if (!dropdownOpen) closeDropdown();
};

const openDropdown = () => {
  accountDropdown.setAttribute('data-open', 'true');
  accountDropdown.style.display = 'block';
};
const closeDropdown = () => {
  accountDropdown.setAttribute('data-open', 'false');
  setTimeout(() => {
    accountDropdown.style.display = 'none';
  }, 300);
};

//dark and light mode
const lightModeToggleButton = document.querySelectorAll('.toggle-light-mode');

//color schemes

//dark
const mainDark = '#121212';
const secondaryDark = '#1f1f1f';
const mainDarkText = '#dadada';
const secondaryDarkText = '#bdbdbd';

//light
const mainLight = '#FFFFFA';
const secondaryLight = '#ECECEC';
const mainLightText = '#313131';
const secondaryLightText = '#bdbdbd';

const root = document.querySelector(':root');

lightModeToggleButton.forEach(function (button) {
  button.onclick = () => toggleLightMode();
});

const setLightMode = (darkmode) => {
  const darkLogos = document.querySelectorAll('.logo-dark-switch');

  darkLogos.forEach((logo) => {
    logo.src = '../svg/nook-bay-light.svg';
  });
  if (darkmode) {
    root.style.setProperty('--main-bg', mainDark);
    root.style.setProperty('--secondary-bg', secondaryDark);
    root.style.setProperty('--main-text', mainDarkText);
    root.style.setProperty('--secondary-text', secondaryDarkText);

    darkLogos.forEach((logo) => {
      logo.src = '../svg/nook-bay-light.svg';
    });

    window.localStorage.setItem('darkMode', true);
  } else if (!darkmode) {
    root.style.setProperty('--main-bg', mainLight);
    root.style.setProperty('--secondary-bg', secondaryLight);
    root.style.setProperty('--main-text', mainLightText);
    root.style.setProperty('--secondary-text', secondaryLightText);

    darkLogos.forEach((logo) => {
      logo.src = '../svg/NookBay.svg';
    });

    window.localStorage.setItem('darkMode', false);
  }
  setDarkmodeCookie();
};

const toggleLightMode = () => {
  let isDarkMode = window.localStorage.getItem('darkMode');
  let darkMode = isDarkMode === 'false';
  setLightMode(darkMode);
};

const getDarkMode = () => {
  const isDarkMode = document.cookie
    .split('; ')
    .find((row) => row.startsWith('darkmode='))
    ?.split('=')[1];
  console.log(isDarkMode);

  let darkMode = isDarkMode === 'true';
  setLightMode(darkMode);
};
getDarkMode();
//---**--Saving Darkmode To Cookies ---**--//

//running on load
(function getDarkMode() {})();
function setDarkmodeCookie() {
  let isDarkmode = localStorage.getItem('darkMode');
  document.cookie = `darkmode=${isDarkmode};`;
}

function deleteAllCookies() {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}
