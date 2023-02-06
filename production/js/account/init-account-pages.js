//set of functions that are called depending on the page,
//changes page content based on if your signed in

//called on every page
function initNavbar() {
  const signedOutNavEle = document.querySelectorAll('.signed-out-nav-ele');
  const dropdownMarkdown = `
    <li onclick="window.location = './production/assets/pages/account.html'">
      <i class="fa-solid fa-user"></i>
      <p>Account</p>
    </li>
  `;
  signedOutNavEle.forEach((ele) => {
    ele.remove();
  });
  const dropdown = document.querySelector('.account-dropdown ul');
  dropdown.insertAdjacentHTML('beforebegin', dropdownMarkdown);
}

function initAccountPage(username) {
  //placeholder
  const userGreetingEle = document.querySelector('.user-greeting');
  let usernameMarkdown = `<h1> Hi, ${username}</h1>`;
  userGreetingEle.insertAdjacentHTML('beforeend', usernameMarkdown);
}
