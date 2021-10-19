// login status - active user
function showUserStatus(name){
    let active = document.getElementById("user_name");
    active.innerHTML = null;

    let p = document.createElement("p");
    p.textContent = name;
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

    let active = document.getElementById("user_name");
    active.innerHTML = null;

    let a = document.createElement("a");
    a.textContent = "Login";
    a.setAttribute('href','./login.html')
    active.append(a);

    let log = document.getElementById("logout");
    log.innerHTML = null;

    let a2 = document.createElement("a");
    a2.setAttribute('href',"./signup.html")
    a2.textContent = "signup";
    log.append(a2);
}

// login function
function login(e){
e.preventDefault();

let login_info = document.getElementById("login_info");

let username = login_info.username.value;
let password = login_info.password.value;

let obj = {
    username,
    password
  }
  let objSend = JSON.stringify(obj);

    fetch("https://masai-api-mocker.herokuapp.com/auth/login", {

            method: "POST",

            body: objSend,

            headers: {
                "Content-type": "application/json",
            },
        })

        .then((res) => {
            return res.json();
        })

        .then((res) => {
            if(res.error === true){
                alert(res.message);
            }else{
                fetchUserData(obj.username, res.token);
            }
        })
        .catch((err) => {
            alert(res.message)
        })
}

// fetch login user data
function fetchUserData(username, token){
    fetch(`https://masai-api-mocker.herokuapp.com/user/${username}`, {

            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        .then((res) => {
            return res.json();
        })

        .then((res) => {
            console.log("Res_data: ", res, token);
            if(token !== undefined){
                showUserStatus(res.name);
            }
        })
        .catch((err) => {
            // console.log("error: ", err);
            // alert(res.message)
        })
}