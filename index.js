const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");

const fetchWeather = async () => {
  let weatherResult = document.getElementById("weatherResult");
  const city = cityInput.value.trim();
  console.log(cityInput, "ccccccccccccc");
  if (city === "") {
    weatherResult.innerHTML = "please enter the city";
    return;
  }

  const url = `https://open-weather13.p.rapidapi.com/city?city=${city}&lang=EN`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "df66971006mshbd3686d60d7b781p10477cjsn7fc9bfba07be",
      "x-rapidapi-host": "open-weather13.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    weatherResult.innerHTML = result;

    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
getWeatherBtn.addEventListener("click", fetchWeather);
