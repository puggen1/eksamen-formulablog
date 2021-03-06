import { createTag } from "./createTag.js";
import { getData } from "./getData.js";
import { createDate } from "./createDate.js";
import { getImage, showBigImage } from "./getImage.js";
let webUrl = window.location.search;
let urlInfo = new URLSearchParams(webUrl);
let postId = urlInfo.get("id");
//will find out where you got from, and then the back button will redirect you back there..
let from = urlInfo.get("from");
let urlBack = "";
//i could use only if does not exicst, but i feel this is more clear
if (from == "index" || !from) {
  urlBack = "index.html";
} else {
  urlBack = "posts.html";
}
/*****************************************/
let postLocation = document.querySelector("#post");
let title = document.querySelector("title");
let header = document.querySelector("h1");
let metaDesc = document.querySelector(`meta[name="description"]`);
let bigPictures;
let imgHtml = "";
let images;
if (!postId) {
  window.location.replace("/index.html");
}

let api =
  `https://www.bendik.one/www/eksamenfed/wp-json/wp/v2/posts/` +
  postId +
  "?_embed";
async function showPost(api) {
  let apiPost = await getData(api);
  let tags = "";
  let singleTag = "";

  let pictureTag = await getImage(apiPost);
  if (!apiPost._embedded["wp:term"][1][0]) {
  } else {
    for (let tag of apiPost._embedded["wp:term"][1]) {
      singleTag = await createTag(tag);
      tags += singleTag;
    }
  }
  let date = createDate(apiPost.date);
  title.innerHTML = apiPost.title.rendered;
  header.innerHTML = apiPost.title.rendered;
  //ads meta description
  metaDesc.content = apiPost.excerpt.rendered.slice(3, -5);

  postLocation.innerHTML = `${pictureTag} 
   ${apiPost.content.rendered} 
   <div class="postInfo"><div class="byDate">
   <p>By ${apiPost._embedded.author[0].name}</p>
   <p>on ${date}</p></div>
   <div class="tags"> ${tags}</div>
    </div>
    <a class="backBtn" href="${urlBack}">Back</a>`;
  //remove the fillerpost class that have loading animation
  postLocation.classList.remove("fillerPost");
  //making the first p preface, and adds style/id to it.
  let preface = document.querySelector("#post p");
  preface.id = "preface";

  //i have to choose the images.
  images = document.querySelectorAll("#post img");

  //the location i want the "hidden images" to be
  let bottomOfPage = document.querySelector(".bigImgPlace");

  //this for loop does many things: adds icon for big picture mode, also add class to images,
  for (let i = 0; i < images.length; i++) {
    //adds icon under image
    images[i].insertAdjacentHTML(
      "afterend",
      `<div class="img${i}"><i class="fas fa-expand"></i><p> click the image to make bigger</p></div>`
    );
    images[i].classList.add(`img${i}`);

    //gets the content that will go in hidden images
    let imgresponse = showBigImage(images, i);
    imgHtml += imgresponse;

    //gets the icon that was added below images.
    let fullScreenIcon = document.querySelector(`div.img${i} i`);
    //under here is a bit repetetive, but it ads  eventlistener to the images and the icons so they trigger the imgEvent function that shows the big picture

    fullScreenIcon.addEventListener("click", function () {
      imgEvent(i);
    });
    images[i].addEventListener("click", function () {
      imgEvent(i);
    });
  }
  //
  bottomOfPage.innerHTML = imgHtml;

  //adds the "go back function to all big pitures"
  bigPictures = document.querySelectorAll(".fullScreen");

  for (let pictureBox of bigPictures) {
    pictureBox.addEventListener("click", function () {
      //this if statement will check if you are pressing the img, if you are, it will not hide the image
      if (event.target.nodeName == "DIV" || event.target.nodeName == "I") {
        pictureBox.style.display = "none";
      }
    });
  }
}
//runs the whole function to show the page and images
showPost(api);

function imgEvent(number) {
  //hotfix to so current src is always used
  let targetImg = document.querySelector(`.img${number} picture img`);
  //due to me using currentsrc for the big pictures in the modal, if you open the page and everything loads without you being on it, in example: open in new tab, the current src will be none.
  if (images[number].currentSrc !== targetImg.currentSrc) {
    targetImg.src = images[number].currentSrc;
  }
  bigPictures[number].style.display = "flex";
}
