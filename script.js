// api call  : https://api.openweathermap.org/data/3.0/onecall?lat=${testLat}&lon=${testLon}&lang=${lang}&appid=${apiKey}  //3.0 is paid

// api call 2.0 : https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&lang={lang}

// geo coding api : https://nominatim.openstreetmap.org/search?q=Kochi&format=json

//------- whether codes -----

// Range	Meaning
// 200–232	Thunderstorm
// 300–321	Drizzle
// 500–531	Rain
// 600–622	Snow
// 700–781	Atmosphere (fog, smoke, dust)
// 800	Clear sky
// 801–804	Clouds
// -------------------------
// ------ weather icon
// Part	Meaning
// 04	Overcast clouds icon
// n	Night
// d	Day

//https://openweathermap.org/img/wn/ICON_CODE@2x.png
//for map : https://www.openstreetmap.org/export/embed.html?layer=mapnik&marker=${searchLatitude},${searchLongitude}
//------------------
//offlinedetection
setInterval(()=>{
if(!navigator.onLine){
  window.location.replace('./noInternet.html')
}
},500)

const windDirections = {
  0: "N",
  45: "NE",
  90: "E",
  135: "SE",
  180: "S",
  225: "SW",
  270: "W",
  315: "NW",
};
//------- weather codes -----
// fot text
const weatherCodes = {
  // Thunderstorm
  200: "Thunderstorm with light rain",
  201: "Thunderstorm with rain",
  202: "Thunderstorm with heavy rain",
  210: "Light thunderstorm",
  211: "Thunderstorm",
  212: "Heavy thunderstorm",
  221: "Ragged thunderstorm",
  230: "Thunderstorm with light drizzle",
  231: "Thunderstorm with drizzle",
  232: "Thunderstorm with heavy drizzle",

  // Drizzle
  300: "Light drizzle",
  301: "Drizzle",
  302: "Heavy drizzle",
  310: "Light drizzle rain",
  311: "Drizzle rain",
  312: "Heavy drizzle rain",
  313: "Shower rain and drizzle",
  314: "Heavy shower rain and drizzle",
  321: "Shower drizzle",

  // Rain
  500: "Light rain",
  501: "Moderate rain",
  502: "Heavy rain",
  503: "Very heavy rain",
  504: "Extreme rain",
  511: "Freezing rain",
  520: "Light shower rain",
  521: "Shower rain",
  522: "Heavy shower rain",
  531: "Ragged shower rain",

  // Snow
  600: "Light snow",
  601: "Snow",
  602: "Heavy snow",
  611: "Sleet",
  612: "Light shower sleet",
  613: "Shower sleet",
  615: "Light rain and snow",
  616: "Rain and snow",
  620: "Light shower snow",
  621: "Shower snow",
  622: "Heavy shower snow",

  // Atmosphere
  701: "Mist",
  711: "Smoke",
  721: "Haze",
  731: "Sand/Dust whirls", // Rain // Rain
  741: "Fog",
  751: "Sand",
  761: "Dust",
  762: "Volcanic ash",
  771: "Squalls",
  781: "Tornado",

  // Clear
  800: "Clear sky",

  // Clouds
  801: "Few clouds",
  802: "Scattered clouds",
  803: "Broken clouds",
  804: "Overcast clouds",
};

// for images 
const weatherImages = {
    // Thunderstorm
    200: "/assets/tunderStrom.jpg",
    201: "/assets/tunderStrom.jpg",
    202: "/assets/tunderStrom.jpg",
    210: "/assets/tunderStrom.jpg",
    211: "/assets/tunderStrom.jpg",
    212: "/assets/tunderStrom.jpg",
    221: "/assets/tunderStrom.jpg",
    230: "/assets/tunderStrom.jpg",
    231: "/assets/tunderStrom.jpg",
    232: "/assets/tunderStrom.jpg",
    // Drizzle
    300: "/assets/darizzle.jpg",
    301: "/assets/darizzle.jpg",
    302: "/assets/darizzle.jpg",
    310: "/assets/darizzle.jpg",
    311: "/assets/darizzle.jpg",
    312: "/assets/darizzle.jpg",
    313: "/assets/darizzle.jpg",
    314: "/assets/darizzle.jpg",
    321: "/assets/darizzle.jpg",
    // Rain
    500: "/assets/rain.png",
    501: "/assets/rain.png",
    503: "/assets/rain.png",
    504: "/assets/rain.png",
    502: "/assets/rain.png",
    511: "/assets/rain.png",
    520: "/assets/rain.png",
    521: "/assets/rain.png",
    522: "/assets/rain.png",
    531: "/assets/rain.png",
    // Snow
    600: "/assets/snow.jpg",
    601: "/assets/snow.jpg",
    602: "/assets/snow.jpg",
    611: "/assets/snow.jpg",
    612: "/assets/snow.jpg",
    613: "/assets/snow.jpg",
    615: "/assets/snow.jpg",
    616: "/assets/snow.jpg",
    620: "/assets/snow.jpg",
    621: "/assets/snow.jpg",
    622: "/assets/snow.jpg",
    // Atmosphere
    701: "/assets/alsmop.avif",
    711: "/assets/alsmop.avif",
    721: "/assets/alsmop.avif",
    731: "/assets/alsmop.avif",
    741: "/assets/alsmop.avif",
    751: "/assets/alsmop.avif",
    761: "/assets/alsmop.avif",
    762: "/assets/alsmop.avif",
    771: "/assets/alsmop.avif",
    781: "/assets/alsmop.avif",
    // Clear
    800: "/assets/clear.jpg",
    // Clouds
    801: "/assets/clody.avif",
    802: "/assets/clody.avif",
    803: "/assets/clody.avif",
    804: "/assets/clody.avif"
};
//for air quality
const airQuality = {
  1: "Good",
  2: "Fair",
  3: "Moderate",
  4: "Poor",
  5: "Very Poor"
};
//global variables
const testLat = 10.025019;
const testLon = 76.341709;

const state = "State not found";

const API_KEY = "dcf9c6fc82f5256224f4579ce6839cbc";

let lang = "en";
let Userlat = null;
let Userlon = null;
let searchLatitude = null;
let searchLongitude = null;
let searchName = null;
let searchPlace = null;
let usersearch = null;

document.getElementById('search').addEventListener('click', async () => {

    usersearch = document.getElementById('search-box').value;
    console.log(document.getElementById('search-box').value);
    
    if (!usersearch) {
        return;
    }

    const coords = await fetchCoord();

    if (!coords) {
        console.log("No coords found");
        alert('Please check your spelling')
        window.location.reload()
        return;
    }

    searchLatitude = coords.searchLat;
    searchLongitude = coords.searchLon;
    searchName = coords.searchName;
    searchPlace = coords.searchPlace;
    document.getElementById('map').src=`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(searchLongitude)-0.01}%2C${parseFloat(searchLatitude)-0.01}%2C${parseFloat(searchLongitude)+0.01}%2C${parseFloat(searchLatitude)+0.01}&layer=mapnik&marker=${searchLatitude}%2C${searchLongitude}`;
    console.log(searchLatitude, searchLongitude);
    if(usersearch!=null){
     await fetchData(searchLatitude, searchLongitude);
    }

});


//open map api for finding coords from search query

const fetchCoord = async () => {
  try {

    const mapData = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${usersearch}&format=json&addressdetails=1`
    );

    const mapResponse = await mapData.json();
     document.getElementById('search-result').style.display='flex';
     document.getElementById("full-name").textContent = mapData.name;

     console.log('mapdata');
     
     console.log(mapResponse);

   if (mapResponse.length > 0) {

      let searchLat = mapResponse[0].lat;
      let searchLon = mapResponse[0].lon;
      let searchName = mapResponse[0].display_name;
      let searchPlace = mapResponse[0].name;

      return { searchLat, searchLon, searchName, searchPlace };
}

  } catch (error) {
    console.log(error);
  }

  return null;
};

//core logic

const fetchData = async (lat, lon) => {
  let data = "";
  let searchData = "";
  let fiveDayData = "";
  let airPolution = "";
  try {
    if (usersearch==null) {
      data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=${lang}`);
      searchData = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);
      fiveDayData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      airPolution = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)

    } else {
      data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${searchLatitude}&lon=${searchLongitude}&appid=${API_KEY}&lang=${lang}`);
      searchData = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${searchLatitude}&lon=${searchLongitude}&limit=1&appid=${API_KEY}`);
      fiveDayData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${searchLatitude}&lon=${searchLongitude}&appid=${API_KEY}`);
      airPolution = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${searchLatitude}&lon=${searchLongitude}&appid=${API_KEY}`)
    }
    const response = await data.json();
    const searchRespose = await searchData.json()
    const responseFiveDays = await fiveDayData.json()
    const airquality = await airPolution.json()
    console.log('five days data full data');
    console.log(responseFiveDays);
    console.log(searchRespose);
    console.log('air condition');
    console.log(airquality);
    
    const fiveDays = responseFiveDays.list.filter(item =>item.dt_txt.includes("12:00:00"));

    fiveDays.map(data =>{
       //for rendering later  dont forget swaru

    })    
    

    if (response.cod != 200) {
      alert(`!${response.cod} weather data unavailable`);
      return;
    }
    console.log(response);
    console.log(response.name);
   

    const tempC = Math.floor(response.main.temp - 273.15); // c

    const tempF = Math.floor((tempC * 9) / 5 + 32); // f

    console.log(tempC);
    console.log(tempF);

    const API_DATA = {
      state: searchRespose[0].state, //pushed
      locationFullName: searchName, //pushed
      searchPlace: searchPlace, //pushed
      dataFrom: response.name, //
      weatherCode: response.weather[0].id, //pushed
      weatherIcon: response.weather[0].icon,
      weatherDiscription: response.weather[0].description,
      celsius: tempC + "°C", //pushed
      fahrenheit: tempF + "°F",
      Airpressure: response.main.pressure + "hpa", //pushed
      humidity: response.main.humidity + "%",
      windSpeed: response.wind.speed + " m/s", // pushed
      windDirection: response.wind.deg + "°", //pushed
      sunrise:response.sys.sunrise,
      sunset:response.sys.sunset,
      country:response.sys.country,
      airQ:airQuality[airquality.list[0].main.aqi]
    };
    
    document.querySelector('.airquality').textContent= API_DATA.airQ;
    document.getElementById('search-box').placeholder ='Location : '+ API_DATA.dataFrom;
    document.getElementById("state").textContent = API_DATA.state;
    document.getElementById("place").textContent = API_DATA.searchPlace;
    document.getElementById("full-name").textContent = API_DATA.locationFullName;
    document.getElementById("cel").textContent = API_DATA.celsius;
    document.getElementById('stroke').textContent = tempC + '°';
    document.getElementById("rain").textContent = weatherCodes[API_DATA.weatherCode];
    document.getElementById("rainimg").src =`https://openweathermap.org/img/wn/${API_DATA.weatherIcon}@2x.png`;
    document.getElementById("windspeed").textContent = API_DATA.windSpeed;
    document.getElementById("wind-direction").textContent = API_DATA.windDirection;
    document.getElementById("hpa").textContent = API_DATA.Airpressure;
    document.getElementById('c-code').textContent = API_DATA.country;
    if (!usersearch) {
      document.getElementById("place").textContent = response.name;
    }
    document.getElementById("fah").textContent = API_DATA.fahrenheit;
    //ni8 day logic
    const sunrise = API_DATA.sunrise;
    const sunset = API_DATA.sunset;

    const currentTime = Math.floor(Date.now() / 1000);

    if (currentTime >= sunrise && currentTime <= sunset) {
        document.getElementById('day').style.display = "flex";
        document.getElementById('night').style.display = "none";
        document.querySelector('.mood').textContent = '☀️'
    } else {
        document.getElementById('day').style.display = "none";
        document.getElementById('night').style.display = "flex";
        document.querySelector('.mood').textContent = '🌑'
    }


    //NEWS showing
    const getWindDirection = (deg) => {
      if (deg >= 337.5 || deg < 22.5) {
        return "N";
      } else if (deg >= 22.5 && deg < 67.5) {
        return "NE";
      } else if (deg >= 67.5 && deg < 112.5) {
        return "E";
      } else if (deg >= 112.5 && deg < 157.5) {
        return "SE";
      } else if (deg >= 157.5 && deg < 202.5) {
        return "S";
      } else if (deg >= 202.5 && deg < 247.5) {
        return "SW";
      } else if (deg >= 247.5 && deg < 292.5) {
        return "W";
      } else if (deg >= 292.5 && deg < 337.5) {
        return "NW";
      }
      return "Unknown";
    }
    document.getElementById('compass').textContent=getWindDirection(response.wind.deg)

    // image changing based on the weather code
    if(response.weather[0].id){
        document.getElementById('hero-img').src = weatherImages[response.weather[0].id];  
    } else {
        document.getElementById('hero-img').src = '/assets/default.png'
    }
    console.log(response.weather);
    
  } catch (error) {
    console.log(error);
  }
};

// user device location fetching
navigator.geolocation.getCurrentPosition(
  (position) => {
    Userlat = position.coords.latitude;
    Userlon = position.coords.longitude;
    fetchData(Userlat, Userlon); 
    document.getElementById('map').src=`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(Userlon)-0.01}%2C${parseFloat(Userlat)-0.01}%2C${parseFloat(Userlon)+0.01}%2C${parseFloat(Userlat)+0.01}&layer=mapnik&marker=${Userlat}%2C${Userlon}`;  },
  (error) => {
    if (error.message.includes("denied Geolocation")) {
      alert("Please enable your location");
    } else {
      alert(error.message);
      console.log(error.message);
    }
  },
);


setInterval(()=>{
    const time = new Date().toLocaleTimeString()
    document.getElementById('time').textContent = time;
},1000)

const month = new Date().toDateString()
document.getElementById('cal').textContent = month;

//calender ------------------------------------------

const monthYear = document.getElementById('monthYear');
const dates = document.getElementById('dates');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let currentDate = new Date();
function renderCalendar(){
    dates.innerHTML = '';
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const monthNames = [
        "January","February","March","April",
        "May","June","July","August",
        "September","October","November","December"
    ];
    monthYear.textContent =
      `${monthNames[month]} ${year}`;
    for(let i = 0; i < firstDay; i++){

        const empty = document.createElement('div');
        dates.appendChild(empty);
    }
    // dates
    for(let day = 1; day <= lastDate; day++){
        const dateBox = document.createElement('div');
        dateBox.textContent = day;
        const today = new Date();
        if(
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ){
            dateBox.classList.add('today');
        }
        dates.appendChild(dateBox);
    }
}
renderCalendar();
next.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});
prev.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});


//mobile  detection

function isPhone() {

    // modern detection
    if (navigator.userAgentData) {
        if (navigator.userAgentData.mobile) {
            return true;
        }
    }

    // fallback
    const ua = navigator.userAgent.toLowerCase();

    const mobileUA = /android|iphone|ipad|ipod/i.test(ua);

    const touch =
        ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0);

    const smallScreen = window.innerWidth < 900;

    return mobileUA || (touch && smallScreen);
}

if (isPhone()) {
    window.location.href = "./mobileDetection.html";
}







