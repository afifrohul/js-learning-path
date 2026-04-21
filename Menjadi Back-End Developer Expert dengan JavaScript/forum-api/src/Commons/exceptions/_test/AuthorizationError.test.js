import AuthorizationError from "../AuthorizationError.js";

describe("AuthorizationError", () => {
  it("should create error correctly", () => {
    const authorizationError = new AuthorizationError("unauthorized!");

    expect(authorizationError.message).toEqual("unauthorized!");
    expect(authorizationError.statusCode).toEqual(403);
    expect(authorizationError.name).toEqual("AuthorizationError");
  });
});
