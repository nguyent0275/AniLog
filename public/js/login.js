const login = document.querySelector(".login-link");
const register = document.querySelector(".register-link");
const forgot = document.querySelector(".forgot-link");
const close = document.querySelector(".close");
const loginSection = document.querySelector(".login");
const registerSection = document.querySelector(".register");
const forgotSection = document.querySelector(".forgot");
const spinningLoader = document.querySelector(".loader");
spinningLoader.style.display = "none";

register.addEventListener("click", (e) => {
  e.preventDefault;
  loginSection.style.display = "none";
  registerSection.style.display = "flex";
});

login.addEventListener("click", (e) => {
  e.preventDefault;
  registerSection.style.display = "none";
  loginSection.style.display = "flex";
});

forgot.addEventListener("click", (e) => {
  console.log("test");
  e.preventDefault;
  loginSection.style.display = "none";
  registerSection.style.display = "none";
  forgotSection.style.display = "flex";
});

close.addEventListener("click", () => {
  forgotSection.style.display = "none";
  loginSection.style.display = "flex";
});

const loginFormHandler = async (event) => {
  event.preventDefault(event);

  const email = document.getElementById("email-login").value.trim();
  const password = document.getElementById("password-login").value.trim();

  // login route from controller
  if (email && password) {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to Login");
    }
  }
};

const signUpFormHandler = async (event) => {
  event.preventDefault(event);

  const user_name = document.getElementById("username-signup").value.trim();
  const email = document.getElementById("email-signup").value.trim();
  const password = document.getElementById("password-signup").value.trim();
  const confirmPassword = document
    .getElementById("confirm-password-signup")
    .value.trim();

  // signup route from controller
  if (!user_name) {
    alert("Please enter a valid username");
  } else if (!email) {
    alert("Please enter a valid email");
  } else if (!password) {
    alert("Please enter a valid password");
  } else if (password !== confirmPassword) {
    alert("Passwords do not match");
  } else {
    const response = await fetch("/api/user/", {
      method: "POST",
      body: JSON.stringify({ user_name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert((await response.json()).message);
      return;
    }
  }
};

// selects the button and adds the eventhandler
document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signUpFormHandler);
