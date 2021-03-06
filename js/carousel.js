import { showPost } from "./showPost.js";
import { getImage } from "./getImage.js";
import { createTag } from "./createTag.js";
import { createDate } from "./createDate.js";
const carouselpostPlacement = document.querySelector(".carouselItems");
let currentSlideNumber = 0;
const arrows = document.querySelectorAll(".carouselNavigation i");
const slideButtons = document.querySelectorAll(`.navBtn`);
export async function carousel(posts) {
  for (let arrow of arrows) {
    arrow.addEventListener("click", showSlideFinder);
  }
  for (let button of slideButtons) {
    button.addEventListener("click", showSlideFinder);
  }
  let html = "";
  let post = "";
  //i only want 3 slides,
  const numberOfSlides = 3;
  for (let i = 0; i < numberOfSlides; i++) {
    let FormatedDate = createDate(posts[i].date);
    let tags = "";
    for (let tag of posts[i]._embedded["wp:term"][1]) {
      let singleTag = await createTag(tag);
      tags += singleTag;
    }
    let pictureTag = await getImage(posts[i]);
    post = showPost(
      posts[i],
      FormatedDate,
      pictureTag,
      tags,
      "index",
      `carouselItem${i}`
    );
    html += post;
  }
  carouselpostPlacement.innerHTML = html;

  showCurrentSlide(currentSlideNumber);
}

function showSlideFinder() {
  //some hardcode that only works for when it is 3 slides, so it changes currentslidenumber from 0 to 2 etc
  if (event.target.id == "previous") {
    if (currentSlideNumber == 0) {
      currentSlideNumber = 2;
    } else {
      currentSlideNumber -= 1;
    }
  } else if (event.target.id == "next") {
    if (currentSlideNumber == 2) {
      currentSlideNumber = 0;
    } else {
      currentSlideNumber += 1;
    }
  } else {
    currentSlideNumber = event.target.id;
  }
  showCurrentSlide(currentSlideNumber);
}
function showCurrentSlide(slideNumber) {
  for (let i = 0; i < slideButtons.length; i++) {
    if (slideButtons[i].classList.contains("activeNav")) {
      slideButtons[i].classList.remove("activeNav");
    }
    if (i == slideNumber) {
      slideButtons[i].classList.add("activeNav");
    }
  }
  //the carosuelItem with a class including the slideNumber will be shown
  let currentSlide = document.querySelector(`.carouselItem${slideNumber}`);
  let slides = document.querySelectorAll(".carouselItems .post");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  //this if changes how many posts is shown in carousel, please note that this means it only checks this when the page is loaded and will not work if screen size is changed after page is loaded, this will for the most part not be a problem
  if (window.innerWidth >= 1000) {
    currentSlide.style.display = "grid";
    if (slideNumber == 2) {
      console.log("denn skal kj??re");
      //i dont know if this is a bad way to do it, but it works.
      // when on last slide bigger screens, the first slide will be on the right, so it goes in circles
      currentSlide.style.gridColumn = "1/2";
      currentSlide.style.gridRow = "1/2";
      console.log(slideNumber);
      slideNumber = 0;
    } else {
      document.querySelector(`.carouselItem2`).style.gridColumn = "2/3";
      slideNumber++;
    }
    //on bigger screens this will show the second slide
    currentSlide = document.querySelector(`.carouselItem${slideNumber}`);
    currentSlide.style.display = "grid";
  }
  //for all sizes, shows the current slide
  currentSlide.style.display = "grid";
}
