const { makeHttpRequest } = require("./make_http_request_ioc");

const req = { post: jest.fn() };
describe("makeHttpRequest", () => {
  it("adds default timezone", () => {
    const data = { hello: "world" };

    makeHttpRequest({ req })(data);

    expect(req.post).toHaveBeenCalledWith(expect.any(String), data, {
      headers: expect.objectContaining({ "X-User-TZ": "Australia/Brisbane" }),
    });
  });

  it("adds user specified timezone", () => {
    const data = { hello: "world" };

    makeHttpRequest({ timezone: "Russia/Moscow", req })(data);

    expect(req.post).toHaveBeenCalledWith(expect.any(String), data, {
      headers: expect.objectContaining({ "X-User-TZ": "Russia/Moscow" }),
    });
  });

  it("adds app version", () => {
    const data = { hello: "world" };

    makeHttpRequest({ req, appVersion: "fake_version" })(data);

    expect(req.post).toHaveBeenCalledWith(expect.any(String), data, {
      headers: expect.objectContaining({
        "X-App-Version": "fake_version",
      }),
    });
  });
});
