export async function createTag(tag){
return `<a class="tag" href="posts.html?tagId=${tag.id}">${tag.name}</a>`
}