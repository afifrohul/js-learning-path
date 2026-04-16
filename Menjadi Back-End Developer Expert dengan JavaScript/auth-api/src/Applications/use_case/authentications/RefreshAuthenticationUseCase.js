import InvariantError from "../../../Commons/exceptions/InvariantError.js";

class RefreshAuthenticationUseCase {
  constructor({ authenticationRepository, tokenManager }) {
    this._authenticationRepository = authenticationRepository;
    this._tokenManager = tokenManager;
  }

  async execute(useCasePayload) {
    const { refreshToken } = useCasePayload;

    const result =
      await this._authenticationRepository.verifyRefreshToken(refreshToken);

    if (!result) {
      throw new InvariantError("refresh token tidak valid");
    }

    const { id } = await this._tokenManager.verifyRefreshToken(refreshToken);
    const accessToken = await this._tokenManager.createAccessToken({ id });
    return { accessToken };
  }
}

export default RefreshAuthenticationUseCase;
