// search for a particular movies
async function moviesSearch(){
    let title = document.getElementById("searrch").value;
    let res = await fetch(`https://api.themoviedb.org/3/search/movie?&api_key=1229e943aec051105219f4ea7a80c817${"&query="}${title}`);
    let apiData = await res.json();
    console.log(apiData);
    moviesData = apiData.results;
    if(apiData.results.length > 0)
        showMoviesList(apiData.results);
    else{
        let parrent = document.getElementById("moviesList");
        parrent.innerHTML = null;
        parrent.style.display = "flex";
        let div = document.createElement("div");
        div.setAttribute("id", "errorBox");
        let img = document.createElement("img");
        img.src = "./gif/200w.webp";
        div.append(img);
        parrent.append(div);
        alert("no resut found, please check title");
    }
}

let moviesData;
// to get top 20 popular movies
async function moviesDataAPI(){
    let res = await fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1229e943aec051105219f4ea7a80c817");
    let apiData = await res.json();
    showMoviesList(apiData.results);
    slid_show(apiData.results);
    moviesData = apiData.results;
    console.log(apiData.results);
    // Video API
    // let r = await fetch(`https://api.themoviedb.org/3/movie/${apiData.result.id}/videos?api_key=1229e943aec051105219f4ea7a80c817&append_to_response=videos`);
    // var dp = await r.json();
    // console.log("Video: " , dp);
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
// Video api link
async function videoApi(id){
    let r = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=1229e943aec051105219f4ea7a80c817&append_to_response=videos`);
    var dp = await r.json();
        // console.log("Video:", dp.results[0].key);
    return (dp.results[0].key);
        
}

// Body popular movies list
async function showMoviesList(data){
    let parrent = document.getElementById("moviesList");
    parrent.innerHTML = "";
    parrent.style.display = "grid";

    data.forEach(function(m){
        // Calling video api function

        videoApiID(m);

        async function videoApiID(m){
            let video_id= await videoApi(m.id);

            // console.log("Vid S",video_id)

            let youtubeLink = `https://www.youtube.com/watch?v=${video_id}`;
            // console.log("link", youtubeLink)

            let div = document.createElement("div");
            div.setAttribute("class", "moviBox")

            let img = document.createElement("img");
            img.src = "https://image.tmdb.org/t/p/w500"+m.poster_path;

            let rating = document.createElement("p");
            rating.textContent = "imbd rating: " + m.vote_average;

            let language = document.createElement("p");
            language.textContent = "Language: " + m.original_language;

            let year = document.createElement("p");
            year.textContent = m.release_date;

            let name = document.createElement("p");
            name.setAttribute("class", "moviName");
            name.textContent = m.title;

            let playNow_btn = document.createElement("a");
            playNow_btn.href = youtubeLink;
            playNow_btn.target = "_blank";
            let linkTag = document.createElement("button");
            linkTag.textContent = "Play Now";
            playNow_btn.append(linkTag);

            let recom = document.createElement("p");
            recom.setAttribute("id", "recomTag");
            recom.textContent = "Recomded - Must to watch";

            if(Number(m.vote_average) > 8.5){
                div.append(recom, img, rating, language, year, name, playNow_btn);
            }
            else
                div.append(img, rating, language, year, name, playNow_btn);

            parrent.append(div);

        } 
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
// ------------- Debounce ----------------------

let movies_div = document.getElementById("movies");
      let timerId;

      async function searchMovies(movie_name){
          try{
              let res = await fetch(`https://api.themoviedb.org/3/search/movie?&api_key=1229e943aec051105219f4ea7a80c817${"&query="}${movie_name}`);
              let data = await res.json(); 
              return data;
          }
          catch(e){
            //   console.log("Error: ", e);
          }
      }

      function appendMovie(movie){
          if(movie === undefined){
              return false;
          }
          movies_div.style.display = "inline";
          movies_div.innerHTML = null;
          let result = document.createElement("p");
          result.textContent = "--- searched result ---";
          movies_div.append(result);

          movie.forEach(element => {
              let p = document.createElement("p");
              p.setAttribute("class", "searchedMovies");
              p.innerText = "- " + element.title;
              p.onclick = function(){
                showMovieDet(element);
              }
              movies_div.append(p);
          });
      }

    //   After search result 
      function showMovieDet(m){

        // Video id API call
        videoApiID(m);
        async function videoApiID(m){

            let video_id= await videoApi(m.id);

            movies_div.innerHTML = null;
            movies_div.style.display = "none";

            let youtubeLink = `https://www.youtube.com/watch?v=${video_id}`;

            let parrent = document.getElementById("moviesList");
            parrent.innerHTML = null;

            let div = document.createElement("div");
            div.setAttribute("class", "moviBox")

            let div2 = document.createElement("div");
            // div2.setAttribute("class", "moviBox");

            let discription = document.createElement("p");
            discription.textContent = "Overview: " + m.overview;

            div2.append(discription);

            let img = document.createElement("img");
            img.src = "https://image.tmdb.org/t/p/w500"+m.poster_path;

            let rating = document.createElement("p");
            rating.textContent = "imbd rating: " + m.vote_average;

            let language = document.createElement("p");
            language.textContent = "Language: " + m.original_language;

            let year = document.createElement("p");
            year.textContent = m.release_date;

            let name = document.createElement("p");
            name.setAttribute("class", "moviName");
            name.textContent = m.title;

            let playNow_btn = document.createElement("a");
            playNow_btn.href = youtubeLink;
            playNow_btn.target = "_blank";
            let linkTag = document.createElement("button");
            linkTag.textContent = "Play Now";
            playNow_btn.append(linkTag);

            let recom = document.createElement("p");
            recom.setAttribute("id", "recomTag");
            recom.textContent = "Recomded - Must to watch";

            if(Number(m.vote_average) > 8.5){
                div.append(recom, img, rating, language, year, name, playNow_btn);
            }
            else
                div.append(img, rating, language, year, name, playNow_btn);

            parrent.append(div, div2);
        }
      }
      

      async function main(){
          let name = document.getElementById("searrch").value;

          if(name.length < 3){
            movies_div.innerHTML = null;
            movies_div.style.display = "none";
              return false;
          }
          let res = await searchMovies(name);
          let movie_data = res.results;
          
          appendMovie(movie_data);

          console.log("res", movie_data);
      }

    //   clear previous api call if new request came
      function debounce(func, delay){

        if(timerId){
            clearTimeout(timerId);
        }

        timerId = setTimeout(function(){
            func();
        }, delay)
      }