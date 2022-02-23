const { makeHttpRequest } = require("./make_http_request");

jest.mock("axios");
const FAKE_VERSION = "FAKE_VERSION";
jest.mock("../version", () => FAKE_VERSION);
const axios = require("axios");

describe("makeHttpRequest", () => {
  it("adds default timezone", () => {
    const data = { hello: "world" };

    makeHttpRequest(data);

    expect(axios.default.post).toHaveBeenCalledWith(expect.any(String), data, {
      headers: expect.objectContaining({ "X-User-TZ": "Australia/Brisbane" }),
    });
  });
  it("adds user specified timezone", () => {
    process.env.TZ = "Russia/Moscow";
    const data = { hello: "world" };

    makeHttpRequest(data);

    expect(axios.default.post).toHaveBeenCalledWith(expect.any(String), data, {
      headers: expect.objectContaining({ "X-User-TZ": "Russia/Moscow" }),
    });
  });

  it("adds app version", () => {
    const data = { hello: "world" };

    makeHttpRequest(data);

    expect(axios.default.post).toHaveBeenCalledWith(expect.any(String), data, {
      headers: expect.objectContaining({
        "X-App-Version": FAKE_VERSION,
      }),
    });
  });
});
