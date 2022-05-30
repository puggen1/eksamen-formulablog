export function showPost(
  post,
  formatedDate,
  pictureTag,
  tags,
  from,
  item = "",
  header = "h3"
) {
  //the item variabel is only used in carousel, but i made the function somewhat universal since it is kind of easier
  let singlePost = `<div class="post ${item}">${pictureTag}
    <a class="${header}Link" href="singlepost.html?id=${
    post.id
  }&from=index"><${header}>${post.title.rendered}</${header}></a>
    <p class="dateAndBy">Written on ${formatedDate} by ${
    post._embedded.author[0].name
  } </p>
    <div class="excerpt">${post.excerpt.rendered.slice(0, 100)}</div>
    <a class="blueA" href="singlepost.html?id=${
      post.id
    }&from=${from}"">Read more</a>
    <div class="tagDiv">
${tags}
</div> </div>`;
  return singlePost;
}
