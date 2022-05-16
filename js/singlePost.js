import {createTag} from "./createTag.js";
import {createDate} from "./createDate.js";
let webUrl = window.location.search;
let urlInfo = new URLSearchParams(webUrl);
let postId = urlInfo.get("id");
let postLocation = document.querySelector("#post");
let title = document.querySelector("title");
let header = document.querySelector("h1")
if(!postId){
    window.location.replace("/index.html");
}

let api = `https://www.bendik.one/www/eksamenfed/wp-json/wp/v2/posts/` + postId + "?_embed";

fetch(api)
.then(result => result.json())
.then(formatedResult => showPost(formatedResult));


async function showPost(apiPost){
    let tags = ""
    let singleTag = "";
    if(!apiPost._embedded['wp:term'][1][0]){
            console.log("no tags")
        }
    else{
        for(let tag of apiPost._embedded['wp:term'][1]){
            singleTag = await createTag(tag);
            tags += singleTag;
        }
    }
    let date = createDate(apiPost.date);
    title.innerHTML = apiPost.title.rendered;
    header.innerHTML = apiPost.title.rendered;
    


    postLocation.innerHTML =`<picture>srcsets comes here</picture> ${apiPost.content.rendered} <div class="singlePostInfo"><div class="byDate"><p>By ${apiPost._embedded.author[0].name}</p><p>on ${date}</p></div><div class="tags">${tags}</div</div>`
    
}