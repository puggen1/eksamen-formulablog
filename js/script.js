console.log("hello from script.js");
let testDiv = document.querySelector("#test");

let api = "https://www.bendik.one/www/eksamenfed/wp-json/wp/v2/posts";
let featuredMediaLibrary = "https://www.bendik.one/www/eksamenfed/wp-json/wp/v2/media/";



//function to get data from wordpress, it is universal so can be used to get our media as well
async function getData(apiurl){
    try{
        let apiResponse = await fetch(apiurl);
        return await apiResponse.json();
    }
    catch (e){
        console.log(e);
    }
}
//not universal yet, will look into it later
async function showData(data){
    let result = await getData(data)
    let html = "";
    let post = "";
    
    for(let posts of result){
        let featuredMedia = "../assets/test.png";
        if(posts.featured_media){
            let mediaLocation = featuredMediaLibrary + posts.featured_media;
            mediaResult = await getData(mediaLocation);
            featuredMedia = mediaResult.source_url;
        }
        post = `<div><img src="${featuredMedia}">
                <h2>${posts.title.rendered}</h2>
                ${posts.excerpt.rendered} </div>`;
                html += post;
            }
            testDiv.innerHTML = html;
}

//call the global show funciton
showData(api);