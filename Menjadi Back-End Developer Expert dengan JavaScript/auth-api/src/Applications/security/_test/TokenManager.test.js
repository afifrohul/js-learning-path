import TokenManager from "../TokenManager";

describe("TokenManager interface", () => {
  it("should throw error when invoke abstrack behavior", async () => {
    // Arrange
    const tokenManager = new TokenManager();

    // Action & Assert
    await expect(tokenManager.createAccessToken({})).rejects.toThrowError(
      "TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED",
    );

    await expect(tokenManager.createRefreshToken({})).rejects.toThrowError(
      "TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED",
    );

    await expect(
      tokenManager.verifyAccessToken("dummy_access_token"),
    ).rejects.toThrowError("TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED");

    await expect(
      tokenManager.verifyRefreshToken("dummy_refresh_token"),
    ).rejects.toThrowError("TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED");
  });
});
