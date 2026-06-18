// DOM Elements
const cityInput = document.getElementById("cityInput");
const citySelect = document.getElementById("citySelect");
const weatherBtn = document.getElementById("weatherBtn");
const weatherResult = document.getElementById("weatherResult");

// WeatherAPI Key
const apiKey = "c17a89da70c74efd93d20714261806";

// Event Listener
weatherBtn.addEventListener("click", getWeather);

// Fetch weather data from WeatherAPI
function getWeather() {
  let city = cityInput.value.trim();

  if (city === "") {
    city = citySelect.value;
  }

  // Validation
  if (city === "") {
    weatherResult.innerHTML =
      "<p>Please enter a city or select one from the list.</p>";
    return;
  }

  // Loading state
  weatherResult.innerHTML = "<p>Loading weather data...</p>";

  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const locationName = data.location.name;
      const country = data.location.country;
      const temperature = data.current.temp_c;
      const condition = data.current.condition.text;
      const icon = data.current.condition.icon;
      const updated = data.current.last_updated;

      updateBackground(condition);

      weatherResult.innerHTML = `
        <h2>${locationName}, ${country}</h2>
        <img src="https:${icon}" alt="${condition}">
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Condition:</strong> ${condition}</p>
        <p><strong>Last Updated:</strong> ${updated}</p>
      `;
    })
    .catch((error) => {
      console.error(error);

      weatherResult.innerHTML = `
        <p>Unable to load weather data.</p>
        <p>Please try again later.</p>
      `;
    });
}

// Change background color based on weather condition
function updateBackground(condition) {
  const weather = condition.toLowerCase();

  if (weather.includes("rain")) {
    document.body.style.backgroundColor = "#d6e4f0";
  } else if (weather.includes("sun") || weather.includes("clear")) {
    document.body.style.backgroundColor = "#fff4c2";
  } else if (weather.includes("cloud")) {
    document.body.style.backgroundColor = "#e5e7eb";
  } else if (weather.includes("snow")) {
    document.body.style.backgroundColor = "#eef7ff";
  } else {
    document.body.style.backgroundColor = "#f4f7fb";
  }
}