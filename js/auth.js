let profileButton = document.getElementById("profileButton");
let profileMenu = document.getElementById("profileMenu");
let userInfo = document.getElementById("userInfo");
let authForm = document.getElementById("authForm");
let logoutButton = document.getElementById("logoutButton");
let Username = ""

let isAuthenticated = false;

profileButton.addEventListener("click", function () {
    profileMenu.classList.toggle("hidden");
    if (isAuthenticated) {
        userInfo.textContent = Username + ", вы авторизированы";
        authForm.classList.add("hidden");
        logoutButton.classList.remove("hidden");
    } else {
        userInfo.textContent = "";
        authForm.classList.remove("hidden");
        logoutButton.classList.add("hidden");
    }
});

authForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    isAuthenticated = true;
    localStorage.setItem("userAuthorized", isAuthenticated);
    localStorage.setItem("username", username);
    profileMenu.classList.add("hidden");

    Username = username;
    authForm.reset();
});

logoutButton.addEventListener("click", function () {
    isAuthenticated = false;
    localStorage.setItem("userAuthorized", isAuthenticated);
    userInfo.textContent = "";
    profileMenu.classList.add("hidden");
});

document.addEventListener("click", function (event) {
    if (!profileButton.contains(event.target) && !profileMenu.contains(event.target)) {
        profileMenu.classList.add("hidden");
    }
});