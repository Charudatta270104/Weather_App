const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherResult = document.getElementById("weatherResult");
const popupContainer = document.getElementById("popupContainer");

const loader = document.createElement("div");
loader.classList.add("loader");

function showErrorPopup(message) {
  const popup = document.createElement("div");
  popup.className = "popup-error";
  popup.textContent = message;

  popupContainer.innerHTML = "";
  popupContainer.appendChild(popup);

  setTimeout(() => popup.classList.add("show"), 100);
  setTimeout(() => {
    popup.classList.remove("show");
    setTimeout(() => popup.remove(), 300);
  }, 3000);
}

const fetchWeather = async () => {
  const city = cityInput.value.trim();
  weatherResult.innerHTML = "";

  if (city === "") {
    showErrorPopup("⚠️ Please enter a city name!");
    return;
  }

  weatherResult.appendChild(loader);

  const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${city}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "your-api-key",
      "x-rapidapi-host": "weather-api138.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    weatherResult.removeChild(loader);

    const {
      name,
      main: { temp, feels_like, pressure, humidity },
      sys: { country },
      wind: { speed },
      weather,
    } = result;

    const iconCode = weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const weatherDesc = weather[0].description;

    weatherResult.innerHTML = `
      <div class="weather-card">
        <h2>${name}, ${country}</h2>
        <img src="${iconUrl}" alt="Weather Icon" />
        <p><strong>${weatherDesc.toUpperCase()}</strong></p>
        <div class="weather-details">
          <p>🌡️ Temp: ${Math.round(temp - 273.15)}°C</p>
          <p>🤒 Feels Like: ${Math.round(feels_like - 273.15)}°C</p>
          <p>💧 Humidity: ${humidity}%</p>
          <p>💨 Wind Speed: ${speed} m/s</p>
          <p>🔵 Pressure: ${pressure} hPa</p>
        </div>
      </div>
    `;
  } catch (error) {
    weatherResult.removeChild(loader);
    showErrorPopup("❌ Failed to fetch weather data.");
  }
};

getWeatherBtn.addEventListener("click", fetchWeather);
