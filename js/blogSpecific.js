const detailContainer = document.querySelector(".specific-section");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const id = params.get("id");


const url = "https://familykitchen.janne-ringdal.one/wp-json/wp/v2/posts/" + id;

async function getBlogPost() {
  try {
    const response = await fetch(url);
    const blogPost = await response.json();

    console.log(blogPost);

    createHtml(blogPost);

  } catch (error) {
    detailContainer.innerHTML = "error";
  }

}

getBlogPost();

function createHtml(details) {
  detailContainer.innerHTML = `
  <h1>${details.title.rendered}</h1>

  `;

}

