

const blogPosts = document.querySelector(".blog-posts");
const url = "https://familykitchen.janne-ringdal.one/wp-json/wp/v2/posts?_embed";

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

async function getPosts() {
  try {
    const response = await fetch(url);
    const posts = await response.json();

    posts.forEach(function (post) {
      console.log(post);
      blogPosts.innerHTML += `
      <img src="${getImageUrl(post.featured_media, post._embedded["wp:featuredmedia"])}" alt="${post.title.rendered}">
    <h2> ${post.title.rendered}</h2 >
    <p>${post.excerpt.rendered}</p>
  
    `;

    });


  } catch (error) {
    console.error(error);
    blogPosts.innerHTML = "error";

  }
}


getPosts();

