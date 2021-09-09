import getImageUrl from "./lib/getImageUrl.js";

const latestPosts = document.querySelector(".latest-posts");
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
    const response = await fetch(`${baseUrl}/posts?_embed&per_page=12`);
    const json = await response.json();

    return json;

  } catch (error) {
    console.error(error);
    blogPosts.innerHTML = "error";

  }
}

const carousel = document.querySelector(".carousel");
const arrowLeftButton = document.querySelector(".carousel-button-left");
const arrowRightButton = document.querySelector(".carousel-button-right");

const postResult = await getPosts();

function showCarousel(startPos, endPos) {
  const activeSelection = postResult.slice(startPos, endPos);

  latestPosts.innerHTML = "";

  activeSelection.forEach(async function (post) {
    const categoryName = await getCategoryName(post.categories[0]);

    console.log(post);

    latestPosts.innerHTML += `
  <div class="post">
  <a href="blog-specific.html?id=${post.id}">
  <div class="blog-post-image" style="background-image: url(${getImageUrl(post.featured_media, post._embedded["wp:featuredmedia"])})"></div>
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

let startPos = 0;
let endPos = 1;
let numberOfPosts = 1;

function updateForDevice() {
  console.log("hello");
  if (window.innerWidth > 480 && window.innerWidth <= 800) {
    numberOfPosts = 2;
    endPos = 2;
  } else if (window.innerWidth > 800) {
    numberOfPosts = 4;
    endPos = 4;
  }
}
updateForDevice();

showCarousel(startPos, endPos);

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


/*

const CORSFIX = `https://noroffcors.herokuapp.com/`;
const postsAPI = `http://hunglikeabee.one/project-exam-1-Hunglikeabee/wp-json/wp/v2/posts?_embed&per_page=100`;
const mediaAPI = `http://hunglikeabee.one/project-exam-1-Hunglikeabee/wp-json/wp/v2/media?per_page=100`;

async function getMyBlog() {
    try {
        const fetchPosts = await fetch(CORSFIX + postsAPI);
        const fetchMedia = await fetch(CORSFIX + mediaAPI);
        const resultPosts = await fetchPosts.json();
        const resultMedia = await fetchMedia.json();
        console.log(resultPosts);
        console.log(resultMedia);





        const carousel = document.querySelector(".index-carousel");
        const leftButtonCarousel = document.querySelector(".carousel__left-button");
        const rightButtonCarousel = document.querySelector(".carousel__right-button");


        function makeCarousel(countPages, readLengthCarousel) {
            carousel.innerHTML = "";
            for(let i = countPages; i < readLengthCarousel; i++) {

                carousel.innerHTML += `<a href="post.html?id=${resultPosts[i].id}"><div class="carousel-boxes postid-${resultPosts[i].id}"><div class="carousel__text">${resultPosts[i].title.rendered}</div>
                                       <div class="post-image id${resultPosts[i].id}" style="background-image: url(${resultPosts[i]._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url})"></div</a>`;
                                       if(`${resultPosts[i]._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url}` === undefined) {
                                           continue;
                                       }
            }
        }


        leftButtonCarousel.addEventListener("click", previousCarousel);
        rightButtonCarousel.addEventListener("click", nextCarousel);

        function previousCarousel() {
            if (countPages > 0) {
                countPages = countPages - 1;
            }
            else {
                countPages = 0;
            }
            if (lengthCarousel <= widthNumber) {
                lengthCarousel = widthNumber;
            }
            else {
                lengthCarousel = lengthCarousel - 1;
            }

            makeCarousel(countPages, lengthCarousel);

        }

        function nextCarousel() {

            countPages = countPages + 1;

            if (countPages >= resultPosts.length - widthNumber) {
                countPages = resultPosts.length - widthNumber;
            };

            lengthCarousel = countPages + widthNumber;

            if(lengthCarousel >= resultPosts.length) {
                lengthCarousel = resultPosts.length
            }

            makeCarousel(countPages, lengthCarousel);

        }

        var checkScreenWidth = window.innerWidth;
        function checkWidthScreen(checkScreenWidth) {
            if (checkScreenWidth >= 850) {
                widthNumber = 4;
                countPages = 0;
                makeCarousel(countPages, widthNumber);
            }
            else if (checkScreenWidth > 700 && checkScreenWidth < 850) {
                widthNumber = 3;
                countPages = 0;
                makeCarousel(countPages, widthNumber);
            }
            else if (checkScreenWidth > 550 && checkScreenWidth <= 700) {
                widthNumber = 2;
                countPages = 0;
                makeCarousel(countPages, widthNumber);
            }
            else {
                widthNumber = 1;
                countPages = 0;
                makeCarousel(countPages, widthNumber);
            }
        }

        checkWidthScreen(checkScreenWidth);

        var countPages = 0;
        var widthNumber;
        var lengthCarousel = widthNumber;

        window.addEventListener("resize", checkChangesScreen);

        function checkChangesScreen() {
            widthOutput = window.innerWidth;
            checkWidthScreen(widthOutput)
        };




        console.log(resultPosts[0]._embedded[`wp:term`][1][0].name)

    }
    catch(error) {
        console.log("An error occurred " + error)
    }
};

getMyBlog();*/



