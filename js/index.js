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

function getPostsForDevice() {
  if (window.innerWidth < 480) {
    return 1;
  } else if (window.innerWidth > 480 && window.innerWidth <= 800) {
    return 2;
  } else if (window.innerWidth > 800) {
    return 4;
  }
}

function updateForDevice(numPosts) {
  numberOfPosts = numPosts;
  endPos = numPosts;

  showCarousel(startPos, endPos);
}

let startPos = 0;
let endPos = getPostsForDevice();
let numberOfPosts = getPostsForDevice();

updateForDevice(numberOfPosts);

function goNext() {
  if (endPos + numberOfPosts <= postResult.length) {
    startPos = startPos + numberOfPosts;
    endPos = endPos + numberOfPosts;

    showCarousel(startPos, endPos);
  }
}

function goPrevious() {
  if (startPos - numberOfPosts >= 0) {
    startPos = startPos - numberOfPosts;
    endPos = endPos - numberOfPosts;

    showCarousel(startPos, endPos);
  }
}

arrowRightButton.addEventListener("click", goNext);
arrowLeftButton.addEventListener("click", goPrevious);

window.addEventListener('resize', () => {
  const newNumberOfPosts = getPostsForDevice();

  if (numberOfPosts !== newNumberOfPosts) {
    updateForDevice(newNumberOfPosts);
  }
});

