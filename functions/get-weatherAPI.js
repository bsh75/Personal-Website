// netlify/functions/get_api_key.js

exports.handler = async (event, context) => {
  // Retrieve the API key from environment variables (replace 'YOUR_API_KEY' with your actual variable name)
  const apiKey = process.env.OPEN_WEATHER_API_KEY;

  if (apiKey) {
    return {
      statusCode: 200,
      body: JSON.stringify({ apiKey }),
    };
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key not found in environment variables" }),
    };
  }
};