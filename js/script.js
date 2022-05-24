console.log("hello from script.js");
import {getData} from "./getData.js";
import {getImage} from "./getImage.js";
import {createTag} from "./createTag.js";
import {carousel} from "./carousel.js";
import { createDate } from "./createDate.js";
import {sortNew} from "./filtersAndSort.js";
let featuredPosts = document.querySelector("#mainPagePosts");
export let api = "https://www.bendik.one/www/eksamenfed/wp-json/wp/v2/posts?_embed";
let featuredMediaLibrary = "https://www.bendik.one/www/eksamenfed/wp-json/wp/v2/media/";
let result = []


//function to get data from wordpress, it is universal so can be used to get our media as well

//not universal yet, will look into it later
async function showData(data){
    result = await getData(data)
    let html = "";
    let post = "";
    for(let i = 0; i < result.length; i++){
        if(i >= 6){
            break
        }
        let posts = result[i];
        let tags = ""
        let formatedDate = createDate(posts.date)
        for(let tag of posts._embedded['wp:term'][1]){
            let singleTag = await createTag(tag);
            tags += singleTag;
        }
        let pictureTag = await getImage(posts);
        post = `<div class="post">${pictureTag}
                <a class="h3Link" href="singlepost.html?id=${posts.id}"><h3>${posts.title.rendered}</h3></a>
                <p class="dateAndBy"> ${formatedDate} by ${posts._embedded.author[0].name} </p>
                <div class="excerpt">${posts.excerpt.rendered}</div>
                <a class="blueA" href="singlepost.html?id=${posts.id}&from=index"">Read more</a>
                <div class="tagDiv">
           ${tags}
           </div> </div>`;
                html += post;
            }
            featuredPosts.innerHTML = html;
            let sortedNew = result.sort(sortNew);
            console.log(result)
            carousel(sortedNew);
}

//call the global show funciton
showData(api);


