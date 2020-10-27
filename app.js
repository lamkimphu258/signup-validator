const signupForm = document.querySelector("#signup-form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([username, email, password, confirmPassword]);
  checkLength(username, 5, 30);
  checkEmail(email);
  checkLength(password, 5, 50);
  checkLength(confirmPassword, 5, 50);
  checkPasswordMatch(password, confirmPassword);
});

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${input.id} is required.`);
    } else {
      showSuccess(input);
    }
  });
}

function checkEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email.value.toLowerCase())) {
    showSuccess(email);
  } else {
    showError(email, `Email is invalid.`);
  }
}

function checkPasswordMatch(password, confirmPassword) {
  if (password.value !== confirmPassword.value) {
    showError(confirmPassword, `Password is not match.`);
  }
}

function checkLength(input, min, max) {
  const inputLength = input.value.length;
  if (inputLength < min) {
    showError(input, `${input.id} is must at least ${min} characters.`);
  } else if (inputLength > max) {
    showError(input, `${input.id} is must less than ${max} characters.`);
  }
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.textContent = message.capitalize();
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
