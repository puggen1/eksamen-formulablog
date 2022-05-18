import { getData } from "./getData.js";
import {getImage} from "./getImage.js";
import {createTag} from "./createTag.js";
import {createDate} from "./createDate.js";
let url = window.location.search;
let urlParams = new URLSearchParams(url);
let tagId = urlParams.get("tagId");
let api = "https://bendik.one/www/eksamenfed/wp-json/wp/v2/posts?per_page=20&_embed";
let posts = [];
let filteredPosts = [];
//fetching all posts
posts = await getData(api);
//post placement
let postSection = document.querySelector("#allPosts");
let html="";
let singlePost = "";
let x = 10;
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
        filteredPosts = posts.filter(filterTag, tagId)
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
            else{
                return false
            }
        }
    }
//show posts, no matter filter
    async function showPosts(postList){
        for (let i = 0; i < x; i++){
            if(i < postList.length){
                let formatedDate = createDate(posts[i].date)
                let ImageArray = await getImage(postList[i].featured_media);
                let tags = "";
                for(let tag of postList[i]._embedded['wp:term'][1]){
                    let singleTag = await createTag(tag);
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
                break
            }
            html += singlePost;
        }
        postSection.innerHTML = html;
        x += 10;
       
    }