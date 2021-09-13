import getImageUrl from "./lib/getImageUrl.js";

const latestPosts = document.querySelector(".latest-posts");
const baseUrl = "https://familykitchen.janne-ringdal.one/wp-json/wp/v2";

async function getCategoryName(categoryId) {
  try {
    const response = await fetch(`${baseUrl}/categories/${categoryId}`);
    const category = await response.json();

    return category.name;
  } catch (error) {
    console.error(error);
    blogPosts.innerHTML = "error";
  }
}

async function getPosts() {
  try {
    const response = await fetch(`${baseUrl}/posts?_embed&per_page=12`);
    const json = await response.json();

    return json;
  } catch (error) {
    console.error(error);
    blogPosts.innerHTML = "error";

  }
}

const arrowLeftButton = document.querySelector(".carousel-button-left");
const arrowRightButton = document.querySelector(".carousel-button-right");

const postResult = await getPosts();

let oldPosition = 0;
function showCarousel(startPos, endPos) {
  if (oldPosition === startPos + endPos) {
    return;
  }

  oldPosition = startPos + endPos;

  const activeSelection = postResult.slice(startPos, endPos);
  latestPosts.innerHTML = "";

  activeSelection.forEach(async function (post) {
    const categoryName = await getCategoryName(post.categories[0]);

    latestPosts.innerHTML += `
  <div class="post">
  <a href="blog-specific.html?id=${post.id}">
  <div class="blog-post-image" style="background-image: url(${getImageUrl("medium", post.featured_media, post._embedded["wp:featuredmedia"])})"></div>
<div class="post-text">
  <h3>${post.title.rendered}</h3>
<p>${post.excerpt.rendered}</p>
<p><i class="far fa-clock"></i>${categoryName}</p>
</div>
</a>
</div>
`;

  });
}

let startPos = 0;
let endPos = 1;
let numberOfPosts = 1;

function updateForDevice() {
  if (window.innerWidth < 480) {
    numberOfPosts = 1;
    endPos = 1;
    showCarousel(startPos, endPos);
  } else if (window.innerWidth > 480 && window.innerWidth <= 800) {
    numberOfPosts = 2;
    endPos = 2;
    showCarousel(startPos, endPos);
  } else if (window.innerWidth > 800) {
    numberOfPosts = 4;
    endPos = 4;
    showCarousel(startPos, endPos);
  }
}

updateForDevice();

function goNext() {
  startPos = startPos + numberOfPosts;
  endPos = endPos + numberOfPosts;

  if (endPos <= postResult.length) {
    showCarousel(startPos, endPos);
  }
}

function goPrevious() {
  startPos = startPos - numberOfPosts;
  endPos = endPos - numberOfPosts;

  if (startPos >= 0) {
    showCarousel(startPos, endPos);
  }
}

arrowRightButton.addEventListener("click", goNext);
arrowLeftButton.addEventListener("click", goPrevious);

window.addEventListener('resize', updateForDevice);

