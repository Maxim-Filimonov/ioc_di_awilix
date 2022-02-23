const { createContainer, asValue, asFunction } = require("awilix");
const axios = require("axios");
const { makeHttpRequest } = require("./make_http_request_ioc");

const container = createContainer();
container.register("req", asValue(axios.default));
container.register("appVersion", asValue(require("./version")));
container.register("timezone", asValue(process.env.TZ));
container.register("httpRequest", asFunction(makeHttpRequest));

module.exports = container;
