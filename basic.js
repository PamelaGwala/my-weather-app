function updateWeather(response) {
  let temperature = document.querySelector("#degree");
  let degree = response.data.degree.current;
  let cityElement = document.querySelector("#city");

  cityElement.innerHTML = response.data.city;
  temperature.innerHTML = Math.round(degree);
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
