import { getData } from "./getData.js";
import {getImage} from "./getImage.js";
import {createTag} from "./createTag.js";
import {createDate} from "./createDate.js";
let url = window.location.search;
let urlParams = new URLSearchParams(url);
let tagId = urlParams.get("tagId");
let api = "https://bendik.one/www/eksamenfed/wp-json/wp/v2/posts?per_page=20&_embed";
let tagsApi = "https://bendik.one/www/eksamenfed/wp-json/wp/v2/tags?per_page=20";

let posts = [];
let tags = [];
let filteredPosts;
//fetching all posts
posts = await getData(api);
//tags for filters
tags = await getData(tagsApi);
//post placement
let postSection = document.querySelector("#allPosts");
let singlePost = "";
let x = 7;
let showMoreBtn = document.querySelector("#bottom");
showMoreBtn.addEventListener("click", showMore)
if(!tagId){
    console.log("no tags");
    showPosts(posts);
}
else{
   filterPost("tag", tagId);
}



//filter function

function filterPost(method, filterId){
    if(method == "tag"){
        filteredPosts = posts.filter(filterTag, filterId)
        console.log(filteredPosts)
        }
    else{
        console.log("placeholder");
    }

    showPosts(filteredPosts);
}

//diffrent filter functions

function filterTag(event){
    for(let tag of event.tags){
        if(this == tag){
            console.log(event.tags + "inneholder taggen")
            return true
    
        }
    }
}


//show posts, no matter filter
    async function showPosts(postList=posts){
        let html = ""
        for (let i = 0; i < x; i++){
            if(i < postList.length){
                let formatedDate = createDate(posts[i].date)
                let ImageArray = await getImage(postList[i].featured_media);
                let tags = "";
                for(let tag of postList[i]._embedded['wp:term'][1]){
                    let singleTag = await createTag(tag, "button");
                    tags += singleTag;
                }
                singlePost = `<div class="post"><img src="${ImageArray[0]}" alt="${ImageArray[1]}">
                <h3>${postList[i].title.rendered}</h3>
                <p class="dateAndBy">by ${postList[i]._embedded.author[0].name}, on the ${formatedDate}</p>
                <div class="excerpt">${postList[i].excerpt.rendered}</div>
                <a class="blueA" href="singlepost.html?id=${postList[i].id}">Read More</a>
                <div class="tagDiv">
               ${tags}
               </div>
                </div>`;
            }
            else{
                showMoreBtn.style.display ="none";
                break
            }
            html += singlePost;
        }
        postSection.innerHTML = html;
        let tagBtnsOnPost = document.querySelectorAll(".post button");
        for(let tag of tagBtnsOnPost){
            tag.addEventListener("click",function (){
                filterPost("tag", event.target.id);
            });
        }
        x += 7;
       
    }
function showMore(){
    if(filteredPosts){
        console.log("ja")
        console.log(filteredPosts)
        showPosts(filteredPosts)
    }
    else{
        showPosts(posts);
    }
    /*if(x >= posts.length){
        showMoreBtn.style.display ="none";
    }*/
}



//tag buttons
let filterDiv = document.querySelector(".filter");
let htmlTags = ""

for(let tag of tags){
    htmlTags += `<button class="tag" id="${tag.id}">${tag.name}</button>`;
}
filterDiv.innerHTML += htmlTags;
let tagBtns = document.querySelectorAll(".filter button");
for(let btn of tagBtns){
    btn.addEventListener("click", function(){
        for(let btns of tagBtns){
            if(btns == btn){
                btns.classList.add("active");
            }
            else{
                btns.classList.remove("active");
            }
        }
    })
    if(btn.classList.contains("all")){
        btn.addEventListener("click", function(){
            showPosts(posts);
        })
        continue;
    }
    console.log(btn)
    btn.addEventListener("click", function (){
    filterPost("tag", event.target.id);

    })
}
