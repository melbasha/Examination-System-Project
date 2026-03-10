
if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.replace("login.html");
}


history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.go(1);
};


document.addEventListener("keydown", function (e) {
    if (e.key === "F5") {
        e.preventDefault();
    }

    if (e.ctrlKey && e.key.toLowerCase() === "r") {
        e.preventDefault();
    }
});

window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
    e.returnValue = "";
});

// Logout
function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.replace("login.html");
}

// variable
let currentIndex = 0;
let score = 0;
let userAnswers = new Array(questions.length).fill(null);

const questionTitle = document.getElementById("question-title");
const answersContainer = document.getElementById("answers");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const timerElement = document.getElementById("timer");
let markedQuestions = [];
const markBtn = document.getElementById("markBtn");
const markedList = document.getElementById("markedList");
const progressBar=document.getElementById("timer-progress");
const count =document.getElementById("count")

let shuffledQuestions = [...questions];
shuffleArray(shuffledQuestions);

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
// show question
function showQuestion(index) {

    let q = shuffledQuestions[index];

    questionTitle.textContent = q.text;
    answersContainer.innerHTML = "";

    q.choices.forEach((choice, i) => {

        let div = document.createElement("div");
        div.classList.add("answer");

        let input = document.createElement("input");
        input.type = "radio";
        input.name = "question";
        input.id = "choice" + i;
        input.value = i;

        let label = document.createElement("label");
        label.htmlFor = "choice" + i;
        label.textContent = choice;   

        div.appendChild(input);
        div.appendChild(label);
        answersContainer.appendChild(div);

        if (userAnswers[index] === i) {
            input.checked = true;
        }
    });

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === questions.length - 1;
    count.innerText=`Question ${index+1} of ${shuffledQuestions.length}`
}

// save answer
function saveAnswer() {
    let selected = document.querySelector("input[name='question']:checked");
    if (selected) {
        userAnswers[currentIndex] = parseInt(selected.value);
    }
}

// Next
nextBtn.addEventListener("click", () => {
    saveAnswer();
    if (currentIndex < questions.length - 1) {
        currentIndex++;
        showQuestion(currentIndex);
    }
});

// Previous
prevBtn.addEventListener("click", () => {
    saveAnswer();
    if (currentIndex > 0) {
        currentIndex--;
        showQuestion(currentIndex);
    }
});

// calculate result
function calculateScore() {
    score = 0;
    shuffledQuestions.forEach((q, i) => {
        if (userAnswers[i] === q.correctIndex) {
            score++;
        }
    });
}

// finish exam
function finishExam() {
    saveAnswer();
    calculateScore();

    localStorage.setItem("examScore", score);
    localStorage.setItem("totalQuestions", questions.length);

    localStorage.removeItem("isLoggedIn");

    window.location.replace("result.html");
}
function TimeOut() {
    saveAnswer();
    calculateScore();

    localStorage.setItem("examScore", score);
    localStorage.setItem("totalQuestions", questions.length);

    localStorage.removeItem("isLoggedIn");

    window.location.replace("timeout.html");
}

// Submit
submitBtn.addEventListener("click", () => {
    finishExam();
});


// timer

let totalTime = 1800; 
let timeLeft=totalTime;

let timerInterval = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    timerElement.textContent =
        `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

  // progress bar
  let percentage = (timeLeft / totalTime) * 100;
  progressBar.style.width = percentage + "%";


    timeLeft--;
    if (timeLeft < 0) {
        clearInterval(timerInterval);
        TimeOut();
    }

}, 1000);

function updateMarkedList() {

    markedList.innerHTML = "";

    markedQuestions.forEach((qIndex) => {

        let li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";

        let text = document.createElement("span");
        li.style.cursor = "pointer";
        li.textContent = "Question " + (qIndex + 1);

        li.addEventListener("click", () => {
            currentIndex = qIndex;
            showQuestion(currentIndex);
        });
        let removeBtn=document.createElement("button");
        removeBtn.textContent= "✖";
        removeBtn.style.marginLeft="10px";
        removeBtn.style.cursor="pointer"
        removeBtn.addEventListener("click" ,(e)=>{
            e.stopPropagation();
            markedQuestions=markedQuestions.filter(q=>q!==qIndex);
            updateMarkedList();
        });
        li.appendChild(text);
        li.appendChild(removeBtn);


        markedList.appendChild(li);
    });
    
}


markBtn.addEventListener("click", () => {

    if (!markedQuestions.includes(currentIndex)) {
        markedQuestions.push(currentIndex);
    } else {
        markedQuestions = markedQuestions.filter(q => q !== currentIndex);
    }

    updateMarkedList();
});


showQuestion(currentIndex);
