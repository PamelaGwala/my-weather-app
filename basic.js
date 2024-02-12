function updateWeather(response) {
  let temperature = document.querySelector("#degree");
  let degree = response.data.temperature.current;
  let condition = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let time = document.querySelector("#time");
  let date = new date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  time.innerHTML = formatDate(date);
  condition.innerHTML = response.data.condition.description;
  temperature.innerHTML = Math.round(degree);
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="degree-icon" />`;
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
let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", handleSearch);
