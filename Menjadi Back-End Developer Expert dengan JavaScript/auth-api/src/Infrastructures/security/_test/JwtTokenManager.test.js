import { vi } from "vitest";
import jwt from "jsonwebtoken";
import JwtTokenManager from "../JwtTokenManager.js";

describe("JwtTokenManager", () => {
  beforeEach(() => {
    process.env.ACCESS_TOKEN_KEY = "access_secret";
    process.env.EXPIRES_ACCESS_TOKEN = "3h";
  });

  describe("createAccessToken function", () => {
    it("should create access token correctly", async () => {
      // Arrange
      const spySign = vi.spyOn(jwt, "sign").mockReturnValue("access_token");

      const jwtTokenManager = new JwtTokenManager(jwt);

      // Action
      const accessToken = await jwtTokenManager.createAccessToken({
        user_id: "user-123",
      });

      // Assert
      expect(accessToken).toBe("access_token");
      expect(spySign).toBeCalledWith({ user_id: "user-123" }, "access_secret", {
        expiresIn: "3h",
      });
    });
  });

  describe("createRefreshToken function", () => {
    it("should create refresh token correctly", async () => {
      // Arrange
      process.env.REFRESH_TOKEN_KEY = "refresh_secret";

      const spySign = vi.spyOn(jwt, "sign").mockReturnValue("refresh_token");

      const jwtTokenManager = new JwtTokenManager(jwt);

      // Action
      const refreshToken = await jwtTokenManager.createRefreshToken({
        user_id: "user-123",
      });

      // Assert
      expect(refreshToken).toBe("refresh_token");
      expect(spySign).toBeCalledWith({ user_id: "user-123" }, "refresh_secret");
    });
  });

  describe("verifyAccessToken function", () => {
    it("should return payload correctly", async () => {
      // Arrange
      process.env.ACCESS_TOKEN_KEY = "access_secret";

      const spyVerify = vi.spyOn(jwt, "verify").mockReturnValue({
        user_id: "user-123",
      });

      const jwtTokenManager = new JwtTokenManager(jwt);

      // Action
      const payload = await jwtTokenManager.verifyAccessToken("token");

      // Assert
      expect(payload).toEqual({ user_id: "user-123" });
      expect(spyVerify).toBeCalledWith("token", "access_secret");
    });

    it("should throw error when token invalid", async () => {
      // Arrange
      process.env.ACCESS_TOKEN_KEY = "access_secret";

      vi.spyOn(jwt, "verify").mockImplementation(() => {
        throw new Error("invalid token");
      });

      const jwtTokenManager = new JwtTokenManager(jwt);

      // Action & Assert
      await expect(jwtTokenManager.verifyAccessToken("token")).rejects.toThrow(
        "Access token tidak valid",
      );
    });
  });

  describe("verifyRefreshToken function", () => {
    it("should return payload correctly", async () => {
      process.env.REFRESH_TOKEN_KEY = "refresh_secret";

      vi.spyOn(jwt, "verify").mockReturnValue({
        user_id: "user-123",
      });

      const jwtTokenManager = new JwtTokenManager(jwt);

      const payload = await jwtTokenManager.verifyRefreshToken("token");

      expect(payload).toEqual({ user_id: "user-123" });
    });

    it("should throw error when token invalid", async () => {
      process.env.REFRESH_TOKEN_KEY = "refresh_secret";

      vi.spyOn(jwt, "verify").mockImplementation(() => {
        throw new Error();
      });

      const jwtTokenManager = new JwtTokenManager(jwt);

      await expect(jwtTokenManager.verifyRefreshToken("token")).rejects.toThrow(
        "Refresh token tidak valid",
      );
    });
  });
});
