const { curry } = require("lodash/fp");
function makeHttpRequest({ timezone, appVersion, req, data }) {
  if (!timezone) timezone = "Australia/Brisbane";

  req.post("http://localhost:4444", data, {
    headers: { "X-User-TZ": timezone, "X-App-Version": appVersion },
  });
}
module.exports = { makeHttpRequest: curry(makeHttpRequest) };
