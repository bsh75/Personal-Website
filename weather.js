const apiKey = '9e618688ddbe64c211c16dd2d2919dc4';

// Function to fetch weather data using latitude and longitude
function getWeather(lat, lon) {
    // Construct the API URL with the coordinates and API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    
    // Fetch the weather data from the API
    fetch(apiUrl)
        .then(response => response.json()) // Parse the JSON response
        .then(data => displayWeather(data)) // Call displayWeather to show the data
        .catch(error => { // Handle any errors during the fetch
            console.error('Fetch error:', error);
            document.getElementById('weather').innerHTML = '<h2>Error loading weather data</h2>';
        });
}

// Function to display the weather data on the webpage
function displayWeather(data) {
    const weatherDiv = document.getElementById('weather'); // Get the weather div element
    const { name, main, weather } = data; // Destructure the needed data from the response
    
    // Create the HTML content to display the weather data
    const weatherHTML = `
        <h2>${name}</h2>
        <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}">
        <p>Temperature: ${main.temp} °C</p>
        <p>Weather: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
    `;
    
    weatherDiv.innerHTML = weatherHTML; // Set the innerHTML of the weather div to the weather data
}

// Function to handle errors from the Geolocation API
function handleLocationError(error) {
    console.error('Geolocation error:', error); // Log the error to the console
    document.getElementById('weather').innerHTML = '<h2>Unable to retrieve location</h2>'; // Display an error message on the webpage
}

// Function to get the user's current location
function getLocation() {
    if (navigator.geolocation) { // Check if the Geolocation API is supported
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords; // Get the latitude and longitude from the position object
                console.log("latitue:", latitude, "longitude:", longitude)
                getWeather(latitude, longitude); // Fetch the weather data for the user's location
            },
            handleLocationError // Handle any errors in getting the location
        );
    } else {
        document.getElementById('weather').innerHTML = '<h2>Geolocation is not supported by this browser</h2>'; // Display a message if Geolocation is not supported
    }
}

getLocation(); // Call getLocation to start the process of fetching and displaying the weather data
