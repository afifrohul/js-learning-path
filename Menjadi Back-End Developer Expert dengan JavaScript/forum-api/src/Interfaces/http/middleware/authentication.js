/* istanbul ignore file */
import response from "../../../Commons/utils/response.js";
import TokenManager from "../../../Applications/security/TokenManager.js";

const authenticateToken = (container) => async (req, res, next) => {
  const token = req.headers.authorization;

  if (token && token.startsWith("Bearer ")) {
    try {
      const tokenManager = container.getInstance(TokenManager.name);

      const user = await tokenManager.verifyAccessToken(
        token.replace("Bearer ", ""),
      );

      req.user = user;

      return next();
    } catch (error) {
      return response(res, 401, error.message, null);
    }
  }

  return response(res, 401, "Missing authentication", null);
};

export default authenticateToken;
