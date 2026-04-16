import UserLoginUseCase from "../../../../Applications/use_case/authentications/UserLoginUseCase.js";
import UserLogoutUseCase from "../../../../Applications/use_case/authentications/UserLogoutUseCase.js";
import RefreshAuthenticationUseCase from "../../../../Applications/use_case/authentications/RefreshAuthenticationUseCase.js";

class AuthenticationController {
  constructor(container) {
    this._container = container;

    this.login = this.login.bind(this);
    this.refreshAuthentication = this.refreshAuthentication.bind(this);
    this.logout = this.logout.bind(this);
  }

  async login(req, res) {
    const userLoginUseCase = this._container.getInstance(UserLoginUseCase.name);
    const loggedUser = await userLoginUseCase.execute(req.body);

    res.status(201).json({
      status: "success",
      data: loggedUser,
    });
  }

  async refreshAuthentication(req, res) {
    const { refreshToken } = req.body;

    const refreshAuthenticationUseCase = this._container.getInstance(
      RefreshAuthenticationUseCase.name,
    );

    const accessToken = await refreshAuthenticationUseCase.execute({
      refreshToken,
    });

    res.status(200).json({
      status: "success",
      message: "Access token berhasil diperbarui",
      data: accessToken,
    });
  }

  async logout(req, res) {
    const { refreshToken } = req.body;

    const userLogoutUseCase = this._container.getInstance(
      UserLogoutUseCase.name,
    );
    await userLogoutUseCase.execute({ refreshToken });

    res.status(200).json({
      status: "success",
      message: "Refresh token berhasil dihapus",
    });
  }
}

export default AuthenticationController;
