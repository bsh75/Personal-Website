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

async function fetchWeatherData(coords) {
    try {
        // Construct the URL with latitude and longitude as parameters
        console.log("Trying to send:", coords)
        const encoded_coords = JSON.stringify(coords)
        console.log("Encoded:", encoded_coords)

        const response = await fetch(`/.netlify/functions/get-weatherAPI?coords=${encoded_coords}`);
        
        // Check if the response status is OK (status code 200-299)
        if (!response.ok) { 
            // Handle specific HTTP error codes
            if (response.status === 400) {
                throw new Error("Bad Request: Invalid input or parameters.");
            } else if (response.status === 500) {
                throw new Error("Internal Server Error: Something went wrong on the server.");
            } else {
                // Generic error message for other status codes
                throw new Error(`Network response was not ok: ${response.status}`);
            }
        }

        // Parse the response as JSON
        const data = await response.json();
        return data;
    } catch (error) {
        // Log and re-throw the error to be handled by the calling code
        console.error('Error fetching weather data:', error); 
        throw error;
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


async function updateWeatherDisplay(coords) {
    const weather_data = await fetchWeatherData(coords);
    console.log("Recieved weather data:", weather_data)
    displayWeather(weather_data);
}


async function getLocAndDisplayWeather() {
    const position = await getLocation(); // Await the result of getLocation
    const coords = { latitude: position.coords.latitude, longitude: position.coords.longitude }
    // console.log("Recieved coords:", coords)
    updateWeatherDisplay(coords)
}


// Start with default location (Osaka) weather showing
// await fetchHelloWorld();
const osaka_coords = { latitude: 34.6937, longitude: 135.5023 }
// await updateWeatherDisplay(osaka_coords);
getLocAndDisplayWeather();

// getWeather(34.6937, 135.5023, apiKey)

const currentLocButton = document.getElementById("current-location")

currentLocButton.addEventListener('click', function () {
    if (currentLocButton.innerHTML === "My Location") {
        getLocAndDisplayWeather();
        currentLocButton.innerHTML = "Return"
    } else {
        updateWeatherDisplay(osaka_coords);
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
