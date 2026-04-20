/* istanbul ignore file */
import response from "../../../Commons/utils/response.js";
import JwtTokenManager from "../../../Infrastructures/security/JwtTokenManager.js";
import jwt from "jsonwebtoken";

async function authenticateToken(req, res, next) {
  const token = req.headers.authorization;
  if (token && token.indexOf("Bearer ") !== -1) {
    try {
      const jwtTokenManager = new JwtTokenManager(jwt);
      const user = await jwtTokenManager.verifyAccessToken(
        token.split("Bearer ")[1],
      );
      req.user = user;
      return next();
    } catch (error) {
      return response(res, 401, error.message, null);
    }
  }

  return response(res, 401, "Missing authentication", null);
}

export default authenticateToken;
