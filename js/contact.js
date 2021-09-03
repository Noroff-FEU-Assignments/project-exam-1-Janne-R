const form = document.querySelector("form");
const fullName = document.querySelector("#name");
const nameError = document.querySelector("#nameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");
const button = document.querySelector("button");
const messageContainer = document.querySelector(".messageContainer");

const checkLength = (value, len) => {
  if (value.trim().length >= len) {
    return true;
  } else {
    return false;
  }
}

const validateEmail = email => {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

const validfullName = () => {
  if (checkLength(fullName.value, 6)) {
    nameError.style.display = "none";
    return true;
  } else {
    nameError.style.display = "block";
    return false;
  }
};

const validEmail = () => {
  if (validateEmail(email.value)) {
    emailError.style.display = "none";
    return true;
  } else {
    emailError.style.display = "block";
    return false;
  }
};

const validSubject = () => {
  if (checkLength(subject.value, 16)) {
    subjectError.style.display = "none";
    return true;
  } else {
    subjectError.style.display = "block";
    return false;
  }
};

const validMessage = () => {
  if (checkLength(message.value, 26)) {
    messageError.style.display = "none";
    return true;
  } else {
    messageError.style.display = "block";
    return false;
  }
};

const validateForm = () => {
  if (validfullName() && validEmail() && validSubject() && validMessage()) {
    button.disabled = false;
  } else {
    messageContainer.innerHTML = "";
    button.disabled = true;
  }
}

fullName.addEventListener("keyup", validateForm);
email.addEventListener("keyup", validateForm);
subject.addEventListener("keyup", validateForm);
message.addEventListener("keyup", validateForm);

function submitForm(event) {
  event.preventDefault();
  messageContainer.innerHTML = '<div class="formMessage">Your message has been sent</div>';

  form.reset();
  button.disabled = true;

}

form.addEventListener("submit", submitForm);



