// login status - active user
if(localStorage.getItem("login_status") != null && JSON.parse(localStorage.getItem("login_status")).length > 0){
    let active = document.getElementById("user_name");
    active.innerHTML = null;

    let p = document.createElement("p");
    p.textContent ="Welcome - " + JSON.parse(localStorage.getItem("login_status"))[0];
    active.append(p);

    let log = document.getElementById("logout");
    log.innerHTML = null;

    let logout_btn = document.createElement("button");
    logout_btn.textContent = "Logout";
    logout_btn.setAttribute("id", "logout_btn")
    logout_btn.onclick = function(){
        logout();
    }

    log.append(logout_btn);
}

// LogOut
function  logout(){
    console.log("hello");
    let act_user = JSON.parse(localStorage.getItem("login_status"));
    act_user.pop();
    localStorage.setItem("login_status", JSON.stringify(act_user));

    let active = document.getElementById("user_name");
    active.innerHTML = null;

    let a = document.createElement("a");
    a.textContent = "Login";
    a.setAttribute('href','/login.html')
    active.append(a);

    let log = document.getElementById("logout");
    log.innerHTML = null;

    let a2 = document.createElement("a");
    a2.setAttribute('href',"/signup.html")
    a2.textContent = "signup";
    log.append(a2);
}

// login function
function login(){
let login_info = document.getElementById("login_info");
let email = login_info.email.value;
let password = login_info.password.value;

if(localStorage.getItem("user") === null){
    alert("user dosen't exist, please signup")
    location.href = '/signup.html';
}

let user_detl = JSON.parse(localStorage.getItem("user"));
let flag = true;

for(let i = 0; i < user_detl.length; i++){
    if(user_detl[i].email == email && user_detl[i].password == password){
        flag = false;
        alert("login success");
        
        localStorage.setItem("login_status", JSON.stringify([user_detl[i].name]));
        location.href = '/index.html';
    }
}
if(flag)
    alert("invalid Credentials");

return false;
}