console.log("hello from script.js");
import {getData} from "./getData.js";
import { showPost } from "./showPost.js";
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
        //this will now be a function i can reuse on carousel and posts page.
        let post = showPost(posts, formatedDate, pictureTag, tags, "index");
                html += post;
            }
            featuredPosts.innerHTML = html;
            let sortedNew = result.sort(sortNew);
            console.log(result)
            carousel(sortedNew);
}

//call the global show funciton
showData(api);


