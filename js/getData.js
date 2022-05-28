export async function getData(apiUrl) {
  try {
    let apiResponse = await fetch(apiUrl);
    return await apiResponse.json();
  } catch (e) {
    let errorPlacement = document.querySelector(".errorMessage");
    errorPlacement.style.display = "flex";
    //there will only be one error on the page at all time, since it only shows when fetch error, it will react on all calls to api.
    errorPlacement.innerHTML = `<div class="singleError"><p>There is a problem with the server. Please try again later.</p></div>`;

    console.log(e);
  }
}
