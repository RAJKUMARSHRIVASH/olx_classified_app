// const baseURL = "http://localhost:8080";
const baseURL = "https://olx-classified-app.onrender.com";


document.getElementById("togSignBtn").addEventListener("click", () => {
    document.querySelector("#loginForm").style.visibility = "hidden";
    document.querySelector("#signupForm").style.visibility = "visible";

})

document.getElementById("togLogBtn").addEventListener("click", () => {
    document.querySelector("#loginForm").style.visibility = "visible";
    document.querySelector("#signupForm").style.visibility = "hidden";

})

async function signup(event) {
    event.preventDefault();
    const payload = {
        email: event.target.email.value,
        password: event.target.password.value,
        confirmPass: event.target.confirmPass.value
    }

    const fetchData = await fetch(`${baseURL}/api/user/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
    });
    const data = await fetchData.json();
    if (data.msg == "user registered successfully") {
        alert(data.msg);
        document.querySelector("#loginForm").style.visibility = "visible";
        document.querySelector("#signupForm").style.visibility = "hidden";
    }
    else {
        alert(data.msg);
    }

}
async function login(event) {
    event.preventDefault();
    const payload = {
        email: event.target.email.value,
        password: event.target.password.value
    }

    const fetchData = await fetch(`${baseURL}/api/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
    });
    const data = await fetchData.json();
    if (data.msg == "Login Successful") {
        localStorage.setItem("token", data.token);
        alert(data.msg);
        window.location.href = "./index.html"
    }
    else {
        alert(data.msg);
    }

}
