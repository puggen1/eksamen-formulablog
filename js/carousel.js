import {getData} from "./getData.js";
import {api} from "./script.js";
import {getImage} from "./getImage.js";
import {createTag} from "./createTag.js";
let CarouselpostPlacement = document.querySelector(".carouselItems");
let currentSlideNumber = 0;
let arrows = document.querySelectorAll(".carouselNavigation i");
let slideButtons = document.querySelectorAll(`.navBtn`);
for (let arrow of arrows){
arrow.addEventListener("click", showSlideFinder);
}
for (let button of slideButtons){
    button.addEventListener("click", function() {
        showCurrentSlide(button.id);
    })
}
export async function carousel(){
    let posts = await getData(api);
    let html = "";
    let post = ""
    let numberOfSlides = 3;
    for(let i = 0; i < numberOfSlides; i++){
        let tags = ""
        for(let tag of posts[i]._embedded['wp:term'][1]){
            let singleTag = await createTag(tag);
            tags += singleTag;
        }
        let imageArray = await getImage(posts[i].featured_media);
        post = `<div class="post carouselItem${i}"><img src="${imageArray[0]}" alt="${imageArray[1]}">
                <h3>${posts[i].title.rendered}</h3>
                <p class="dateAndBy"> ${posts[i].date} by ${posts[i]._embedded.author[0].name} </p>
                <div class="excerpt">${posts[i].excerpt.rendered}</div>
                <a class="blueA" href="singlepost.html?id=${posts[i].id}">Read more</a>
                <div class="tagDiv">
           ${tags}
           </div> </div>`;
                html += post;
            }
            CarouselpostPlacement.innerHTML = html;
            showCurrentSlide(0);
}

function showSlideFinder(){
    console.log(event.target.id);
    if(event.target.id === "previous"){
        if(currentSlideNumber === 0){
            currentSlideNumber = 2;
        }
        else{
            currentSlideNumber -= 1;
        }
    }
    else{
        if(currentSlideNumber === 2){
            currentSlideNumber = 0;
        }
        else{
            currentSlideNumber += 1;
        }
    }
    showCurrentSlide(currentSlideNumber);
}
function showCurrentSlide(slideNumber){
    
    for(let i = 0; i < slideButtons.length; i++){
        if(slideButtons[i].classList.contains("activeNav")){
            slideButtons[i].classList.remove("activeNav");
        }
        if(i === slideNumber){
            slideButtons[i].classList.add("activeNav");
        }
    }
    let currentSlide = document.querySelector(`.carouselItem${slideNumber}`);
    console.log(currentSlide);
    let slides = document.querySelectorAll(".carouselItems .post");
    for(let slide of slides){
        slide.style.display = "none";
    }
        currentSlide.style.display = "block";

}
