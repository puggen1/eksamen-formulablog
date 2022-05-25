import {createTag} from "./createTag.js";
import {createDate} from "./createDate.js";
import {getImage, showBigImage} from"./getImage.js";
let webUrl = window.location.search;
let urlInfo = new URLSearchParams(webUrl);
let postId = urlInfo.get("id");
//will find out where you got from, and then the back button will redirect you back there..
let from = urlInfo.get("from")
let urlBack = ""
//i could use only if does not exicst, but i feel this is more clear
if(from == "index" || !from){
    urlBack = "index.html";
}
else{
    urlBack = "posts.html";
}
/*****************************************/
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
    let pictureTag = await getImage(apiPost)
    console.log(pictureTag)
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
    


    postLocation.innerHTML =`${pictureTag} ${apiPost.content.rendered} <div class="postInfo"><div class="byDate"><p>By ${apiPost._embedded.author[0].name}</p><p>on ${date}</p></div><div class="tags"> ${tags}</div> </div><a class="backBtn" href="${urlBack}">Back</a>`
    let preface = document.querySelector("#post p");
    preface.id = "preface"
        //big images
    let images = document.querySelectorAll("#post img");
    let bottomOfPage = document.querySelector(".bigImgPlace");
    let imgHtml = "";
    let i = 0
    for (let img of images){
        img.classList.add(`img${i}`)
        let imgresponse = showBigImage(images, i);
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
     let bigPictureTag = document.querySelectorAll(".fullScreen picture");
    for(let pictureBox of bigPictures){
        pictureBox.addEventListener("click", function(){
            //this if statement will check if you are pressing the img, if you are, it will not hide the image
            if(event.target.nodeName == "DIV" || event.target.nodeName == "I"){
                pictureBox.style.display="none";
                console.log(event.target.nodeName);
            }
        })
    }
}
