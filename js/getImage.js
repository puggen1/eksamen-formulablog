export async function getImage(post) {
  if (post.featured_media) {
    let imageSizes = post._embedded[`wp:featuredmedia`][0].media_details.sizes;
    let altText = post._embedded[`wp:featuredmedia`][0].alt_text;
    let picture = `
        <picture>
        <source media="(min-width:700px)" srcset="${imageSizes.full.source_url}">
        <img src="${imageSizes.medium.source_url}" alt="${altText}"></picture>
        `;
    return picture;
  } else {
    //all posts have featured picture, but if for some reason more are added and i forget to add image, this will add a placeholder image
    let picture = `
        <picture> 
        <img src="./assets/placeholder.png" alt="placeholder image">
        </picture>
        `;
    return picture;
  }
}

export function showBigImage(image, id) {
  image[id].classList.add("hoverImg");
  return `
    <div class="fullScreen img${id}">
    <picture class="fullScreenImage">
    <img src="${image[id].currentSrc}">
    </picture>
    <i class="fas fa-times"></i>
    </div>`;
}
