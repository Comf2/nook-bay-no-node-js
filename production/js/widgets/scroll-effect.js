//makes a scroll effect where an element will be fixed but only
//within its parrent container
//will turn off fixed after
//only works with accomponying css
//!!---ALL CSS CLASSES WILL BE !IMPORTANT WITHIN SCROLLEFFECT.CSS --!//
let scrollEle = {};
function initScrollEffect(parent, child) {
  scrollEle = {
    scrollArea: parent,
    scrollAreaTopPos: 0,
    scrollAreaBottomPos: 0,
    container: child,
    containerTopPos: 0,
    containerBottomPos: 0,
    leftPos: 0,
  };
  scrollEle.leftPos = scrollEle.container.offsetLeft;

  document.addEventListener("scroll", () => {
    scrollEffect();
  });
}

let prevScroll = 0;

const checkScroll = () => {
  // print "false" if direction is down and "true" if up
  let scrollingUp = prevScroll > window.scrollY;
  prevScroll = window.scrollY;

  return scrollingUp;
};

let scrollingUp = false;
function scrollEffect() {
  scrollingUp = checkScroll();
  InitScrollEffectVars();
  let centerWindow = window.scrollY + window.innerHeight / 2;

  //if it is within the parent, make it fixed
  if (
    scrollEle.scrollAreaTopPos <= centerWindow &&
    scrollEle.containerTopPos + window.scrollY <= scrollEle.scrollAreaTopPos &&
    scrollEle.containerBottomPos + window.scrollY <=
      scrollEle.scrollAreaBottomPos
  ) {
    scrollEle.container.style.position = "fixed";
    scrollEle.container.style.top = `${window.innerHeight / 2}px `;
  }
  //if container is above the parent, turn off fixed
  else if (
    scrollEle.containerTopPos + window.scrollY <=
    scrollEle.scrollAreaTopPos
  ) {
    scrollEle.container.style.position = "relative";
    scrollEle.container.style.top = "";
    scrollEle.scrollArea.style.flexDirection = "column";
  }
  //if container is below the parent and your scrolling down, turn off fixed
  else if (
    scrollEle.containerBottomPos + window.scrollY >=
      scrollEle.scrollAreaBottomPos &&
    !scrollingUp
  ) {
    scrollEle.container.style.position = "relative";
    scrollEle.container.style.top = "";
    scrollEle.scrollArea.style.flexDirection = "column-reverse";
  }
  //if container is below the parent and your scrolling up, turn on fixed
  else if (
    scrollEle.containerBottomPos + window.scrollY >=
      scrollEle.scrollAreaBottomPos &&
    scrollingUp
  ) {
    scrollEle.container.style.position = "fixed";
    scrollEle.container.style.top = `${window.innerHeight / 2}px`;
  }
}
function InitScrollEffectVars() {
  //parent pos
  scrollEle.scrollAreaTopPos = scrollEle.scrollArea.offsetTop;
  scrollEle.scrollAreaBottomPos =
    scrollEle.scrollArea.offsetTop + scrollEle.scrollArea.offsetHeight;
  //child pos
  scrollEle.containerTopPos = scrollEle.container.offsetTop;
  scrollEle.containerBottomPos =
    scrollEle.containerTopPos + scrollEle.container.offsetHeight;
}
