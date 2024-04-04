const topNav = document.getElementById("myTopnav", toggleNav);
const closeSpans = document.getElementsByClassName("close");
const modals = document.getElementsByClassName("modal");
const topNavCenter = document.querySelector(".topnav-center");
const navLinks = topNavCenter.querySelectorAll("a");

const signUpDiv = document.getElementById("signup-form-div");
const signUpBtn = document.getElementById("signUp-btn");
const signUpSubmitBtn = document.getElementById("signUp-Submit-Btn");
const signUpForm = document.getElementById("signup-form");
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");


const leaderBoardDiv = document.getElementById("leaderBoard-div");

signUpBtn.addEventListener("click", () => {
    signUpDiv.style.display = "block";
}); 

loginBtn.addEventListener("click", ()=> {
    loginDiv.style.display = "block";
});

forgotPasswordBtn.addEventListener("click", ()=> {
    loginDiv.style.display = "none";
    forgotPasswordDiv.style.display = "block";
});

window.onclick = function(event) {
    for (let i = 0; i < modals.length; i++) {
        if (event.target === modals[i]) {
            signUpDiv.style.display = "none";
            loginDiv.style.display = "none";
            expenseFormDiv.style.display = "none";
            expenseForm.style.display="none";
            forgotPasswordDiv.style.display='none';
        }
    }
};

function toggleNav() {
    if (topNav.classList.contains("responsive")) {
        topNav.classList.remove("responsive");
    } else {
        topNav.classList.add("responsive");
    }
}

function signUpFormValidation() {
    if ( newPassword.value.trim() != '' && confirmPassword.value.trim() != '' && newPassword.value === confirmPassword.value ) {
        signUpSubmitBtn.disabled = false;
    } else {
        signUpSubmitBtn.disabled = true;
    }
}

newPassword.addEventListener("input", signUpFormValidation);
confirmPassword.addEventListener("input", signUpFormValidation);

signUpForm.addEventListener("submit" , (e)=> {
    e.preventDefault();
    const user = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: newPassword.value
    }
    registerUser(user);
});

loginForm.addEventListener("submit", (e)=> {
    e.preventDefault();
    const user = {
        email : loginEmail.value,
        password: loginPassword.value
    };
    loginUser(user);
});

async function registerUser(user)  {
    try {
        const response = await fetch(`/user/register`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                firstName : user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
            }),
        });

        if(response.status == 201) {
            console.log("New User Added");
            signUpDiv.style.display = "none";
            loginDiv.style.display = "block";
        } else if (response.status == 200){
            console.log("user Already exits");
            alert("User with same email id already Exits !!!");
        }
    } catch (error) {
        console.log(error);
    }
}

const logOutBtn = document.createElement("button");
logOutBtn.textContent = "Logout";
logOutBtn.classList.add("log");

const buyPremiumBtn = document.createElement("button");
buyPremiumBtn.textContent = "Buy Premium";
buyPremiumBtn.classList.add("reg");

const addExpensesBtn = document.createElement("button");
addExpensesBtn.textContent = "Add Expenses";
addExpensesBtn.classList.add("log");

async function loginUser(user) {
    try {
        const response = await fetch(`/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password,
            }),
        });

        if (response.status === 200) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('isLoggedIn', true);
            location.reload();
            localStorage.setItem('isPremiumUser', data.isPremiumUser);
            toggleUI();

        } else if (response.status === 401) {
            const error = await response.json();
            console.log(error);
            alert("Incorrect Password");
        } else if (response.status === 404) {
            const error = await response.json();
            console.log(error);
            alert("No user Found");
        }
        
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener("load", ()=> toggleUI());