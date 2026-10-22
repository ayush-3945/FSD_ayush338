const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    message.className = "message";
    message.textContent = "";

    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const passVal = passwordInput.value.trim();

    if (nameVal === "") {
        nameError.textContent = "Name is required.";
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailVal === "") {
        emailError.textContent = "Email is required.";
        isValid = false;
    } else if (!emailRegex.test(emailVal)) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
    }

    if (passVal === "") {
        passwordError.textContent = "Password is required.";
        isValid = false;
    } else if (passVal.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters.";
        isValid = false;
    }

    if (isValid) {
        message.className = "message success";
        message.textContent = `Registration Successful! Welcome, ${nameVal}!`;
        form.reset();
    }
});
