//Time & Date

let cTime = new Date();

function formatDate(date) {
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let cDate = date.getDate();
  let year = date.getFullYear();
  let hour = date.getHours();
  let minute = String(date.getMinutes()).padStart(2, "0");

  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = `${day}, ${month} ${cDate} `;

  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = `${hour}:${minute}`;
}

formatDate(cTime);

//Temperature Math & Conversions

function makeCelsius(event) {
  event.preventDefault();
  let newTemp = ((tempMath - 32.0) * 5.0) / 9.0;
  let tempConvert = Math.round(newTemp);
  mainTemp.innerHTML = `${tempConvert}`;
  tempMath = newTemp;
}
function makeFahrenheit(event) {
  event.preventDefault();
  let newTemp = (tempMath * 9.0) / 5.0 + 32.0;
  let tempConvert = Math.round(newTemp);
  mainTemp.innerHTML = `${tempConvert}`;
  tempMath = newTemp;
}

let tempMath = 0;

let mainTemp = document.querySelector("#main-temp");
let fahrenheitTemp = document.querySelector("#fahrenheit");
let celsiusTemp = document.querySelector("#celsius");

fahrenheitTemp.addEventListener("click", makeFahrenheit);

celsiusTemp.addEventListener("click", makeCelsius);

//Search Bar & Submit Button

function submitSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar-proper");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${searchInput.value}`;

  search(searchInput.value);
}

function search(city) {
  let apiKey = "7c8d697d8d3773e49f9c0fff93db3e20";
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemperature);
}

search("Milwaukee");

let searchBox = document.querySelector("#search-bar-form");
searchBox.addEventListener("submit", submitSearch);

let clickMilwaukee = document.querySelector("#milwaukee");
clickMilwaukee.addEventListener("click", searchMilwaukee);

function searchMilwaukee(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = "Milwaukee";
  search("Milwaukee");
}

let clickChicago = document.querySelector("#chicago");
clickChicago.addEventListener("click", searchChicago);

function searchChicago(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = "Chicago";
  search("Chicago");
}

let clickStLouis = document.querySelector("#st-louis");
clickStLouis.addEventListener("click", searchStLouis);

function searchStLouis(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = "St Louis";
  search("St Louis");
}

let clickDenver = document.querySelector("#denver");
clickDenver.addEventListener("click", searchDenver);

function searchDenver(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = "Denver";
  search("Denver");
}

function showTemperature(response) {
  console.log(response.data);
  tempMath = response.data.main.temp;
  let tempConvert = Math.round(tempMath);
  let tempElement = document.querySelector("#main-temp");
  let descriptor = document.querySelector("#main-weather-desc");
  let cityGo = document.querySelector("#current-city");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#windspeed");
  tempElement.innerHTML = `${tempConvert}`;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  cityGo.innerHTML = response.data.name;
  descriptor.innerHTML = response.data.weather[0].description;
}

function searchCity(response) {
  document.querySelector("#main-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  axios.get(apiUrl).then(showTemperature);
}

//current location button

function searchLocation(position) {
  let apiKey = "7c8d697d8d3773e49f9c0fff93db3e20";
  let units = "imperial";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let api1Url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(api1Url).then(showTemperature);
  console.log(api1Url);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrentLocation);
