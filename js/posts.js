import { getData } from "./getData.js";
import {getImage} from "./getImage.js";
import {createTag} from "./createTag.js";
import {createDate} from "./createDate.js";
let url = window.location.search;
let urlParams = new URLSearchParams(url);
let tagId = urlParams.get("tagId");
let api = "https://bendik.one/www/eksamenfed/wp-json/wp/v2/posts?per_page=20&_embed";
let tagsApi = "https://bendik.one/www/eksamenfed/wp-json/wp/v2/tags?per_page=20";
//number of posts showing up at start
let posts = [];
let tags = [];
let filteredPosts;
let activePosts = [];
//fetching all posts
//tags for filters
//test function to check if i need to fetch data inside a function to make it global and not fetch more than one

//post placement
let postSection = document.querySelector("#allPosts");
let singlePost = "";
let x = 10;
let showMoreBtn = document.querySelector("#bottom");
showMoreBtn.addEventListener("click", showMore)

async function startFunction(){
    posts = await getData(api);
    activePosts = posts
    tags = await getData(tagsApi);
    console.log(posts, tags)
    if(!tagId){
        console.log("no tags");
        await showPosts(posts);
    }
    else{
        await filterPost("tag", tagId);
    }
    //tag buttons created
    let filterDiv = document.querySelector(".filter");
    let htmlTags = ""
    for(let tag of tags){
        htmlTags += `<button class="tag" id="${tag.id}">${tag.name}</button>`;
    }
    filterDiv.innerHTML += htmlTags;
    // add eventlistener to buttons and toggling active
    let tagBtns = document.querySelectorAll(".filter button");
    for(let btn of tagBtns){
        btn.addEventListener("click", function(){
            activeBtn(btn)
        })
        if(btn.classList.contains("all")){
            btn.addEventListener("click", function(){
                x = 10
                activePosts = posts
                showPosts(activePosts);
            })
            continue;
        }
        btn.addEventListener("click", function (){
            x = 10
        filterPost("tag", event.target.id);

        })
}

function activeBtn(btn){
    for(let btns of tagBtns){
        if(btns == btn){
            btns.classList.add("active");
        }
        else{
            btns.classList.remove("active");
        }
    }
}
}
startFunction();



//filter function

async function filterPost(method, filterId){
    x = 10
    if(method == "tag"){
        filteredPosts =  posts.filter(filterTag, filterId)
        //so i later can show more without it showing the last filter.
        activePosts = filteredPosts;
        console.log(activePosts)
        }
    else{
        console.log("placeholder");
    }

    showPosts(activePosts);
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
        console.log(x)
        let html = ""
        for (let i = 0; i < x; i++){
            if(i < postList.length){
                let formatedDate = createDate(posts[i].date)
                let imageTag = await getImage(postList[i]);
                let tags = "";
                for(let tag of postList[i]._embedded['wp:term'][1]){
                    let singleTag = await createTag(tag, "button");
                    tags += singleTag;
                }
                singlePost = `<div class="post">${imageTag}
                <a href="singlepost.html?id=${postList[i].id}" class="h3Link"><h3>${postList[i].title.rendered}</h3></a>
                <p class="dateAndBy">by ${postList[i]._embedded.author[0].name}, on ${formatedDate}</p>
                <div class="excerpt">${postList[i].excerpt.rendered}</div>
                <a class="blueA" href="singlepost.html?id=${postList[i].id}&from=posts"">Read More</a>
                <div class="tagDiv">
               ${tags}
               </div>
                </div>`;
                if(postList.length > x){
                    showMoreBtn.style.display ="block";

                }
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
    }
function showMore(){
    //plus 7(later 10?) so it will show more posts
    x += 10;
    console.log(activePosts)
    showPosts(activePosts)
}
