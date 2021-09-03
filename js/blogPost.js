/*const blogPosts = document.querySelector(".blog-posts");
const url = "https://familykitchen.janne-ringdal.one/wp-json/wp/v2/posts/?per_page=20";




async function getPosts() {
  try {
    const response = await fetch(url);
    const json = await response.json();

    console.log(json);

    const posts = json[0];

    posts.forEach(function (result) {
      blogPosts.innerHTML +=
        `
        <h2>${result.title}</h2>
      `;
    })



  } catch (error) {
    blogPosts.innerHTML = "error";

  }
}


getPosts();*/

/*

const blogPosts = document.querySelector(".blog-posts");
const url = "https://familykitchen.janne-ringdal.one/wp-json/wp/v2/posts/?per_page=20";

async function getPosts() {
  try {
    const response = await fetch(url);
    const json = await response.json();

    console.log(json);
    return json[0];


  } catch (error) {
    blogPosts.innerHTML = "error";

  }
}


const results = getPosts();

results.forEach(function (result) {
  blogPosts.innerHTML +=
    `
      <h2>${result[0].title}</h2>
 `;

}
);*/

const blogPosts = document.querySelector(".blog-posts");
const url = "https://familykitchen.janne-ringdal.one/wp-json/wp/v2/posts/?per_page=20";

async function getPosts() {
  try {
    const response = await fetch(url);
    const json = await response.json();

    console.log(json);

    json.forEach(function (result) {
      blogPosts.innerHTML += `
   
      <h2>${json[0].title.rendered}</h2>
    `;

    });


  } catch (error) {
    blogPosts.innerHTML = "error";

  }
}


getPosts();

