const blogPosts = document.querySelector(".blog-posts");
const url = "https://familykitchen.janne-ringdal.one/wp-json/wp/v2/posts/?per_page=20";

async function getPosts() {
  try {
    const response = await fetch(url);
    const json = await response.json();

    console.log(json);

    createHtml(json);


  } catch (error) {
    blogPosts.innerHTML = "error";

  }
}


getPosts();


function createHtml(json) {
  blogPosts.innerHTML +=
    `
    <h2>${json[0].title.rendered}</h2>
  `;

}
