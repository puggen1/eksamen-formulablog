import { getData } from "./getData.js";
import {getImage} from "./getImage.js";
import {createTag} from "./createTag.js";
import {getDate} from "./createDate.js";
let api = "https://bendik.one/www/eksamenfed/wp-json/wp/v2/posts?per_page=20&_embed";
let postSection = document.querySelector("#allPosts");
let html="";
let singlePost = "";
let x = 10;
async function showPosts(url){
    let posts = await getData(url);
    for (let i = 0; i < x; i++){

        if(i < posts.length){
            let ImageArray = await getImage(posts[i].featured_media);
            let tags = "";
            for(let tag of posts[i]._embedded['wp:term'][1]){
                let singleTag = await createTag(tag);
                tags += singleTag;
            }
            singlePost = `<div class="post"><img src="${ImageArray[0]}" alt="${ImageArray[1]}">
            <h3>${posts[i].title.rendered}</h3>
            <p class="dateAndBy">by ${posts[i]._embedded.author[0].name}, on the ${posts[i].date}</p>
            <div class="excerpt">${posts[i].excerpt.rendered}</div>
            <a class="blueA" href="singlepost.html?id=${posts[i].id}">Read More</a>
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
    postSection.innerHTML =html;
    x += 10
}


showPosts(api);

