function makeHttpRequest({ timezone, appVersion, req }) {
  return (data) => {
    if (!timezone) timezone = "Australia/Brisbane";

    req.post("http://localhost:4444", data, {
      headers: { "X-User-TZ": timezone, "X-App-Version": appVersion },
    });
  };
}
module.exports = { makeHttpRequest };
