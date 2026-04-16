import UserLoginUseCase from "../../../../Applications/use_case/authentications/UserLoginUseCase.js";
import UserLogoutUseCase from "../../../../Applications/use_case/authentications/UserLogoutUseCase.js";
import RefreshAuthenticationUseCase from "../../../../Applications/use_case/authentications/RefreshAuthenticationUseCase.js";
import response from "../../../../Commons/utils/response.js";

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

    return response(res, 201, "Login berhasil", loggedUser);
  }

  async refreshAuthentication(req, res) {
    const { refreshToken } = req.body;

    const refreshAuthenticationUseCase = this._container.getInstance(
      RefreshAuthenticationUseCase.name,
    );

    const accessToken = await refreshAuthenticationUseCase.execute({
      refreshToken,
    });

    return response(res, 200, "Access token berhasil diperbarui", accessToken);
  }

  async logout(req, res) {
    const { refreshToken } = req.body;

    const userLogoutUseCase = this._container.getInstance(
      UserLogoutUseCase.name,
    );
    await userLogoutUseCase.execute({ refreshToken });

    return response(
      res,
      200,
      "Logout berhasil. Refresh token berhasil dihapus",
    );
  }
}

export default AuthenticationController;
