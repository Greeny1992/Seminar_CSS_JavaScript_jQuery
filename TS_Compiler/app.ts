const usernameEl: HTMLInputElement =
  document.querySelector("#username") ?? new HTMLInputElement();
const emailEl: HTMLInputElement =
  document.querySelector("#email") ?? new HTMLInputElement();
const passwordEl: HTMLInputElement =
  document.querySelector("#password") ?? new HTMLInputElement();
const confirmPasswordEl: HTMLInputElement =
  document.querySelector("#confirm-password") ?? new HTMLInputElement();

const form : HTMLFormElement = document.querySelector("#signup") ?? new HTMLFormElement;

const checkUsername = () => {
  let valid: boolean = false;

  const min: number = 3,
    max: number = 25;

  const username: string = usernameEl.value.trim();

  if (!isRequired(username)) {
    showError(usernameEl, "Username cannot be blank.");
  } else if (!isBetween(username.length, min, max)) {
    showError(
      usernameEl,
      `Username must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(usernameEl);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid: boolean = false;
  const email: string = emailEl?.value.trim() ?? "";
  if (!isRequired(email)) {
    showError(emailEl, "Email cannot be blank.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Email is not valid.");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

const checkPassword = () => {
  let valid: boolean = false;

  const password: string = passwordEl?.value.trim() ?? "";

  if (!isRequired(password)) {
    showError(passwordEl, "Password cannot be blank.");
  } else if (!isPasswordSecure(password)) {
    showError(
      passwordEl,
      "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
    );
  } else {
    showSuccess(passwordEl);
    valid = true;
  }

  return valid;
};

const checkConfirmPassword = () => {
  let valid: boolean = false;
  // check confirm password
  const confirmPassword: string = confirmPasswordEl?.value.trim() ?? "";
  const password: string = passwordEl.value.trim() ?? "";

  if (!isRequired(confirmPassword)) {
    showError(confirmPasswordEl, "Please enter the password again");
  } else if (password !== confirmPassword) {
    showError(confirmPasswordEl, "The password does not match");
  } else {
    showSuccess(confirmPasswordEl);
    valid = true;
  }

  return valid;
};

const isEmailValid = (email: string) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isPasswordSecure = (password: string) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};

const isRequired: Function = (value: string) => (value === "" ? false : true);
const isBetween: Function = (length: number, min: number, max: number) =>
  length < min || length > max ? false : true;

const showError = (input: HTMLInputElement, message: string): void => {
  // get the form-field element

  const formField: HTMLElement | null = input.parentElement;

  if (formField == null) {
    console.log("Parent null " + input.value);
    return;
  }

  // add the error class
  formField.classList.remove("success");
  formField.classList.add("error");

  // show the error message
  const error: HTMLElement =
    formField.querySelector("small") ?? new HTMLElement();
  error.textContent = message;
};

const showSuccess = (input: HTMLInputElement): void => {
  // get the form-field element
  const formField: HTMLElement | null = input.parentElement;

  if (formField == null) {
    console.log("Parent null " + input.value);
    return;
  }

  // remove the error class
  formField.classList.remove("error");
  formField.classList.add("success");

  // hide the error message
  const error = formField.querySelector("small") ?? new HTMLElement();
  error.textContent = "";
};

form.addEventListener("submit", function (e) {
  // prevent the form from submitting
  e.preventDefault();

  // validate fields
  let isUsernameValid = checkUsername(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword();

  let isFormValid =
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;

  // submit to the server if the form is valid
  if (isFormValid) {
  }
});

const debounce : Function = (fn:Function, delay = 500): (...args:any)=>void => {
  let timeoutId:number;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  "input",
  debounce(function (e:any) {
    switch (e.target.id) {
      case "username":
        checkUsername();
        break;
      case "email":
        checkEmail();
        break;
      case "password":
        checkPassword();
        break;
      case "confirm-password":
        checkConfirmPassword();
        break;
    }
  })
);
