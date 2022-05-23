import {getData} from "./getData.js";
import {getImage} from "./getImage.js";
import {createTag} from "./createTag.js";
import {createDate} from "./createDate.js";
let CarouselpostPlacement = document.querySelector(".carouselItems");
let currentSlideNumber = 0;
let arrows = document.querySelectorAll(".carouselNavigation i");
let slideButtons = document.querySelectorAll(`.navBtn`);
export async function carousel(posts){
    for (let arrow of arrows){
        arrow.addEventListener("click", showSlideFinder);
        }
        for (let button of slideButtons){
            button.addEventListener("click", showSlideFinder);
        }
    let html = "";
    let post = ""
    let numberOfSlides = 3;
    for(let i = 0; i < numberOfSlides; i++){
        let FormatedDate = createDate(posts[i].date)
        let tags = ""
        for(let tag of posts[i]._embedded['wp:term'][1]){
            let singleTag = await createTag(tag);
            tags += singleTag;
        }
        let pictureTag = await getImage(posts[i]);
        post = `<div class="post carouselItem${i}">${pictureTag}
                <h3>${posts[i].title.rendered}</h3>
                <p class="dateAndBy"> ${FormatedDate} by ${posts[i]._embedded.author[0].name} </p>
                <div class="excerpt">${posts[i].excerpt.rendered.slice(0, 100)} <p> []</p></div>
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
    else if(event.target.id ==="next"){
        if(currentSlideNumber === 2){
            currentSlideNumber = 0;
        }
        else{
            currentSlideNumber += 1;
        }
    }
    else{
        currentSlideNumber = event.target.id;
    }
    showCurrentSlide(currentSlideNumber);
}
function showCurrentSlide(slideNumber){
    
    for(let i = 0; i < slideButtons.length; i++){
        if(slideButtons[i].classList.contains("activeNav")){
            slideButtons[i].classList.remove("activeNav");
        }
        if(i == slideNumber){
            slideButtons[i].classList.add("activeNav");
        }
    }
    let currentSlide = document.querySelector(`.carouselItem${slideNumber}`);
    console.log(currentSlide);
    let slides = document.querySelectorAll(".carouselItems .post");
    for(let slide of slides){
        slide.style.display = "none";
    }
        currentSlide.style.display = "grid";

}
