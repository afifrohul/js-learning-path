import AddUserUseCase from "../../../../Applications/use_case/users/AddUserUseCase.js";
import response from "../../../../Commons/utils/response.js";

class UsersController {
  constructor(container) {
    this._container = container;

    this.postUser = this.postUser.bind(this);
  }

  async postUser(req, res) {
    const addUserUseCase = this._container.getInstance(AddUserUseCase.name);
    const addedUser = await addUserUseCase.execute(req.body);

    return response(res, 201, "User berhasil ditambahkan", { addedUser });
  }
}

export default UsersController;
