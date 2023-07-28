let signUpName = document.getElementById("userName");
let signUpEmail = document.getElementById("userEmail");
let signUpPassword = document.getElementById("userPassword");
let signUpSubmit = document.getElementById("signUpSubmit");
let loginEmail = document.getElementById("loginEmail");
let loginPassword = document.getElementById("loginPassword");
let loginSubmit = document.getElementById("loginSubmit");
let showName = document.getElementById("showName");
let logoutBtn = document.getElementById("logoutBtn");

// for model
let model = document.getElementById("model");
let overlay = document.getElementById("overlay");
let modelContentForValidation = document.getElementById(
  "modelContentForValidation"
);
let modelCotentForSameName = document.getElementById("modelCotentForSameName");

// regex
let regexName = /\w{3,}/;
let regexEmail = /\w+@\w+\.\w{2,}/;
let regexPassword = /.{6,}/;

let signUpList = [];

//for href

let hostname = window.location.href.split("/");
let x = hostname;
hostname = hostname[hostname.length - 1];
x.pop()
x = x.join("/")

console.log(hostname);
console.log(window.location.href);

if (window.location.href === "http://127.0.0.1:5500/") {
  window.location.href = `${x}/index.html`;
}

if (window.localStorage.getItem("signUpList") !== null) {
  signUpList = JSON.parse(window.localStorage.getItem("signUpList"));
}

if (hostname === "signUp.html") {
  signUpName.oninput = function () {
    if (signUpName.value === "") {
      signUpName.classList.remove("is-valid");
      signUpName.classList.remove("is-invalid");
    } else if (regexName.test(signUpName.value)) {
      signUpName.classList.add("is-valid");
      signUpName.classList.remove("is-invalid");
    } else {
      signUpName.classList.add("is-invalid");
      signUpName.classList.remove("is-valid");
    }
  };
  signUpEmail.oninput = function () {
    if (signUpEmail.value === "") {
      signUpEmail.classList.remove("is-valid");
      signUpEmail.classList.remove("is-invalid");
    } else if (regexEmail.test(signUpEmail.value)) {
      signUpEmail.classList.add("is-valid");
      signUpEmail.classList.remove("is-invalid");
    } else {
      signUpEmail.classList.add("is-invalid");
      signUpEmail.classList.remove("is-valid");
    }
  };
  signUpPassword.oninput = function () {
    if (signUpPassword.value === "") {
      signUpPassword.classList.remove("is-valid");
      signUpPassword.classList.remove("is-invalid");
    } else if (regexPassword.test(signUpPassword.value)) {
      signUpPassword.classList.add("is-valid");
      signUpPassword.classList.remove("is-invalid");
    } else {
      signUpPassword.classList.add("is-invalid");
      signUpPassword.classList.remove("is-valid");
    }
  };

  signUpSubmit.onclick = function () {
    let data = {
      userName: signUpName.value,
      userEmail: signUpEmail.value,
      userPassword: signUpPassword.value,
    };

    if (
      regexName.test(signUpName.value) === true &&
      regexEmail.test(signUpEmail.value) === true &&
      regexPassword.test(signUpPassword.value) === true
    ) {
      for (let i = 0; i < signUpList.length; i++) {
        if (signUpEmail.value === signUpList[i].userEmail) {
          overlay.classList.remove("d-none");
          model.classList.remove("d-none");
          modelCotentForSameName.classList.remove("d-none");
          modelContentForValidation.classList.remove("d-none");

          overlay.style.display = "block";
          model.style.display = "inline-block";
          modelCotentForSameName.style.display = "block";
          modelContentForValidation.style.display = "none";
          return;
        }
      }

      signUpList.push(data);
      window.localStorage.setItem("signUpList", JSON.stringify(signUpList));
      console.log(window.location.href);
      console.log(window.location.host);
      window.location.href = `${x}/index.html`;
    } else {
      overlay.classList.remove("d-none");
      model.classList.remove("d-none");
      modelCotentForSameName.classList.remove("d-none");
      modelContentForValidation.classList.remove("d-none");

      overlay.style.display = "block";
      model.style.display = "inline-block";
      modelCotentForSameName.style.display = "none";
      modelContentForValidation.style.display = "block";

      return false;
    }
  };
}

if (hostname === "index.html") {
  loginEmail.oninput = function () {
    if (loginEmail.value === "") {
      loginEmail.classList.remove("is-valid");
      loginEmail.classList.remove("is-invalid");
    } else if (regexEmail.test(loginEmail.value)) {
      loginEmail.classList.add("is-valid");
      loginEmail.classList.remove("is-invalid");
    } else {
      loginEmail.classList.add("is-invalid");
      loginEmail.classList.remove("is-valid");
    }
  };
  loginPassword.oninput = function () {
    if (loginPassword.value === "") {
      loginPassword.classList.remove("is-valid");
      loginPassword.classList.remove("is-invalid");
    } else if (regexPassword.test(loginPassword.value)) {
      loginPassword.classList.add("is-valid");
      loginPassword.classList.remove("is-invalid");
    } else {
      loginPassword.classList.add("is-invalid");
      loginPassword.classList.remove("is-valid");
    }
  };

  loginSubmit.onclick = function () {
    if (
      regexEmail.test(loginEmail.value) === true &&
      regexPassword.test(loginPassword.value) === true
    ) {
      console.log(signUpList.length);
      for (let i = 0; i < signUpList.length; i++) {
        if (
          loginEmail.value === signUpList[i].userEmail &&
          loginPassword.value === signUpList[i].userPassword
        ) {
          window.localStorage.setItem("username", signUpList[i].userName);
          window.location.href = `${x}/home.html`;
          return;
        }
      }
      overlay.classList.remove("d-none");
      model.classList.remove("d-none");
      modelCotentForSameName.classList.remove("d-none");
      modelContentForValidation.classList.remove("d-none");

      overlay.style.display = "block";
      model.style.display = "inline-block";
      modelCotentForSameName.style.display = "block";
      modelContentForValidation.style.display = "none";
      return;
    } else {
      overlay.classList.remove("d-none");
      model.classList.remove("d-none");
      modelCotentForSameName.classList.remove("d-none");
      modelContentForValidation.classList.remove("d-none");

      overlay.style.display = "block";
      model.style.display = "inline-block";
      modelCotentForSameName.style.display = "none";
      modelContentForValidation.style.display = "block";

      return false;
    }
  };
}

if (hostname === "home.html") {
  showName.innerHTML = window.localStorage.getItem("username");
  logoutBtn.onclick = function () {
    window.location.href = `${x}/index.html`;
  };
}

// for show model
function closeModel() {
  model.style.display = "none ";
  overlay.style.display = "none ";
}
