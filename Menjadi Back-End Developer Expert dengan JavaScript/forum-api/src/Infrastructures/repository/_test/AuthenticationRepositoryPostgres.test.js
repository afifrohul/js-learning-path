import AuthenticationsTableTestHelper from "../../../../tests/AuthenticationsTableTestHelper.js";
import pool from "../../database/postgres/pool.js";
import AuthenticationRepositoryPostgres from "../AuthenticationRepositoryPostgres.js";

describe("AuthenticationRepositoryPostgres", () => {
  afterEach(async () => {
    await AuthenticationsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("addRefreshToken function", () => {
    it("should persist token correctly", async () => {
      // Arrange
      const repo = new AuthenticationRepositoryPostgres(pool);
      const token = "refresh_token";

      // Action
      await repo.addRefreshToken(token);

      // Assert
      const tokens = await AuthenticationsTableTestHelper.findToken(token);
      expect(tokens).toHaveLength(1);
    });
  });

  describe("verifyRefreshToken function", () => {
    it("should return token when token exists", async () => {
      // Arrange
      const repo = new AuthenticationRepositoryPostgres(pool);
      const token = "refresh_token";

      await AuthenticationsTableTestHelper.addToken(token);

      // Action
      const result = await repo.verifyRefreshToken(token);

      // Assert
      expect(result).toEqual({ token });
    });

    it("should return false when token not found", async () => {
      // Arrange
      const repo = new AuthenticationRepositoryPostgres(pool);

      // Action
      const result = await repo.verifyRefreshToken("not_exist");

      // Assert
      expect(result).toBe(false);
    });
  });

  describe("deleteRefreshToken function", () => {
    it("should delete token correctly", async () => {
      // Arrange
      const repo = new AuthenticationRepositoryPostgres(pool);
      const token = "refresh_token";

      await AuthenticationsTableTestHelper.addToken(token);

      // Action
      await repo.deleteRefreshToken(token);

      // Assert
      const tokens = await AuthenticationsTableTestHelper.findToken(token);
      expect(tokens).toHaveLength(0);
    });
  });
});
