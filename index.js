// search for movies
async function moviesSearch(){
    let title = document.getElementById("searrch").value;
    let res = await fetch(`https://api.themoviedb.org/3/search/movie?&api_key=1229e943aec051105219f4ea7a80c817${"&query="}${title}`);
    let apiData = await res.json();
    console.log(apiData);
    if(apiData.results.length > 0)
        showMoviesList(apiData.results);
    else
        alert("no resut found, please check title")
}

let moviesData;

async function moviesDataAPI(){
    let res = await fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1229e943aec051105219f4ea7a80c817");
    let apiData = await res.json();
    showMoviesList(apiData.results);
    slid_show(apiData.results);
    moviesData = apiData.results;
    console.log(apiData.results);
}

moviesDataAPI();

// slid_show function
let slideShow = document.getElementById("slideShow");
function slid_show(images){

    let count = Math.round(Math.random()*20);

    let img = document.createElement("img");
        img.src = "https://image.tmdb.org/t/p/w500"+images[count].poster_path;
        slideShow.append(img);

        console.log(img)
        
    setInterval(function(){
        slideShow.innerHTML = null;
        count = Math.round(Math.random()*20);

        let img = document.createElement("img");
        img.src = "https://image.tmdb.org/t/p/original"+images[count].poster_path;
        slideShow.append(img);
        
    }, 3000);

}


function showMoviesList(data){
    let parrent = document.getElementById("moviesList");
    parrent.innerHTML = "";

    data.forEach(function(m){

        let div = document.createElement("div");
        div.setAttribute("class", "moviBox")

        let img = document.createElement("img");
        img.src = "https://image.tmdb.org/t/p/w500"+m.poster_path;

        let rating = document.createElement("p");
        rating.textContent = "imbd rating: " + m.vote_average;

        let language = document.createElement("p");
        language.textContent = "Language: " + m.original_language;

        let year = document.createElement("p");
        year.textContent = m.date;

        let name = document.createElement("p");
        name.setAttribute("class", "moviName");
        name.textContent = m.title;

        let playNow_btn = document.createElement("button");
        playNow_btn.textContent = "Play Now";

        div.append(img, rating, language, year, name, playNow_btn);

        parrent.append(div);
    })
}

// showMoviesList(moviesData);

// sorting
let highLow = document.getElementById("high_low");
highLow.addEventListener("click", sortHL);

let lowHigh = document.getElementById("low_high");
lowHigh.addEventListener("click", sortLH);

function sortHL(){
    let arr = moviesData.sort(function(a, b){
        return b.vote_average - a.vote_average;
    });
    console.log(arr);
    showMoviesList(arr);
}

function sortLH(){
    let arr = moviesData.sort(function(a, b){
        return a.vote_average - b.vote_average  ;
    });
    console.log(arr);
    showMoviesList(arr);
}

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
    a.setAttribute('href','login.html')
    active.append(a);

    let log = document.getElementById("logout");
    log.innerHTML = null;

    let a2 = document.createElement("a");
    a2.setAttribute('href',"/signup.html")
    a2.textContent = "signup";
    log.append(a2);
}