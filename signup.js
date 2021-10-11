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
    let act_user = JSON.parse(localStorage.getItem("login_status"));
    act_user.pop();
    localStorage.setItem("login_status", JSON.stringify(act_user));

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
// signUp function
function signUp(){

    if(localStorage.getItem("user") === null){
        localStorage.setItem("user", JSON.stringify([]));
    }

    let user_detl = JSON.parse(localStorage.getItem("user"));
    let sisignup_info = document.getElementById("signup_info");

    let name = signup_info.name.value;
    let email = signup_info.email.value;
    let co_number = signup_info.co_number.value;
    let password = signup_info.password.value;

    if(name == "" ||  email == "" || co_number == "" || password == ""){
        alert("all credential are mandatory");
    }
    else{
        let flag = true;
        for(let  i = 0; i < user_detl.length; i++){
            if(user_detl[i].email == email){
                alert("email already exist, please login");
                flag = false;
                break;
            }
        }
        if(flag == true){
            let user_obj = {
                name,
                email,
                co_number,
                password
            };
            user_detl.push(user_obj);
            localStorage.setItem("user", JSON.stringify( user_detl));
            alert("signup successfull, please login now");
        }
        location.href = './login.html';
    }
    
    signup_info.reset();
    return false;
}