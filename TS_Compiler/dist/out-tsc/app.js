"use strict";
var _a, _b, _c, _d, _e;
const usernameEl = (_a = document.querySelector("#username")) !== null && _a !== void 0 ? _a : new HTMLInputElement();
const emailEl = (_b = document.querySelector("#email")) !== null && _b !== void 0 ? _b : new HTMLInputElement();
const passwordEl = (_c = document.querySelector("#password")) !== null && _c !== void 0 ? _c : new HTMLInputElement();
const confirmPasswordEl = (_d = document.querySelector("#confirm-password")) !== null && _d !== void 0 ? _d : new HTMLInputElement();
const form = (_e = document.querySelector("#signup")) !== null && _e !== void 0 ? _e : new HTMLFormElement;
const checkUsername = () => {
    let valid = false;
    const min = 3, max = 25;
    const username = usernameEl.value.trim();
    if (!isRequired(username)) {
        showError(usernameEl, "Username cannot be blank.");
    }
    else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`);
    }
    else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};
const checkEmail = () => {
    var _a;
    let valid = false;
    const email = (_a = emailEl === null || emailEl === void 0 ? void 0 : emailEl.value.trim()) !== null && _a !== void 0 ? _a : "";
    if (!isRequired(email)) {
        showError(emailEl, "Email cannot be blank.");
    }
    else if (!isEmailValid(email)) {
        showError(emailEl, "Email is not valid.");
    }
    else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};
const checkPassword = () => {
    var _a;
    let valid = false;
    const password = (_a = passwordEl === null || passwordEl === void 0 ? void 0 : passwordEl.value.trim()) !== null && _a !== void 0 ? _a : "";
    if (!isRequired(password)) {
        showError(passwordEl, "Password cannot be blank.");
    }
    else if (!isPasswordSecure(password)) {
        showError(passwordEl, "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)");
    }
    else {
        showSuccess(passwordEl);
        valid = true;
    }
    return valid;
};
const checkConfirmPassword = () => {
    var _a, _b;
    let valid = false;
    // check confirm password
    const confirmPassword = (_a = confirmPasswordEl === null || confirmPasswordEl === void 0 ? void 0 : confirmPasswordEl.value.trim()) !== null && _a !== void 0 ? _a : "";
    const password = (_b = passwordEl.value.trim()) !== null && _b !== void 0 ? _b : "";
    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, "Please enter the password again");
    }
    else if (password !== confirmPassword) {
        showError(confirmPasswordEl, "The password does not match");
    }
    else {
        showSuccess(confirmPasswordEl);
        valid = true;
    }
    return valid;
};
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    return re.test(password);
};
const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const showError = (input, message) => {
    // get the form-field element
    var _a;
    const formField = input.parentElement;
    if (formField == null) {
        console.log("Parent null " + input.value);
        return;
    }
    // add the error class
    formField.classList.remove("success");
    formField.classList.add("error");
    // show the error message
    const error = (_a = formField.querySelector("small")) !== null && _a !== void 0 ? _a : new HTMLElement();
    error.textContent = message;
};
const showSuccess = (input) => {
    var _a;
    // get the form-field element
    const formField = input.parentElement;
    if (formField == null) {
        console.log("Parent null " + input.value);
        return;
    }
    // remove the error class
    formField.classList.remove("error");
    formField.classList.add("success");
    // hide the error message
    const error = (_a = formField.querySelector("small")) !== null && _a !== void 0 ? _a : new HTMLElement();
    error.textContent = "";
};
form.addEventListener("submit", function (e) {
    // prevent the form from submitting
    e.preventDefault();
    // validate fields
    let isUsernameValid = checkUsername(), isEmailValid = checkEmail(), isPasswordValid = checkPassword(), isConfirmPasswordValid = checkConfirmPassword();
    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;
    // submit to the server if the form is valid
    if (isFormValid) {
    }
});
const debounce = (fn, delay = 500) => {
    let timeoutId;
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
form.addEventListener("input", debounce(function (e) {
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
}));
//# sourceMappingURL=app.js.map