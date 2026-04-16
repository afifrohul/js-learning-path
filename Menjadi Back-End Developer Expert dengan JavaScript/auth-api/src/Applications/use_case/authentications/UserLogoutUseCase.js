import InvariantError from "../../../Commons/exceptions/InvariantError.js";

class UserLogoutUseCase {
  constructor({ authenticationRepository }) {
    this._authenticationRepository = authenticationRepository;
  }

  async execute(useCasePayload) {
    const { refreshToken } = useCasePayload;

    const result =
      await this._authenticationRepository.verifyRefreshToken(refreshToken);

    if (!result) {
      throw new InvariantError("refresh token tidak ditemukan di database");
    }

    await this._authenticationRepository.deleteRefreshToken(refreshToken);
  }
}

export default UserLogoutUseCase;
