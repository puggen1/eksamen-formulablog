import { getData } from "./getData.js";
import {getImage} from "./getImage.js";
import {getTags} from "./getTags.js";
let api = "https://bendik.one/www/eksamenfed/wp-json/wp/v2/posts?per_page=20";
let postSection = document.querySelector("#allPosts");
let html="";
let singlePost = "";
let x = 10;
async function showPosts(url){
    let posts = await getData(url);
    for (let i = 0; i < x; i++){

        if(i < posts.length){
            let ImageArray = await getImage(posts[i].featured_media);
            let postTags = await getTags(posts[i].tags)
            console.log(ImageArray[0], ImageArray[1]);
            singlePost = `<div class="post"><img src="${ImageArray[0]}" alt="${ImageArray[1]}">
            <h3>${posts[i].title.rendered}</h3>
            <p class="dateAndBy">by ${posts[i].author}, on the ${posts[i].date}</p>
            <div class="excerpt">${posts[i].excerpt.rendered}</div>
            <a class="blueA" href="singlepost.html?id=${posts[i].id}">Read More</a>
            <div class="tagDiv">
           ${postTags}
           </div>
            </div>`;
            console.log(postTags);
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

