function updateWeather(response) {
  let temperature = document.querySelector("#degree");
  let degree = response.data.temperature.current;
  let condition = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let time = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector(".degree-icon");

  time.innerHTML = formatDate(date);
  condition.innerHTML = response.data.condition.description;
  temperature.innerHTML = Math.round(degree);
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="degree-icon" />`;

  getForecast(response.data.city);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function callCity(city) {
  let apiKey = "6c26cba55d4084oada97f3t4bbd04e3d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");

  cityElement.innerHTML = searchInput.value;

  callCity(searchInput.value);
}
function forecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"];

  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = "6c26cba55d4084oada97f3t4bbd04e3d";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div id="forecast">
          <div class="day">${forecastDay(day.time)}</div>
            <img src="${day.condition.icon_url}"class="weather-icon"
            />
          <div class="weather-temp">
            <strong>${Math.round(
              day.temperature.maximum
            )}° </strong>  ${Math.round(day.temperature.minimum)}°
          </div>
        </div>
      `;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", handleSearch);
