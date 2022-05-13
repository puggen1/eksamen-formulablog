let webUrl = window.location.search;
let urlInfo = new URLSearchParams(webUrl);
let postId = urlInfo.get("id");
let postLocation = document.querySelector("#post");
let title = document.querySelector("title");
let header = document.querySelector("h1")
if(!postId){
    window.location.replace("/index.html");
}

let api = `https://www.bendik.one/www/eksamenfed/wp-json/wp/v2/posts/` + postId;


fetch(api)
.then(result => result.json())
.then(formatedResult => showPost(formatedResult));


function showPost(apiPost){
    title.innerHTML = apiPost.title.rendered;
    header.innerHTML = apiPost.title.rendered;
    postLocation.innerHTML =`<picture>srcsets comes here</picture> ${apiPost.content.rendered}`
    
}