import getCategoryName from "../lib/getCategoryName.js";
import getImageUrl from "../lib/getImageUrl.js";

export default async function viewPosts(posts, element) {
  posts.forEach(async function (post) {
    const categoryName = await getCategoryName(post.categories[0]);

    element.innerHTML += `
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