// functions/hello-world.js
exports.handler = async (event, context) => {
  console.log("...THIS ONLY APPEARS ON SERVERSIDE CONSOLE")
    return {
      statusCode: 200,
      body: "Hello, world from Netlify Functions!",
    };
  };