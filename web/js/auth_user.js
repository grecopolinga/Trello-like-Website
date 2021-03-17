var users = [
  {
    username: "Sonson_Great",
    password: "Hakdoq12345",
  },
  {
    username: "Rambutan69",
    password: "Ehetenandayo420",
  },
  {
    username: "Shizomuyouni",
    password: "Yoasobi123",
  },
  {
    username: "Yoru_ni_kakeru",
    password: "Midnight24",
  },
  {
    username: "ArmyLover420",
    password: "DynamiteTecMix22",
  },
];

const username = document.getElementById("username");
const password = document.getElementById("password");
const form = document.getElementById("signin-form");
const error_message = document.getElementById("signin-err");

form.addEventListener("submit", (e) => {
  if (username !== "" && password !== "") {
    if (checkCreds(username.value, password.value)) {
      error_message.style.visibility = "hidden";
    } else {
      e.preventDefault();
      error_message.style.visibility = "visible";
      error_message.innerText = "Incorrect Password or User is not Valid!";
    }
  }
});

function checkCreds(username, password) {
  for (let user of users) {
    console.log("input:", username, password);
    console.log("data:", user.username, user.password);
    if (username === user.username && password === user.password) {
      return true;
    }
  }
  return false;
}
