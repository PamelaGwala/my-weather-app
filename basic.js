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
function getForecast(city) {
  let apiKey = "6c26cba55d4084oada97f3t4bbd04e3d";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      ` <div id="forecast">
          <div class="day">${day}</div>
          <div class="weather-icon">
            <img
              src="http://openweathermap.org/img/wn/50d@2x.png"
              alt=""
              width="36"
            />
          </div>
          <div class="weather-temp">
            <strong>18°</strong> 12°
          </div>
        </div>
      `;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", handleSearch);

displayForecast();
