import viewPosts from "./components/viewPosts.js";

const latestPosts = document.querySelector(".latest-posts");
const baseUrl = "https://familykitchen.janne-ringdal.one/wp-json/wp/v2";

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

  viewPosts(activeSelection, latestPosts);
  document.querySelector(".loader").style.display = "none";
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

