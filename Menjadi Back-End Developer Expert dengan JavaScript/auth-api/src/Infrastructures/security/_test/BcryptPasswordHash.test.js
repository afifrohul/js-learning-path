import { vi } from "vitest";
import bcrypt from "bcrypt";
import BcryptPasswordHash from "../BcryptPasswordHash.js";

describe("BcryptPasswordHash", () => {
  describe("hash function", () => {
    it("should encrypt password correctly", async () => {
      // Arrange
      const spyHash = vi.spyOn(bcrypt, "hash");
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);

      // Action
      const encryptedPassword = await bcryptPasswordHash.hash("plain_password");

      // Assert
      expect(typeof encryptedPassword).toEqual("string");
      expect(encryptedPassword).not.toEqual("plain_password");
      expect(spyHash).toBeCalledWith("plain_password", 10); // 10 adalah nilai saltRound default untuk BcryptPasswordHash
    });

    it("should compare password correctly", async () => {
      // Arrange
      const spyCompare = vi.spyOn(bcrypt, "compare");
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);
      const plainPassword = "plain_password";
      const hashedPassword = await bcryptPasswordHash.hash(plainPassword);

      // Action
      const isMatch = await bcryptPasswordHash.compare(
        plainPassword,
        hashedPassword,
      );

      // Assert
      expect(isMatch).toBe(true);
      expect(spyCompare).toBeCalledWith(plainPassword, hashedPassword);
    });
  });
});
