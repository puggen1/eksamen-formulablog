
import {getData} from "./getData.js";
let mediaLibrary = "https://bendik.one/www/eksamenfed/wp-json/wp/v2/media/";

export async function getImage(featuredImageId){
    if(featuredImageId){
        let mediaLocation = mediaLibrary + featuredImageId;
        let mediaResult = await getData(mediaLocation);
        let featuredMedia = mediaResult.source_url;
        let featuredMediaAlt = mediaResult.alt_text
        return [featuredMedia, featuredMediaAlt];
    }
    else{
        let featuredMedia = "./assets/test.png";
        let featuredMediaAlt = "placeholder image";
        return [featuredMedia, featuredMediaAlt];
    }
    
}

export function showBigImage(image, id){
    image.classList.add("hoverImg")
    return `
    <div class="fullScreen img${id}">
    <picture class="fullScreenImage">
    <img  src="${image.src}">
    </picture>
    </div>`

}
//    <i class="fas fa-times"></i>
