// Function to load the environment variables either from the .env file (live server) or from the hosting (netlify) environment variables
// async function loadEnvVariables() {
//     const isBrowser = typeof window !== 'undefined';

//     let apiKey;
//     if (isBrowser) {
//       apiKey = process.env.OPEN_WEATHER_API_KEY;
//       if (!apiKey) {
//         throw new Error("OPEN_WEATHER_API_KEY not found in environment variables.");
//       }
//     } else {
//       const dotenv = require('dotenv');
//       dotenv.config();
//       apiKey = process.env.OPEN_WEATHER_API_KEY;
//     }
//     return apiKey;
// }

// const apiKey = await loadEnvVariables()

const apiKey = process.env.OPEN_WEATHER_API_KEY;





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

// Example usage of getLocation() with async/await
async function getLocAndDisplayWeather() {
    try {
        const position = await getLocation(); // Await the result of getLocation
        const { latitude, longitude } = position.coords;
        console.log("position: ", position); // Log the position object
        // Now you can call getWeather with the latitude and longitude
        getWeather(latitude, longitude);
    } catch (error) {
        console.error('Error getting location:', error);
        handleLocationError(error); // Handle any errors in getting the location
    }
}

// Function to handle errors from the Geolocation API
function handleLocationError(error) {
    console.error('Geolocation error:', error); // Log the error to the console
    document.getElementById('weather-summary').innerHTML = '<h2>Unable to retrieve location</h2>'; // Display an error message on the webpage
}

// Function to fetch weather data using latitude and longitude
function getWeather(lat, lon, apiKey) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json()) // Parse the JSON response
        .then(data => displayWeather(data)) // Call displayWeather to show the data
        .catch(error => { // Handle any errors during the fetch
            console.error('Fetch error:', error);
            document.getElementById('weather-summary').innerHTML = '<h2>Error loading weather data</h2>';
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

// Call the function to fetch and display the weather at set coordinates, then if a button is clicked
// Showing Osaka coordinates
getWeather(34.6937, 135.5023, apiKey)

const currentLocButton = document.getElementById("current-location")

currentLocButton.addEventListener('click', function () {
    if (currentLocButton.innerHTML === "My Location") {
        getLocAndDisplayWeather();
        currentLocButton.innerHTML = "Return"
    } else {
        getWeather(34.6937, 135.5023);
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
