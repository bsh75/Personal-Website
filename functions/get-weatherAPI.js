// netlify/functions/get_api_key.js
// Old:

export const handler = async (event, context) => {
  // Retrieve the API key from environment variables (replace 'YOUR_API_KEY' with your actual variable name)
  const apiKey = process.env.OPEN_WEATHER_API_KEY;
  const coords = JSON.parse(event.queryStringParameters.coords);
  console.log("COORDS RECIEVED:", coords)
  const { latitude, longitude } = coords
  console.log("Lattitude:", latitude, "Longitude:", longitude)
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(apiUrl); // Wait for the response
    const data = await response.json();   // Wait for the JSON parsing
    console.log("SENDING:", data)
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Fetch error:', error);
    if (error.response && error.response.status) {
      // Handle errors with specific status codes from the API response
      return { statusCode: error.response.status, body: JSON.stringify({ error: error.message }) };
    } else {
      // Generic 500 error for other server-side errors
      return { statusCode: 500, body: JSON.stringify({ error: "Internal Server Error" }) };
    }
  }
};
