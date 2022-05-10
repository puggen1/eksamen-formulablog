import {getData} from "./getData.js";
let tags = "https://bendik.one/www/eksamenfed/wp-json/wp/v2/tags?per_page=30"

export async function getTags(tagList){
    let postTags ="";
    let allTags = await getData(tags);
    for(let tag of tagList){
        for(let wpTags of allTags){
            if(wpTags.id === tag){
                postTags += `<a class="tag" href="posts.html?tagId=${tag}">${wpTags.name}</a>`
            }
        }
    }
    return postTags;
}