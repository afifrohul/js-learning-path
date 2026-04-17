class TokenManager {
  async createAccessToken(payload) {
    throw new Error("TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED");
  }

  async createRefreshToken(payload) {
    throw new Error("TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED");
  }

  async verifyAccessToken(accessToken) {
    throw new Error("TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED");
  }

  async verifyRefreshToken(refreshToken) {
    throw new Error("TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED");
  }
}

export default TokenManager;
