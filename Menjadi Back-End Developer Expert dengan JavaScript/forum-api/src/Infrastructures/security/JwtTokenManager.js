import TokenManager from "../../Applications/security/TokenManager.js";
import InvariantError from "../../Commons/exceptions/InvariantError.js";

class JwtTokenManager extends TokenManager {
  constructor(jwtService) {
    super();
    this._jwtService = jwtService;
  }

  async createAccessToken(payload) {
    return this._jwtService.sign(payload, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: process.env.EXPIRES_ACCESS_TOKEN,
    });
  }

  async createRefreshToken(payload) {
    return this._jwtService.sign(payload, process.env.REFRESH_TOKEN_KEY);
  }

  async verifyAccessToken(accessToken) {
    try {
      const payload = this._jwtService.verify(
        accessToken,
        process.env.ACCESS_TOKEN_KEY,
      );
      return payload;
    } catch (error) {
      throw new InvariantError("Access token tidak valid");
    }
  }

  async verifyRefreshToken(refreshToken) {
    try {
      const payload = this._jwtService.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY,
      );
      return payload;
    } catch (error) {
      throw new InvariantError("Refresh token tidak valid");
    }
  }
}

export default JwtTokenManager;
