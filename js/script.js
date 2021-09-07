import getImageUrl from "./lib/getImageUrl.js";

const selectedPosts = document.querySelector(".selected-post");
const baseUrl = "https://familykitchen.janne-ringdal.one/wp-json/wp/v2";

async function getCategoryName(categoryId) {
  try {
    const response = await fetch(`${baseUrl}/categories/${categoryId}`);
    const category = await response.json();
    console.log(category);

    return category.name;
  } catch (error) {
    console.error(error);
    blogPosts.innerHTML = "error";
  }

}


async function getPosts() {
  try {
    const response = await fetch(`${baseUrl}/posts?_embed`);
    const json = await response.json();

    return json;

  } catch (error) {
    console.error(error);
    blogPosts.innerHTML = "error";

  }
}

const postResult = await getPosts();

postResult.forEach(async function (post) {
  const categoryName = await getCategoryName(post.categories[0]);

  console.log(post);

  selectedPosts.innerHTML += `
  <a href="blog-specific.html?id=${post.id}">
  <img src="${getImageUrl(post.featured_media, post._embedded["wp:featuredmedia"])}" alt="${post.title.rendered}">
<h2>${post.title.rendered}</h2>
<p>${post.excerpt.rendered}</p>
<p><i class="far fa-clock"></i>${categoryName}</p>
</a>
`;

});

/*const images = document.querySelectorAll(".image-accordion img");
images.forEach(function (image) {
  image.onclick = function (event) {
    document.querySelector(".selected-image").classList.remove("selected-image");
    const clickParent = event.target.parentNode;
    clickParent.classList.add("selected-image");
  }
})*/