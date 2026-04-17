import { vi } from "vitest";
import InvariantError from "../../../../Commons/exceptions/InvariantError.js";
import AuthenticationRepository from "../../../../Domains/authentications/AuthenticationRepository.js";
import TokenManager from "../../../security/TokenManager.js";
import RefreshAuthenticationUseCase from "../RefreshAuthenticationUseCase.js";

describe("RefreshAuthenticationUseCase", () => {
  it("should orchestrating refresh token correctly", async () => {
    // Arrange
    const useCasePayload = {
      refreshToken: "refresh_token",
    };

    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockTokenManager = new TokenManager();

    // mock function
    mockAuthenticationRepository.verifyRefreshToken = vi
      .fn()
      .mockImplementation(() => Promise.resolve(true));

    mockTokenManager.verifyRefreshToken = vi
      .fn()
      .mockImplementation(() => Promise.resolve({ id: "user-123" }));

    mockTokenManager.createAccessToken = vi
      .fn()
      .mockImplementation(() => Promise.resolve("access_token"));

    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({
      authenticationRepository: mockAuthenticationRepository,
      tokenManager: mockTokenManager,
    });

    // Action
    const accessToken =
      await refreshAuthenticationUseCase.execute(useCasePayload);

    // Assert
    expect(accessToken).toEqual({ accessToken: "access_token" });

    expect(mockAuthenticationRepository.verifyRefreshToken).toBeCalledWith(
      useCasePayload.refreshToken,
    );

    expect(mockTokenManager.verifyRefreshToken).toBeCalledWith(
      useCasePayload.refreshToken,
    );

    expect(mockTokenManager.createAccessToken).toBeCalledWith({
      id: "user-123",
    });
  });

  it("should throw InvariantError when refresh token not found in database", async () => {
    // Arrange
    const useCasePayload = {
      refreshToken: "refresh_token",
    };

    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockTokenManager = new TokenManager();

    mockAuthenticationRepository.verifyRefreshToken = vi
      .fn()
      .mockImplementation(() => Promise.resolve(false));

    // ✅ tambahkan ini
    mockTokenManager.verifyRefreshToken = vi.fn();
    mockTokenManager.createAccessToken = vi.fn();

    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({
      authenticationRepository: mockAuthenticationRepository,
      tokenManager: mockTokenManager,
    });

    // Action & Assert
    await expect(
      refreshAuthenticationUseCase.execute(useCasePayload),
    ).rejects.toThrowError(InvariantError);

    expect(mockAuthenticationRepository.verifyRefreshToken).toBeCalledWith(
      useCasePayload.refreshToken,
    );

    expect(mockTokenManager.verifyRefreshToken).not.toBeCalled();

    expect(mockTokenManager.createAccessToken).not.toBeCalled();
  });
});
