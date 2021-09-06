const blogPosts = document.querySelector(".blog-posts");
const baseUrl = "https://familykitchen.janne-ringdal.one/wp-json/wp/v2";


function getImageUrl(featuredMediaId, featuredMediaList) {
  let selectedMedia = null;

  featuredMediaList.forEach(function (featuredMedia) {
    if (featuredMedia.id === featuredMediaId) {
      selectedMedia = featuredMedia;
    }
  });

  if (selectedMedia) {
    return selectedMedia.media_details.sizes.medium.source_url;
  } else {
    return "";
  }
}

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

/*

1. lag en getCategoryName funksjon som er asynkron og henter en kategori fra wordpress
2. funksjonen må ta inn ett parameter categoryId, denne må legges på URLen slik at du får ut en enkelt kategori og ikke en liste av kategorier.
3. Når du har hentet kategorien, kan du returnere ut navnet på kategorien
*/

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
  <img src="${getImageUrl(post.featured_media, post._embedded["wp:featuredmedia"])}" alt="${post.title.rendered}">
<h2>${post.title.rendered}</h2>
<p>${post.excerpt.rendered}</p>
<p>${categoryName}</p>

`;

});
