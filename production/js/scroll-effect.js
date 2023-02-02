//all js for the item html page
const ReviewStats = {
    scrollArea: document.querySelector(".review-statistics-container"),
    scrollAreaTopPos: 0,
    scrollAreaBottomPos: 0,
    container: document.querySelector(".stat-info-container"),
    containerTopPos: 0,
    containerBottomPos: 0,
    leftPos: 0,
  };
  
  let prevScroll = 0;
  const checkScroll = () => {
    // print "false" if direction is down and "true" if up
    let scrollingUp = prevScroll > window.scrollY;
    prevScroll = window.scrollY;
  
    return scrollingUp;
  };
  ReviewStats.leftPos = ReviewStats.container.offsetLeft;
  let scrollingUp = false;
  document.addEventListener("scroll", () => {
    scrollingUp = checkScroll();
    console.log(scrollingUp);
    //scroll area pos
    ReviewStats.scrollAreaTopPos = ReviewStats.scrollArea.offsetTop;
    ReviewStats.scrollAreaBottomPos =
      ReviewStats.scrollArea.offsetTop + ReviewStats.scrollArea.offsetHeight;
    //review stats pos
    ReviewStats.containerTopPos = ReviewStats.container.offsetTop;
    ReviewStats.containerBottomPos =
      ReviewStats.containerTopPos + ReviewStats.container.offsetHeight;
    let centerWindow = window.scrollY + window.innerHeight / 2;
  
    //work on scrolling up tommorow
    if (
      ReviewStats.scrollAreaTopPos <= centerWindow &&
      ReviewStats.containerTopPos + window.scrollY <=
        ReviewStats.scrollAreaTopPos &&
      ReviewStats.containerBottomPos + window.scrollY <=
        ReviewStats.scrollAreaBottomPos
    ) {
      ReviewStats.container.style.position = "fixed";
      ReviewStats.container.style.top = `${window.innerHeight / 2}px`;
    } else if (
      ReviewStats.containerTopPos + window.scrollY <=
      ReviewStats.scrollAreaTopPos
    ) {
      ReviewStats.container.style.position = "relative";
      ReviewStats.container.style.top = "";
      ReviewStats.scrollArea.style.flexDirection = "column";
  
    } else if (
      ReviewStats.containerBottomPos + window.scrollY >=
        ReviewStats.scrollAreaBottomPos &&
      !scrollingUp
    ) {
      ReviewStats.container.style.position = "relative";
      ReviewStats.container.style.top = "";
      ReviewStats.scrollArea.style.flexDirection = "column-reverse";
    } else if (
      ReviewStats.containerBottomPos + window.scrollY >=
        ReviewStats.scrollAreaBottomPos &&
      scrollingUp
    ) {
      ReviewStats.container.style.position = "fixed";
      ReviewStats.container.style.top = `${window.innerHeight / 2}px`;
    }
  });
  