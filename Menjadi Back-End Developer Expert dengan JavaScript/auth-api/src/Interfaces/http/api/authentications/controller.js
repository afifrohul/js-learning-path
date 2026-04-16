import UserLoginUseCase from "../../../../Applications/use_case/authentications/UserLoginUseCase.js";

class AuthenticationController {
  constructor(container) {
    this._container = container;

    this.login = this.login.bind(this);
  }

  async login(req, res) {
    const userLoginUseCase = this._container.getInstance(UserLoginUseCase.name);
    const loggedUser = await userLoginUseCase.execute(req.body);

    res.status(201).json({
      status: "success",
      data: loggedUser,
    });
  }
}

export default AuthenticationController;
