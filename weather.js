// const axios = require("axios");
// const apiKey = process.env.OPEN_WEATHER_API_KEY;
async function fetchHelloWorld() {
    try {
      const response = await fetch('/.netlify/functions/hello-world');
  
      if (!response.ok) { // Check if the request was successful
        throw new Error(`Network response was not ok: ${response.status}`);
      }
  
      const data = await response.text();
      console.log(data); // Output: "Hello from Netlify Functions!"
    } catch (error) {
      console.error('Error fetching data:', error); // Handle errors
    }
}

async function fetchWeatherData(latlon) {
    try {
        const encodedLatLon = encodeURIComponent(JSON.stringify(latlon));
        const response = await fetch(`/.netlify/functions/get-weatherAPI?latlon=${encodedLatLon}`);
        if (!response.ok) { // Check if the request was successful
        throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error fetching data:', error); // Handle errors
    }
}


// Function to fetch the user's current location
async function getLocation() {
    // Return a new Promise that resolves with the position or rejects with an error
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) { // Check if the Geolocation API is supported
            navigator.geolocation.getCurrentPosition(
                position => {
                    resolve(position); // Resolve the Promise with the position object
                },
                error => {
                    reject(error); // Reject the Promise with the error
                }
            );
        } else {
            reject(new Error('Geolocation is not supported by this browser'));
        }
    });
}


// Function to display the weather data on the webpage
function displayWeather(data) {
    const { name, main, weather, wind } = data; // Destructure the needed data from the response
    console.log(data);
    // Create weather summary section
    const weatherSummary = document.getElementById('weather-summary'); // Get the weather div element
    const weatherSummaryHTML = `
        <h2>${name}</h2>
        <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}">
        <p>Temperature: ${main.temp} °C</p>
        <p>Weather: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
    `;
    weatherSummary.innerHTML = weatherSummaryHTML; // Set the innerHTML of the weather div to the weather data

    const weatherDetailed = document.getElementById('weather-detailed');
    const weatherDetailedHTML = `
        <h2>${name}</h2>
        <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}">
        <p>Temperature: ${main.temp} °C  (feels like ${main.feels_like} °C)</p>
        <p>Weather: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind: ${wind.speed} m/s  Gust: ${wind.gust}%</p>
    `;
    weatherDetailed.innerHTML = weatherDetailedHTML; 
}


async function updateWeatherDisplay(latlon) {
    const weather_data = await fetchWeatherData(latlon);
    console.log(weather_data)
    displayWeather(weather_data);
}

async function getLocAndDisplayWeather() {
    const position = await getLocation(); // Await the result of getLocation
    const live_lat_lon = position.coords;
    console.log(live_lat_lon)
    updateWeatherDisplay(live_lat_lon)
}


// Start with default location (Osaka) weather showing
await fetchHelloWorld();
const default_lat_lon = { lattitude: 34.6937, longitude: 135.5023 }
// await updateWeatherDisplay(default_lat_lon);
getLocAndDisplayWeather();

// getWeather(34.6937, 135.5023, apiKey)

const currentLocButton = document.getElementById("current-location")

currentLocButton.addEventListener('click', function () {
    if (currentLocButton.innerHTML === "My Location") {
        getLocAndDisplayWeather();
        currentLocButton.innerHTML = "Return"
    } else {
        pdateWeatherDisplay(default_lat_lon);
        currentLocButton.innerHTML = "My Location"
    }
})


// Weather expansion
const weatherButton = document.getElementById("weather-expand")
const weatherSummary = document.getElementById("weather-summary")
const weatherDetailed = document.getElementById("weather-detailed")
const widgetContainer = document.getElementById("widget-container")

weatherButton.addEventListener('click', function () {
    if (weatherDetailed.style.display === 'none' || weatherDetailed.style.display === '') {
        weatherDetailed.style.display = 'flex';
        weatherSummary.style.display = 'none';
        weatherButton.innerHTML = 'x';
        widgetContainer.style.flexDirection = 'column';
    } else {
        weatherDetailed.style.display = 'none';
        weatherSummary.style.display = 'flex';
        widgetContainer.style.flexDirection = '';
        weatherButton.innerHTML = 'more';
    }
})
