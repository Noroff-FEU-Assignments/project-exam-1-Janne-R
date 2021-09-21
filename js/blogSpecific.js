import getImageUrl from "./lib/getImageUrl.js";
import getCategoryName from "./lib/getCategoryName.js";

const detailContainer = document.querySelector(".specific-section");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const id = params.get("id");

const url = "https://familykitchen.janne-ringdal.one/wp-json/wp/v2/posts/" + id + "?_embed";

async function getBlogPost() {
  try {
    const response = await fetch(url);
    const blogPost = await response.json();

    await createHtml(blogPost);

  } catch (error) {
    console.error(error);
    detailContainer.innerHTML = "error";
  }

}

await getBlogPost();


async function createHtml(details) {
  document.title = document.title + " " + details.title.rendered;
  const categoryName = await getCategoryName(details.categories[0]);

  detailContainer.innerHTML = `
  <p class="date">${details.date}</p>
  <h1>${details.title.rendered}</h1>
  <p>${details.excerpt.rendered}</p>
  <p><i class="far fa-clock"></i>${categoryName}</p>
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
const button = document.querySelector(".button");
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

/* 1. lag en sendComment funksjon
   2. funksjonen kan få ta inn ett parameter med navn "comment"
   3. comment parametert skal være et "kommentar objekt" som inkluderer feltene
       post, content, author_email, author_name
   4. google "mdn fetch post", for fetch skal fortsatt brukes, men trenger å brukes
      på en litt annen måte når man ikke bare skal gjøre en enkel GET
      
*/

//send comments
//async function createHtml(details) 

async function sendComment(comment) {
  try {
    const rawResponse = await fetch('https://familykitchen.janne-ringdal.one/wp-json/wp/v2/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    });

    const content = await rawResponse.json();
    console.log("COMMENT SENT")
  } catch (error) {

  }
}





function submitForm(event) {
  event.preventDefault();
  messageContainer.innerHTML = '<div class="formMessage">Your comment has been posted</div>';
  // 1. send inn hardkodet comment objekt.
  // 2.0 her er post iden const id = params.get("id");
  // 2. bygg opp et comment objekt ved å hente ut verdien i blant annet message feltet osv const comment = { content: message.something.here, p}
  const comment = {
    post: id,
    author_name: fullName.value,
    content: message.value
  }
  console.log(comment);

  sendComment(comment);

  form.reset();
  button.disabled = true;

}

form.addEventListener("submit", submitForm);



const commentsContainer = document.querySelector(".comments");


async function getComments() {
  try {
    const response = await fetch(`https://familykitchen.janne-ringdal.one/wp-json/wp/v2/comments?post=${id}`);
    const comments = await response.json();

    console.log(comments);

    return comments;
  } catch (error) {
    console.error(error);
    comments.innerHTML = "error";

  }
}

function viewComments(comments) {
  comments.forEach(function (comment) {
    commentsContainer.innerHTML += `
    <div>
  <h4>${comment.author_name}</h4>
  <p>${comment.content.rendered}</p>
  <p>${comment.date_gmt}</p>
  </div>
  `;
  });
}

const comments = await getComments();

viewComments(comments);
