import UserLogin from "../../../Domains/authentications/entities/UserLogin.js";

class UserLoginUseCase {
  constructor({
    userRepository,
    passwordHash,
    tokenManager,
    authenticationRepository,
  }) {
    this._userRepository = userRepository;
    this._passwordHash = passwordHash;
    this._tokenManager = tokenManager;
    this._authenticationRepository = authenticationRepository;
  }

  async execute(useCasePayload) {
    const userLogin = new UserLogin(useCasePayload);

    const user = await this._userRepository.getPasswordByUsername(
      userLogin.username,
    );

    await this._passwordHash.compare(userLogin.password, user.password);

    const accessToken = await this._tokenManager.createAccessToken({
      id: user.id,
    });
    const refreshToken = await this._tokenManager.createRefreshToken({
      id: user.id,
    });

    await this._authenticationRepository.addRefreshToken(refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }
}

export default UserLoginUseCase;
