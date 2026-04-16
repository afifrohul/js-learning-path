import { vi } from "vitest";
import UserRepository from "../../../../Domains/users/UserRepository.js";
import AuthenticationRepository from "../../../../Domains/authentications/AuthenticationRepository.js";
import PasswordHash from "../../../security/PasswordHash.js";
import TokenManager from "../../../security/TokenManager.js";
import UserLoginUseCase from "../UserLoginUseCase.js";

describe("UserLoginUseCase", () => {
  it("should orchestrating the user login action correctly", async () => {
    // Arrange
    const useCasePayload = {
      username: "dicoding",
      password: "secret123", // minimal 8 char sesuai entity
    };

    const mockUserFromRepo = {
      id: "user-123",
      password: "encrypted_password",
    };

    const mockAccessToken = "access_token";
    const mockRefreshToken = "refresh_token";

    /** creating dependency */
    const mockUserRepository = new UserRepository();
    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockPasswordHash = new PasswordHash();
    const mockTokenManager = new TokenManager();

    /** mocking */
    mockUserRepository.getPasswordByUsername = vi
      .fn()
      .mockResolvedValue(mockUserFromRepo);

    mockPasswordHash.compare = vi.fn().mockResolvedValue();

    mockTokenManager.createAccessToken = vi
      .fn()
      .mockReturnValue(mockAccessToken);

    mockTokenManager.createRefreshToken = vi
      .fn()
      .mockReturnValue(mockRefreshToken);

    mockAuthenticationRepository.addRefreshToken = vi.fn().mockResolvedValue();

    /** create use case */
    const userLoginUseCase = new UserLoginUseCase({
      userRepository: mockUserRepository,
      passwordHash: mockPasswordHash,
      tokenManager: mockTokenManager,
      authenticationRepository: mockAuthenticationRepository,
    });

    // Action
    const result = await userLoginUseCase.execute(useCasePayload);

    // Assert
    expect(result).toStrictEqual({
      accessToken: mockAccessToken,
      refreshToken: mockRefreshToken,
    });

    expect(mockUserRepository.getPasswordByUsername).toBeCalledWith(
      useCasePayload.username,
    );

    expect(mockPasswordHash.compare).toBeCalledWith(
      useCasePayload.password,
      mockUserFromRepo.password,
    );

    expect(mockTokenManager.createAccessToken).toBeCalledWith({
      id: mockUserFromRepo.id,
    });

    expect(mockTokenManager.createRefreshToken).toBeCalledWith({
      id: mockUserFromRepo.id,
    });

    expect(mockAuthenticationRepository.addRefreshToken).toBeCalledWith(
      mockRefreshToken,
    );
  });
});
