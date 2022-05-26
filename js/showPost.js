export function showPost(post, formatedDate,  pictureTag, tags, from, item=""){
//the item variabel is only used in carousel, but i made the functing somewhat universal since it is kind of easier
    let singlePost = `<div class="post ${item}">${pictureTag}
    <a class="h3Link" href="singlepost.html?id=${post.id}&from=index"><h3>${post.title.rendered}</h3></a>
    <p class="dateAndBy">Written on ${formatedDate} by ${post._embedded.author[0].name} </p>
    <div class="excerpt">${post.excerpt.rendered.slice(0, 100)}</div>
    <a class="blueA" href="singlepost.html?id=${post.id}&from=${from}"">Read more</a>
    <div class="tagDiv">
${tags}
</div> </div>`;
return singlePost
}