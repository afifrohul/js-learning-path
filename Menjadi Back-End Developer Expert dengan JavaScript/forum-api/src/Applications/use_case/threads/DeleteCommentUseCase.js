class DeleteCommentUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(payload) {
    const { comment_id, user_id } = payload;

    const comment = await this._threadRepository.getCommentById(comment_id);

    if (!comment) {
      throw new Error("DELETE_COMMENT.DATA_NOT_FOUND");
    }

    if (comment.user_id !== user_id) {
      throw new Error("DELETE_COMMENT.UNAUTHORIZED");
    }

    return this._threadRepository.deleteComment(comment_id);
  }
}

export default DeleteCommentUseCase;
