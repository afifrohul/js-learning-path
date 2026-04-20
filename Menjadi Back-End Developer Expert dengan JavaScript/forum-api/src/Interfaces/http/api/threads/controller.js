import response from "../../../../Commons/utils/response.js";
import AddThreadUseCase from "../../../../Applications/use_case/threads/AddThreadUseCase.js";

class ThreadsController {
  constructor(container) {
    this._container = container;

    this.postThread = this.postThread.bind(this);
  }

  async postThread(req, res) {
    const { id: user_id } = req.user;
    const payload = { ...req.body, user_id };

    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const addedThread = await addThreadUseCase.execute(payload);

    return response(res, 201, "Thread berhasil dibuat", { addedThread });
  }
}

export default ThreadsController;
