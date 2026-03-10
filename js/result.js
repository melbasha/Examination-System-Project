// if (!localStorage.getItem("examScore")) {
//     window.location.replace("login.html");
// }

// let score = localStorage.getItem("examScore");
// let total = localStorage.getItem("totalQuestions");

// document.getElementById("resultText").textContent =
//     score + " / " + total;

//     localStorage.removeItem("examScore");
//     localStorage.removeItem("totalQuestions");

// function goToLogin() {
//     window.location.replace("login.html");
// }

if (!localStorage.getItem("examScore")) {
  window.location.replace("login.html");
}

let score = Number(localStorage.getItem("examScore"));
let total = Number(localStorage.getItem("totalQuestions"));

document.getElementById("resultText").textContent = score + " / " + total;
let percent = Math.round((score / total) * 100);
document.getElementById("percentText").innerText = percent + " %";
let msg = "";
if (percent >= 80) {
  msg = "Excellent";
  document.getElementById("message").style.color = "green";
} else if (percent >= 50) {
  msg = "Good Job";
  document.getElementById("message").style.color = "orange";
} else {
  msg = "Hard Luck";
  document.getElementById("message").style.color = "red";
}

document.getElementById("message").innerText = msg;

localStorage.removeItem("examScore");
localStorage.removeItem("totalQuestions");

function goToLogin() {
  window.location.replace("login.html");
}
