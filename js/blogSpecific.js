import getImageUrl from "./lib/getImageUrl.js";

const detailContainer = document.querySelector(".specific-section");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const id = params.get("id");


const url = "https://familykitchen.janne-ringdal.one/wp-json/wp/v2/posts/" + id + "?_embed";

async function getBlogPost() {
  try {
    const response = await fetch(url);
    const blogPost = await response.json();

    console.log(blogPost);

    createHtml(blogPost);

  } catch (error) {
    console.error(error);
    detailContainer.innerHTML = "error";
  }

}

getBlogPost();

function createHtml(details) {
  detailContainer.innerHTML = `
  <p>${details.date}</p>
  <h1>${details.title.rendered}</h1>
  <p>${details.excerpt.rendered}</p>
  <img src="${getImageUrl(details.featured_media, details._embedded["wp:featuredmedia"])}" alt="${details.title.rendered}">

  `;

}

