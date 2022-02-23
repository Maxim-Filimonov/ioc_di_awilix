const container = require("../init");
const { asValue } = require("awilix");

const req = { post: jest.fn() };

container.register("req", asValue(req));

const makeRequest = (data) => container.resolve("httpRequest")(data);
describe("makeHttpRequest", () => {
  it("adds default timezone", () => {
    const data = { hello: "world" };

    makeRequest(data);

    expect(req.post).toHaveBeenCalledWith(expect.any(String), data, {
      headers: expect.objectContaining({ "X-User-TZ": "Australia/Brisbane" }),
    });
  });

  it("adds user specified timezone", () => {
    container.register("timezone", asValue("Russia/Moscow"));
    const data = { hello: "world" };

    makeRequest(data);

    expect(req.post).toHaveBeenCalledWith(expect.any(String), data, {
      headers: expect.objectContaining({ "X-User-TZ": "Russia/Moscow" }),
    });
  });

  it("adds app version", () => {
    container.register("appVersion", asValue("fake_version"));
    const data = { hello: "world" };

    makeRequest(data);

    expect(req.post).toHaveBeenCalledWith(expect.any(String), data, {
      headers: expect.objectContaining({
        "X-App-Version": "fake_version",
      }),
    });
  });
});
