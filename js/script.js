console.log("hello from script.js");
import {getData} from "./getData.js";
import {getImage} from "./getImage.js";
import {createTag} from "./createTag.js";
import {carousel} from "./carousel.js";
let featuredPosts = document.querySelector("#mainPagePosts");
export let api = "https://www.bendik.one/www/eksamenfed/wp-json/wp/v2/posts?_embed";
let featuredMediaLibrary = "https://www.bendik.one/www/eksamenfed/wp-json/wp/v2/media/";



//function to get data from wordpress, it is universal so can be used to get our media as well

//not universal yet, will look into it later
async function showData(data){
    let result = await getData(data)
    let html = "";
    let post = "";
    for(let posts of result){
        let tags = ""
        for(let tag of posts._embedded['wp:term'][1]){
            let singleTag = await createTag(tag);
            tags += singleTag;
        }
        let imageArray = await getImage(posts.featured_media);
        post = `<div class="post"><img src="${imageArray[0]}" alt="${imageArray[1]}">
                <h3>${posts.title.rendered}</h3>
                <p class="dateAndBy"> ${posts.date} by ${posts._embedded.author[0].name} </p>
                <div class="excerpt">${posts.excerpt.rendered}</div>
                <a class="blueA" href="singlepost.html?id=${posts.id}">Read more</a>
                <div class="tagDiv">
           ${tags}
           </div> </div>`;
                html += post;
            }
            featuredPosts.innerHTML = html;
}

//call the global show funciton
showData(api);
carousel();

// navigation mobile

let navBarIcon = document.querySelector("#header i");
let navBar = document.querySelector("#nav")
navBarIcon.addEventListener("click", toggleNavIcon);

function toggleNavIcon(){
    if(navBarIcon.classList.contains("fa-bars")){
        navBarIcon.classList.remove("fa-bars");
        navBarIcon.classList.add("fa-times")
    }
    else{
        navBarIcon.classList.add("fa-bars");
        navBarIcon.classList.remove("fa-times")
    }
    toggleNav();
}
function toggleNav(){
    if(!navBar.classList.contains("show")){
        navBar.style.display = "grid";
    }
    else{
        navBar.style.display = "none";
    }
        navBar.classList.toggle("show")
    }