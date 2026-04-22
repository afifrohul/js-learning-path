import response from "../../../../Commons/utils/response.js";
import AddThreadUseCase from "../../../../Applications/use_case/threads/AddThreadUseCase.js";
import GetDetailThreadUseCase from "../../../../Applications/use_case/threads/GetDetailThreadUseCase.js";
import AddCommentUseCase from "../../../../Applications/use_case/threads/AddCommentUseCase.js";
import DeleteCommentUseCase from "../../../../Applications/use_case/threads/DeleteCommentUseCase.js";
class ThreadsController {
  constructor(container) {
    this._container = container;

    this.postThread = this.postThread.bind(this);
    this.postComment = this.postComment.bind(this);
    this.getDetailThread = this.getDetailThread.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  async postThread(req, res) {
    const { id: user_id } = req.user;
    const payload = { ...req.body, user_id };

    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const addedThread = await addThreadUseCase.execute(payload);

    return response(res, 201, "Thread berhasil dibuat", { addedThread });
  }

  async getDetailThread(req, res) {
    const { threadId } = req.params;

    const getDetailThreadUseCase = this._container.getInstance(
      GetDetailThreadUseCase.name,
    );
    const detailThread = await getDetailThreadUseCase.execute(threadId);

    return response(res, 200, "Detail thread berhasil diambil", {
      thread: detailThread,
    });
  }

  async postComment(req, res) {
    const { threadId } = req.params;
    const { id: user_id } = req.user;
    const payload = { ...req.body, user_id, thread_id: threadId };

    const addCommentUseCase = this._container.getInstance(
      AddCommentUseCase.name,
    );

    const addedComment = await addCommentUseCase.execute(payload);

    return response(res, 201, "Komentar berhasil dibuat", { addedComment });
  }

  async deleteComment(req, res) {
    const { commentId } = req.params;
    const { id: user_id } = req.user;
    const payload = { user_id, comment_id: commentId };

    const deleteCommentUseCase = this._container.getInstance(
      DeleteCommentUseCase.name,
    );

    const deletedComment = await deleteCommentUseCase.execute(payload);

    return response(res, 200, "Komentar berhasil dihapus", { deletedComment });
  }
}

export default ThreadsController;
