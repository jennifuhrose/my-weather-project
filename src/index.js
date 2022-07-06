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

function displayCelsius(event) {
  event.preventDefault();
  let newTemp = ((tempMath - 32.0) * 5.0) / 9.0;
  let tempConvert = Math.round(newTemp);
  fahrenheitTemp.classList.remove("active");
  celsiusTemp.classList.add("active");
  celsiusTemp.classList.remove("inactive");
  fahrenheitTemp.classList.add("inactive");
  mainTemp.innerHTML = `${tempConvert}`;
}
function displayFahrenheit(event) {
  event.preventDefault();
  let tempConvert = Math.round(tempMath);
  fahrenheitTemp.classList.add("active");
  celsiusTemp.classList.remove("active");
  celsiusTemp.classList.add("inactive");
  fahrenheitTemp.classList.remove("inactive");
  mainTemp.innerHTML = `${tempConvert}`;
}

let tempMath = 0;

let mainTemp = document.querySelector("#main-temp");
let fahrenheitTemp = document.querySelector("#fahrenheit");
let celsiusTemp = document.querySelector("#celsius");

fahrenheitTemp.addEventListener("click", displayFahrenheit);

celsiusTemp.addEventListener("click", displayCelsius);

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

//Search Bar, Top Cities Search, & Submit Button

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
  fahrenheitTemp.classList.add("active");
  celsiusTemp.classList.remove("active");
  celsiusTemp.classList.add("inactive");
  fahrenheitTemp.classList.remove("inactive");
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
  iconDayNight(response);
  getForecast(response.data.coord);
}

function iconDayNight(response) {
  // Get weatherData from API
  let weatherData = response.data;
  /* Get suitable icon for weather */
  // Create new date representing the local Time
  const now = new Date();
  // Converto to UTC Date
  const date = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  // timezone returns shift in seconds from UTC, convert to miliseconds and add to the date epoch time to get localTime
  const millisecondsOffsetUTC = date.getTime() + weatherData.timezone * 1000;
  const localTime = new Date(millisecondsOffsetUTC);
  // Get local sun phases and convert a unix timestamp to time
  const sunrise = new Date(weatherData.sys.sunrise * 1000);
  const sunset = new Date(weatherData.sys.sunset * 1000);
  // Get correct weather icon for day/night periods
  let mainIcon = document.querySelector("#big-icon");
  if (date > sunrise && date < sunset) {
    let mainIconID = `wi wi-owm-day-${weatherData.weather[0].id}`;
    mainIcon.className = mainIconID;
  } else {
    let mainIconID = `wi wi-owm-night-${weatherData.weather[0].id}`;
    mainIcon.className = mainIconID;
  }
}

//Forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
    <span class="weather-forecast-date">${formatDay(forecastDay.dt)}</span>
    <br /><br />
    <i class="" id="forecast-${index}"></i>
    <br /><br />
    <span class="weather-forecast-temp">${Math.round(
      forecastDay.temp.day
    )}</span>°<span class="f-symbol">F</span>
    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function iconForecast(response, index) {
  // Get weatherData from API
  let forecastDay = response.data.daily;
  /* Get suitable icon for weather */
  // Create new date representing the local Time
  const now = new Date();
  // Converto to UTC Date
  const date = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  // timezone returns shift in seconds from UTC, convert to miliseconds and add to the date epoch time to get localTime
  const millisecondsOffsetUTC = date.getTime() + forecastDay.timezone * 1000;
  const localTime = new Date(millisecondsOffsetUTC);
  // Get local sun phases and convert a unix timestamp to time
  const sunrise = new Date(forecastDay.sunrise * 1000);
  const sunset = new Date(forecastDay.sunset * 1000);
  // Get correct weather icon for day/night periods
  let forecastIcon = document.querySelector(`#forecast-${index}`);
  if (date > sunrise && date < sunset) {
    let forecastIconID = `weather-forecast-icon wi wi-owm-day-${forecastDay[index].weather[0].id}`;
    forecastIcon.className = forecastIconID;
  } else {
    let forecastIconID = `weather-forecast-icon wi wi-owm-night-${forecastDay[index].weather[0].id}`;
    forecastIcon.className = forecastIconID;
  }
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "7c8d697d8d3773e49f9c0fff93db3e20";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}
