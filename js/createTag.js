//since i dont need <a> on the all post page, it changes to button there, so it will use filter directly and not fetch everything by reloading the page. 
export async function createTag(tag, type="a"){
    if(type == "button"){
        return `<button class="tag" id="${tag.id}">${tag.name}</button>`
    }
    else if(type == "a"){
        return `<a class="tag" href="posts.html?tagId=${tag.id}">${tag.name}</a>`
    }
    else{
        return `<p>something went wrong<p>`
    }
}