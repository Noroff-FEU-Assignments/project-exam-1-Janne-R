import getImageUrl from "./lib/getImageUrl.js";

const blogPosts = document.querySelector(".blog-posts");
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

  blogPosts.innerHTML += `
  <div class="post">
  <a href="blog-specific.html?id=${post.id}">
  <div class="blog-post-image" style="background-image: url(${getImageUrl(post.featured_media, post._embedded["wp:featuredmedia"])})"></div>
<div>
  <h2>${post.title.rendered}</h2>
<p>${post.excerpt.rendered}</p>
</div>

<p><i class="far fa-clock"></i>${categoryName}</p>

</a>
</div>
`;

});

/*function getTagName(tagId, tagList) {
  let selectedTag = null;

  tagList.forEach(function (tag) {
    if (tag.id === tagId) {
      selectedTag = tag;
    }

  });

  if (selectedTag) {
    return selectedTag.name;
  } else {
    return "";
  }

}*/