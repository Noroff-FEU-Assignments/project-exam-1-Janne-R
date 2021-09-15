import getImageUrl from "./lib/getImageUrl.js";

const url = "https://familykitchen.janne-ringdal.one/wp-json/wp/v2/posts?per_page=12&_embed";
const resultContainer = document.querySelector(".container");

async function callApi() {
  try {
    const response = await fetch(url);
    const json = await response.json();

    resultContainer.innerHTML = "";

    for (let i = 0; i < json.length; i++) {
      if (i === 4) {
        break;
      }

      resultContainer.innerHTML += `
      <div class="post">
      <div class="blog-post-image" style="background-image: url(${getImageUrl("medium", json[i].featured_media, json[i]._embedded["wp:featuredmedia"])})"></div>
      <h2>${json[i].title.rendered}</h2>
      <p>${json[i].excerpt.rendered}</p>
      </div>
  `;
    }

  } catch (error) {
    resultContainer.innerHTML = "error";

  }
}

callApi();