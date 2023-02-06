function initAccountPage(username) {
  //placeholder
  const userGreetingEle = document.querySelector('.user-greeting');
  let usernameMarkdown = `<h1> Hi, ${username}</h1>`;
  userGreetingEle.insertAdjacentHTML('beforeend', usernameMarkdown);
}
