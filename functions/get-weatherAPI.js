// netlify/functions/get_api_key.js

exports.handler = async (event, latlon) => {
  // Retrieve the API key from environment variables (replace 'YOUR_API_KEY' with your actual variable name)
  const apiKey = process.env.OPEN_WEATHER_API_KEY;
  const { lat, lon } = latlon;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(apiUrl); // Wait for the response
    const data = await response.json();   // Wait for the JSON parsing
    return data
  } catch (error) { 
    console.error('Fetch error uh ohhhhh:', error);
    return error
    // document.getElementById('weather-summary').innerHTML = '<h2>Error loading weather data</h2>';
  }
};
