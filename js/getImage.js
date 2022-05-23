
import {getData} from "./getData.js";

//let mediaLibrary = "https://bendik.one/www/eksamenfed/wp-json/wp/v2/media/";

export async function getImage(post){
    if(post){
        //let mediaLocation = mediaLibrary + post;
        //let mediaResult = await getData(mediaLocation);
        console.log(post)
        let imageSizes = post._embedded[`wp:featuredmedia`][0].media_details.sizes;
        let altText = post._embedded[`wp:featuredmedia`][0].alt_text;
        
        /*
        for(let image in imageSizes){
            console.log(image)
            sources += `<source srcset="${imageSizes.image}"`
        }
        console.log(sources)
        */
        let picture = `
        <picture> 
        <source srcset="${imageSizes.medium.source_url}">
        <img src="${imageSizes.full.source_url}" alt="${altText}"></picture>
        `
        console.log(picture)
        return picture
    }
    else{
        let picture = `
        <picture> 
        <img src="./assets/test.png" alt="placeholder image">
        </picture>
        `
        return picture;
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
