let usertab=document.querySelector("[data-userWeather]");
let searchtab=document.querySelector("[data-searchWeather]");
let  grantaccesspage=document.querySelector(".location-container");
let searchpage=document.querySelector(".form-contain");
let loadpage=document.querySelector(".load-contain");
let wheatherdata=document.querySelector(".info-contain");

let currentpage=usertab;
currentpage.classList.add("current-tab");
let API_KEY="bb0d4eddc74ff62ce3e727d8d16b495f";

getfromSessionStorage();
function switchpage(nextpage){
    if(nextpage!=currentpage){
        currentpage.classList.remove("current-tab");
        currentpage=nextpage;
        currentpage.classList.add("current-tab");
    

    if(!searchpage.classList.contains("active")){
          //kya search form wala container is invisible, if yes then make it visible
         
        grantaccesspage.classList.remove("active");
        wheatherdata.classList.remove("active");
        searchpage.classList.add("active");
    }
    else{
           //main pehle search wale tab pr tha, ab your weather tab visible karna h 
       
        searchpage.classList.remove("active");
        wheatherdata.classList.remove("active");
 //ab main your weather tab me aagya hu, toh weather bhi display karna poadega, so let's check local storage first
            //for coordinates, if we haved saved them there.
            getfromSessionStorage();
        
    }
}
}
usertab.addEventListener("click",()=>{
    switchpage(usertab);
});
searchtab.addEventListener("click",()=>{
   switchpage(searchtab);
});

// click grant access button 
const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
     
        alert("Geolocation not found");
    }
}

function showPosition(position) {

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);

}


//check if cordinates are already present in session storage
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates) {
        //agar local coordinates nahi mile
        grantaccesspage.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }

}


async function fetchUserWeatherInfo(coordinates) {
    const {lat, lon} = coordinates;
    // make grantcontainer invisible
    grantaccesspage.classList.remove("active");
    //make loader visible
    loadpage.classList.add("active");

    //API CALL
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
        const  data = await response.json();
        notfound.classList.remove("active");
        loadpage.classList.remove("active");
        wheatherdata.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        loadingScreen.classList.remove("active");
        

    }

}


function renderWeatherInfo(weatherInfo) {
    //fistly, we have to fethc the elements 

    const cityName = document.querySelector("[data-cityname]");
    const countryIcon = document.querySelector("[data-flag]");
    const desc = document.querySelector("[data-weatherdescription]");
    const weatherIcon = document.querySelector("[data-weathericon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    console.log(weatherInfo);

    //fetch values from weatherINfo object and put it UI elements
    // ? =>optinal channing operator
    cityName.innerText = weatherInfo?.name;
    // below link is another API which give flag icon on the basis of country code which present in json data
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    // below code weatherInfo?.weather?.[0]?.description; here [0] refers it store data in form of array
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    // below link is another API which give weather icon on the basis of icon code which present in json data
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
}



const searchInput = document.querySelector("[data-searchInput]");

searchpage.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "")
        return;
    else 
        fetchSearchWeatherInfo(cityName);
})

let notfound=document.querySelector(".notfound");
async function fetchSearchWeatherInfo(city) {
    loadpage.classList.add("active");
    wheatherdata.classList.remove("active");
    grantaccesspage.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        const data = await response.json();
        console.log(data);
        loadpage.classList.remove("active");
        
       
        if(data?.cod=="404")
        {
            notfound.classList.add("active");
        }
        else{
            notfound.classList.remove("active");
        wheatherdata.classList.add("active");
        renderWeatherInfo(data);}
    }
    catch(err) {
        wheatherdata.classList.remove("active");
        notfound.classList.add("active");
    }
}