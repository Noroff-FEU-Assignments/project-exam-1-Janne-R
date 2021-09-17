import getImageUrl from "./lib/getImageUrl.js";
import getCategoryName from "./lib/getCategoryName.js";

const blogPosts = document.querySelector(".blog-posts");
const baseUrl = "https://familykitchen.janne-ringdal.one/wp-json/wp/v2";
const button = document.querySelector(".button");


async function getPosts(pageNumber) {
  try {
    const response = await fetch(`${baseUrl}/posts?page=${pageNumber}&_embed`);
    const json = await response.json();

    return json;

  } catch (error) {
    console.error(error);
    blogPosts.innerHTML = "error";

  }
}

let pageNumber = 1;

async function viewBlogPosts() {
  const currentPage = await getPosts(pageNumber);
  pageNumber++;

  currentPage.forEach(async function (post) {
    const categoryName = await getCategoryName(post.categories[0]);

    blogPosts.innerHTML += `
    <div class="post">
    <a href="blog-specific.html?id=${post.id}">
    <div class="blog-post-image" style="background-image: url(${getImageUrl("medium", post.featured_media, post._embedded["wp:featuredmedia"])})"></div>
  <div class="post-text">
    <h2>${post.title.rendered}</h2>
  <p>${post.excerpt.rendered}</p>
  <p><i class="far fa-clock"></i>${categoryName}</p>
  </div>
  </a>
  </div>
  `;
  });
}

viewBlogPosts();

button.addEventListener("click", viewBlogPosts);

async function getPostsByCategory(categoryId) {
  try {
    const response = await fetch(`${baseUrl}/posts?_embed&categories=${categoryId}`);
    const posts = await response.json();

    blogPosts.innerHTML = "";

    posts.forEach(async function (post) {
      const categoryName = await getCategoryName(post.categories[0]);

      blogPosts.innerHTML += `
      <div class="post">
      <a href="blog-specific.html?id=${post.id}">
      <div class="blog-post-image" style="background-image: url(${getImageUrl("medium", post.featured_media, post._embedded["wp:featuredmedia"])})"></div>
    <div class="post-text">
      <h2>${post.title.rendered}</h2>
    <p>${post.excerpt.rendered}</p>
    <p><i class="far fa-clock"></i>${categoryName}</p>
    </div>
    </a>
    </div>
    `;
    });
  } catch (error) {
    console.error(error);

  }
}

//Filter
const filterButton = document.querySelector(".button-filter");
const filterList = document.querySelector(".filters");

filterList.addEventListener("click", event => {
  const categoryId = event.target.id;

  getPostsByCategory(categoryId);
});


filterButton.addEventListener("click", () => {
  filterList.classList.toggle("show");

});
