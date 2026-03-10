if (!localStorage.getItem("examScore")) {
  window.location.replace("login.html");
}

let score = localStorage.getItem("examScore");
let total = localStorage.getItem("totalQuestions");

document.getElementById("resultText").textContent = score + " / " + total;

localStorage.removeItem("examScore");
localStorage.removeItem("totalQuestions");

function goToLogin() {
  window.location.replace("login.html");
}
