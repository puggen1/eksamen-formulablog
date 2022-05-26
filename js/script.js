console.log("hello from script.js");
//all the function getting used, 
import {getData} from "./getData.js";
import { showPost } from "./showPost.js";
import {getImage} from "./getImage.js";
import {createTag} from "./createTag.js";
import {carousel} from "./carousel.js";
import { createDate } from "./createDate.js";
import {sortNew} from "./filtersAndSort.js";
let featuredPosts = document.querySelector("#mainPagePosts");
export let api = "https://www.bendik.one/www/eksamenfed/wp-json/wp/v2/posts?_embed";
let result = []

//this is the "starter" function on index.html it shows the 6 first posts, and later runs the carousel function that shows the carousel,
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
        //for loop that for each tag the post have, it will create a div with the name and link. later it is added in the showPost function
        for(let tag of posts._embedded['wp:term'][1]){
            let singleTag = await createTag(tag);
            tags += singleTag;
        }
        let pictureTag = await getImage(posts);
        //this will now be a function i can reuse on carousel and posts page.
        post = showPost(posts, formatedDate, pictureTag, tags, "index");
        html += post;
    }
    featuredPosts.innerHTML = html;
    //the carousel function have some similarities, but also does more to make it interactive
    //was thinking of sending the html variable to carousel, but i choosed to run the whole show post again there.
    
    let sortedNew = result.sort(sortNew);
    carousel(sortedNew);
}

//call the global show funciton
showData(api);


