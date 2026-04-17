import { vi } from "vitest";
import InvariantError from "../../../../Commons/exceptions/InvariantError.js";
import AuthenticationRepository from "../../../../Domains/authentications/AuthenticationRepository.js";
import UserLogoutUseCase from "../UserLogoutUseCase.js";

describe("UserLogoutUseCase", () => {
  it("should orchestrating the logout action correctly", async () => {
    // Arrange
    const useCasePayload = {
      refreshToken: "refresh_token",
    };

    const mockAuthenticationRepository = new AuthenticationRepository();

    // mock function
    mockAuthenticationRepository.verifyRefreshToken = vi
      .fn()
      .mockImplementation(() => Promise.resolve(true));

    mockAuthenticationRepository.deleteRefreshToken = vi
      .fn()
      .mockImplementation(() => Promise.resolve());

    const userLogoutUseCase = new UserLogoutUseCase({
      authenticationRepository: mockAuthenticationRepository,
    });

    // Action
    await userLogoutUseCase.execute(useCasePayload);

    // Assert
    expect(mockAuthenticationRepository.verifyRefreshToken).toBeCalledWith(
      useCasePayload.refreshToken,
    );

    expect(mockAuthenticationRepository.deleteRefreshToken).toBeCalledWith(
      useCasePayload.refreshToken,
    );
  });

  it("should throw InvariantError when refresh token not found", async () => {
    // Arrange
    const useCasePayload = {
      refreshToken: "refresh_token",
    };

    const mockAuthenticationRepository = new AuthenticationRepository();

    mockAuthenticationRepository.verifyRefreshToken = vi
      .fn()
      .mockImplementation(() => Promise.resolve(false));

    const userLogoutUseCase = new UserLogoutUseCase({
      authenticationRepository: mockAuthenticationRepository,
    });

    // Action & Assert
    await expect(
      userLogoutUseCase.execute(useCasePayload),
    ).rejects.toThrowError(InvariantError);

    expect(mockAuthenticationRepository.verifyRefreshToken).toBeCalledWith(
      useCasePayload.refreshToken,
    );
  });
});
