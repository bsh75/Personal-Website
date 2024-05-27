// functions/hello-world.js
exports.handler = async (event, context) => {
    return {
      statusCode: 200,
      body: "Hello, world from Netlify Functions!",
    };
  };