import {createTag} from "./createTag.js";
import {createDate} from "./createDate.js";
import {showBigImage} from"./getImage.js";
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
    


    postLocation.innerHTML =`<picture><img src="assets/test.png"></picture> ${apiPost.content.rendered} <div class="postInfo"><div class="byDate"><p>By ${apiPost._embedded.author[0].name}</p><p>on ${date}</p></div><div class="tags"> ${tags}</div</div>`

    


    //big images
    let images = document.querySelectorAll("#post img")
    let bottomOfPage = document.querySelector(".bigImgPlace");
    let imgHtml = "";
    let i = 0
    for (let img of images){
        img.classList.add(`img${i}`)
        let imgresponse = showBigImage(img, i);
        imgHtml += imgresponse
        i++
    }
    bottomOfPage.innerHTML =imgHtml;
    //let imgIcon = document.querySelectorAll(".fullScreenImage i");
    let bigPictures = document.querySelectorAll(".fullScreen")
    //reset i for this test
    i = 0;
    for (let i = 0; i < images.length; i++){
        console.log(i, images[i]);
        images[i].addEventListener("click", function (){
            if(bigPictures[i].classList.contains(`img${i}`)){
                bigPictures[i].style.display="flex";
            }
        })
    }
    /*
    for (let icon of imgIcon){
        icon.addEventListener("click", function (){
            for(let img of bigPictures){
                img.style.display="none";
            }
        })
    }*/
    for(let pictureBox of bigPictures){
        pictureBox.addEventListener("click", function(){
            pictureBox.style.display="none";
        })
    }
}
