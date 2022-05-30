//all the imported functions
import { getData } from "./getData.js";
import { showPost } from "./showPost.js";
import { getImage } from "./getImage.js";
import { createTag } from "./createTag.js";
import { createDate } from "./createDate.js";
import { filterTag } from "./filtersAndSort.js";
//getting the tag id from the url, so if people pressed the tag button on index, it will filter after that here the first time.
let url = window.location.search;
let urlParams = new URLSearchParams(url);
let tagId = urlParams.get("tagId");
//api url, tags api is needed because all tags need to show in the filter section
let api =
  "https://bendik.one/www/eksamenfed/wp-json/wp/v2/posts?per_page=20&_embed";
let tagsApi =
  "https://bendik.one/www/eksamenfed/wp-json/wp/v2/tags?per_page=20";

//tagBtns is declared here, so after startfunction is runned, the other function can access it(actieBtn function)
//also all the other things that need to be global
// only small variables
let tagBtns,
  filteredPosts,
  activePosts,
  tags,
  posts,
  x = 10,
  singlePost = "";

//post placement
let postSection = document.querySelector("#allPosts");

//show more button on bottom of page
let showMoreBtn = document.querySelector("#bottom");
showMoreBtn.addEventListener("click", showMore);

//where filter will be:
let filterDiv = document.querySelector(".filter");

async function startFunction() {
  posts = await getData(api);
  //activePosts are being used and changed,, but on show all, posts are again used, but this might do so the call is not made again?
  activePosts = posts;
  /**************************************/
  /**tag buttons fetched and created*****/
  /**************************************/
  tags = await getData(tagsApi);
  let htmlTags = createFilterTags(tags);
  filterDiv.innerHTML += htmlTags;
  /**************************************/

  // add eventlistener to buttons and toggling active
  tagBtns = document.querySelectorAll(".filter button");
  engageButtons(tagBtns);
  checkForTag(tagId);
}
startFunction();

function activeBtn(btn) {
  for (let btns of tagBtns) {
    if (btns == btn) {
      btns.classList.add("active");
    } else {
      btns.classList.remove("active");
    }
  }
}

//filter function

async function filterPost(method, filterId) {
  x = 10;
  if (method == "tag") {
    filteredPosts = posts.filter(filterTag, filterId);
    //so i later can show more without it showing the last filter.
    activePosts = filteredPosts;
  }

  ShowCurrentPosts(activePosts);
}

//diffrent filter functions

//show posts, no matter filter
async function ShowCurrentPosts(postList = posts) {
  let html = "";
  for (let i = 0; i < x; i++) {
    if (i < postList.length) {
      let formatedDate = createDate(posts[i].date);
      let imageTag = await getImage(postList[i]);
      let tags = "";
      for (let tag of postList[i]._embedded["wp:term"][1]) {
        let singleTag = await createTag(tag, "button");
        tags += singleTag;
      }
      singlePost = showPost(postList[i], formatedDate, imageTag, tags, "posts");
      if (postList.length > x) {
        showMoreBtn.style.display = "block";
      }
    } else {
      showMoreBtn.style.display = "none";
      break;
    }
    html += singlePost;
  }
  postSection.innerHTML = html;
  let tagBtnsOnPost = document.querySelectorAll(".post button");
  for (let tag of tagBtnsOnPost) {
    tag.addEventListener("click", function () {
      filterPost("tag", event.target.name);
    });
  }
}
function showMore() {
  //adds 10 so it now will show more posts when show more btn is pressed
  x += 10;
  ShowCurrentPosts(activePosts);
}
function createFilterTags(tags) {
  let htmlTags = "";
  for (let tag of tags) {
    htmlTags += `<button class="tag" id="${tag.id}">${tag.name}</button>`;
  }
  return htmlTags;
}
async function engageButtons(tagBtns) {
  for (let btn of tagBtns) {
    btn.addEventListener("click", function () {
      //when button is pressed, runs activeBtn, a function to make the pressed button active(add class)
      activeBtn(btn);
    });

    //if it is the show all button, it will reset everything. continue so it dont add the other eventlistener(fitlerPost);
    if (btn.classList.contains("all")) {
      btn.addEventListener("click", function () {
        x = 10;
        activePosts = posts;
        ShowCurrentPosts(activePosts);
      });
      continue;
    }

    //filters list based on button id
    btn.addEventListener("click", function () {
      //since x might be bigger cause of show more, it resets when getting other catogories, altough no category had more, it is a function that will be useful if it where.
      x = 10;
      filterPost("tag", event.target.id);
    });
  }
}
async function checkForTag(tagId) {
  if (!tagId) {
    await ShowCurrentPosts(posts);
  } else {
    console.log("tag found");
    await filterPost("tag", tagId);
    activeBtn(document.getElementById(tagId));
  }
}
