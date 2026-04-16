import UserLogin from "../UserLogin";

describe("a UserLogin entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    const payload = {
      username: "abc",
    };

    expect(() => new UserLogin(payload)).toThrowError(
      "LOGIN_USER.NOT_CONTAIN_NEEDED_PROPERTY",
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    const payload = {
      username: 123,
      password: true,
    };

    expect(() => new UserLogin(payload)).toThrowError(
      "LOGIN_USER.NOT_MEET_DATA_TYPE_SPECIFICATION",
    );
  });

  it("should create userLogin object correctly", () => {
    const payload = {
      username: "dicoding",
      password: "qwertyuiop",
    };

    const { username, password } = new UserLogin(payload);

    expect(username).toEqual(payload.username);
    expect(password).toEqual(payload.password);
  });
});
