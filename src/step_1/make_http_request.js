const axios = require("axios");
const appVersion = require("../version");

function makeHttpRequest(data) {
  const timezone = process.env.TZ ?? "Australia/Brisbane";
  {
  }

  axios.default.post("http://localhost:4444", data, {
    headers: { "X-User-TZ": timezone, "X-App-Version": appVersion },
  });
}
module.exports = { makeHttpRequest };
