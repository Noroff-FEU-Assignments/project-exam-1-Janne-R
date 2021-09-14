import getImageUrl from "./lib/getImageUrl.js";

const detailContainer = document.querySelector(".specific-section");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const id = params.get("id");

const url = "https://familykitchen.janne-ringdal.one/wp-json/wp/v2/posts/" + id + "?_embed";

async function getBlogPost() {
  try {
    const response = await fetch(url);
    const blogPost = await response.json();

    createHtml(blogPost);

  } catch (error) {
    console.error(error);
    detailContainer.innerHTML = "error";
  }

}

await getBlogPost();


function createHtml(details) {
  document.title = details.title.rendered;
  detailContainer.innerHTML = `
  <p class="date">${details.date}</p>
  <h1>${details.title.rendered}</h1>
  <p>${details.excerpt.rendered}</p>
  
  <img class="modalImg" src="${getImageUrl("full", details.featured_media, details._embedded["wp:featuredmedia"])}" alt="${details.title.rendered}" style="width:100%">
  <div class="modal">
    <button class="close"><i class="fas fa-times"></i></button>
    <img class="modal-content img01">
    <div class="caption"></div>
  </div>
  <p>${details.content.rendered}</p>

  `;

}

var modal = document.querySelector(".modal");
var img = document.querySelector(".modalImg");
var modalImg = document.querySelector(".img01");
var captionText = document.querySelector(".caption");
var closeButton = document.querySelector(".close");

img.onclick = function () {
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

closeButton.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const form = document.querySelector("form");
const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");
const fullName = document.querySelector("#name");
const nameError = document.querySelector("#nameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const button = document.querySelector("button");
const messageContainer = document.querySelector(".messageContainer");

const validMessage = () => {
  if (checkLength(message.value, 25)) {
    messageError.style.display = "none";
    return true;
  } else {
    messageError.style.display = "block";
    return false;
  }
};

const checkLength = (value, len) => {
  if (value.trim().length >= len) {
    return true;
  } else {
    return false;
  }
}

const validfullName = () => {
  if (checkLength(fullName.value, 3)) {
    nameError.style.display = "none";
    return true;
  } else {
    nameError.style.display = "block";
    return false;
  }
};

const validateEmail = email => {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

const validEmail = () => {
  if (validateEmail(email.value)) {
    emailError.style.display = "none";
    return true;
  } else {
    emailError.style.display = "block";
    return false;
  }
};

const validateForm = () => {
  if (validMessage() && validfullName() && validEmail()) {
    button.disabled = false;
  } else {
    messageContainer.innerHTML = "";
    button.disabled = true;
  }
}

message.addEventListener("keyup", validateForm);
fullName.addEventListener("keyup", validateForm);
email.addEventListener("keyup", validateForm);

function submitForm(event) {
  event.preventDefault();
  messageContainer.innerHTML = '<div class="formMessage">Your comment has been posted</div>';

  form.reset();
  button.disabled = true;

}

form.addEventListener("submit", submitForm);




