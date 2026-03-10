// register validation 
let fName = document.getElementById("floatingInputfirstname");
let lName = document.getElementById("floatingInputlastname");
let email = document.getElementById("floatingInputEmail");
let password = document.getElementById("floatingPassword");
let repassword = document.getElementById("floatingRePassword");
let spanfn = document.getElementById("fnspan");
let spanln = document.getElementById("lnspan");
let spanmail = document.getElementById("emailspan");
let spanpass = document.getElementById("passspan");
let repassspan = document.getElementById("repassspan");


function validationfname() {
    let regex = /^[A-Za-z]{3,15}$/;
    let text = fName.value.trim();

    if (text === "") {
        fName.style.borderColor = "red";
        spanfn.style.color = "red";
        spanfn.innerHTML = "Input is Empty";
        return false;
    }

    if (regex.test(text)) {
        fName.style.borderColor = "green";
        spanfn.style.color = "green";
        spanfn.innerHTML = "Data is valid";
        return true;
    } else {
        fName.style.borderColor = "red";
        spanfn.style.color = "red";
        spanfn.innerHTML = "First name must be 3-15 letters only";
        return false;
    }
}


function validationlname() {
    let regex = /^[A-Za-z]{3,15}$/;
    let text = lName.value.trim();

    if (text === "") {
        lName.style.borderColor = "red";
        spanln.style.color = "red";
        spanln.innerHTML = "Input is Empty";
        return false;
    }

    if (regex.test(text)) {
        lName.style.borderColor = "green";
        spanln.style.color = "green";
        spanln.innerHTML = "Data is valid";
        return true;
    } else {
        lName.style.borderColor = "red";
        spanln.style.color = "red";
        spanln.innerHTML = "Last name must be 3-15 letters only";
        return false;
    }
}


function validationEmail() {
    let regex = /^[a-zA-Z][a-zA-Z0-9]{3,19}@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    let text = email.value;
    if (text === "") {
        email.style.borderColor = "red";
        spanmail.style.color = "red";
        spanmail.innerHTML = "Input is Empty";
        return false;
    }
    if (regex.test(text)) {
        console.log("Match");
        email.style.borderColor = "green";
        spanmail.style.color = "green";
        spanmail.innerHTML = "Mail Is valid";
        return true;
    } else {
        console.log("No Match");
        email.style.borderColor = "red";
        spanmail.style.color = "red";
        spanmail.innerHTML = "Email Must Be name@example.com";
        return false;
    }
}

function validationPass() {
    let regex = /^[a-zA-Z0-9]{6,}$/;
    let text = password.value;
    if (text === "") {
        password.style.borderColor = "red";
        spanpass.style.color = "red";
        spanpass.innerHTML = "Input is Empty";
        return false;
    }
    if (regex.test(text)) {
        console.log("Match");
        password.style.borderColor = "green";
        spanpass.style.color = "green";
        spanpass.innerHTML = "Password Is valid";
        return true;
    } else {
        console.log("No Match");
        password.style.borderColor = "red";
        spanpass.style.color = "red";
        spanpass.innerHTML = "password is at least 6 characters long";
        return false;
    }
}

function validationrePass() {
    let text = repassword.value.trim();

    if (text === "") {
        repassword.style.borderColor = "red";
        repassspan.style.color = "red";
        repassspan.innerHTML = "Input is Empty";
        return false;
    }

    if (text !== password.value) {
        repassword.style.borderColor = "red";
        repassspan.style.color = "red";
        repassspan.innerHTML = "Passwords do not match";
        return false;
    }

    if (text.length < 6) {
        repassword.style.borderColor = "red";
        repassspan.style.color = "red";
        repassspan.innerHTML = "Password must be at least 6 characters";
        return false;
    }

    repassword.style.borderColor = "green";
    repassspan.style.color = "green";
    repassspan.innerHTML = "Passwords match";
    return true;
}

fName.addEventListener("input", validationfname);
lName.addEventListener("input", validationlname);
email.addEventListener("input", validationEmail);
password.addEventListener("input", validationPass);
repassword.addEventListener("input", validationrePass);



document.getElementById("registrationForm").onsubmit = function (e) {
    e.preventDefault();

    let fnValid = validationfname();
    let lnValid = validationlname();
    let emailValid = validationEmail();
    let passValid = validationPass();
    let repassValid = validationrePass();

    if (fnValid && lnValid && emailValid && passValid && repassValid) {

        let user = {
            firstName: fName.value,
            lastName: lName.value,
            email: email.value,
            password: password.value
        };

        let existingUser = JSON.parse(localStorage.getItem("userData"));

        if (existingUser && existingUser.email === email.value) {
            spanmail.style.color = "red";
            spanmail.innerHTML = "Email already exists";
            email.style.borderColor = "red";
            return;
        }

        localStorage.setItem("userData", JSON.stringify(user));

        alert("Successful registration ");

        window.location.replace("login.html");
    }
};


if (localStorage.getItem("isLoggedIn") === "true") {
    window.location.replace("exam.html");
}