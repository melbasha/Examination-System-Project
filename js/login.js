let emaillogin = document.getElementById("floatingInput");
let passlogin = document.getElementById("loginfloatingPassword");
let spanlogemail = document.getElementById("loginspan");
let spanlogpass = document.getElementById("passloginspan");


// login validation
function validationEmaillogin() {
    let regex = /^[a-zA-Z][a-zA-Z0-9]{3,19}@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    let text = emaillogin.value;
    if (text === "") {
        emaillogin.style.borderColor = "red";
        spanlogemail.style.color = "red";
        spanlogemail.innerHTML = "Input is Empty";
        return false;
    }
    if (regex.test(text)) {
        console.log("Match");
        emaillogin.style.borderColor = "green";
        spanlogemail.style.color = "green";
        spanlogemail.innerHTML = "Mail Is valid";
        return true;
    } else {
        console.log("No Match");
        emaillogin.style.borderColor = "red";
        spanlogemail.style.color = "red";
        spanlogemail.innerHTML = "Email Must Be name@example.com";
        return false;
    }
}

function validationPasslogin() {
    let regex = /^[a-zA-Z0-9]{6,}$/;
    let text = passlogin.value;
    if (text === "") {
        passlogin.style.borderColor = "red";
        spanlogpass.style.color = "red";
        spanlogpass.innerHTML = "Input is Empty";
        return false;
    }
    if (regex.test(text)) {
        console.log("Match");
        passlogin.style.borderColor = "green";
        spanlogpass.style.color = "green";
        spanlogpass.innerHTML = "Password Is valid";
        return true;
    } else {
        console.log("No Match");
        passlogin.style.borderColor = "red";
        spanlogpass.style.color = "red";
        spanlogpass.innerHTML = "password is at least 6 characters long";
        return false;
    }
}


emaillogin.addEventListener("input", validationEmaillogin);
passlogin.addEventListener("input", validationPasslogin);


let loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.onsubmit = function (e) {
        e.preventDefault();

        let emailValid = validationEmaillogin();
        let passValid = validationPasslogin();

        if (emailValid && passValid) {

            let storedUser = JSON.parse(localStorage.getItem("userData"));

            if (!storedUser) {
                spanlogemail.style.color = "red";
                spanlogemail.innerHTML = "No registered account found";
                return;
            }

            if (emaillogin.value !== storedUser.email) {
                spanlogemail.style.color = "red";
                spanlogemail.innerHTML = "Email not found";
                emaillogin.style.borderColor = "red";
                return;
            }

            if (passlogin.value !== storedUser.password) {
                spanlogpass.style.color = "red";
                spanlogpass.innerHTML = "Incorrect password";
                passlogin.style.borderColor = "red";
                return;
            }

            alert("Login Successful");

            localStorage.setItem("isLoggedIn", "true");

            window.location.replace("exam.html"); 
        }
    };
}

if (localStorage.getItem("isLoggedIn") === "true") {
    window.location.replace("exam.html");
}