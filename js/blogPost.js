import viewPosts from "./components/viewPosts.js";

const blogPosts = document.querySelector(".blog-posts");
const baseUrl = "https://familykitchen.janne-ringdal.one/wp-json/wp/v2";
const button = document.querySelector(".button");

async function getPosts(pageNumber) {
  try {
    const response = await fetch(`${baseUrl}/posts?page=${pageNumber}&_embed`);
    const json = await response.json();

    return json;

  } catch (error) {
    blogPosts.innerHTML = "error";

  }
}

let pageNumber = 1;

async function viewBlogPosts() {
  const currentPage = await getPosts(pageNumber);
  pageNumber++;

  viewPosts(currentPage, blogPosts);
  document.querySelector(".loader").style.display = "none";
}

viewBlogPosts();

button.addEventListener("click", viewBlogPosts);

async function getPostsByCategory(categoryId) {
  try {
    const response = await fetch(`${baseUrl}/posts?_embed&categories=${categoryId}`);
    const posts = await response.json();

    blogPosts.innerHTML = "";

    viewPosts(posts, blogPosts);

  } catch (error) {

  }
}

//Filter
const filterButton = document.querySelector(".button-filter");
const filterList = document.querySelector(".filters");
const icon = document.querySelector("#icon-filter");

filterList.addEventListener("click", event => {
  const categoryId = event.target.id;

  setTimeout(function () {
    filterList.classList.toggle("show");
    icon.className = "fas fa-check";
  }, 500)

  getPostsByCategory(categoryId);

});

filterButton.addEventListener("click", () => {
  filterList.classList.toggle("show");

});
