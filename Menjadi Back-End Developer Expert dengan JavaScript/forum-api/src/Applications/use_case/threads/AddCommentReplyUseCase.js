import AddCommentReply from "../../../Domains/threads/entities/AddCommentReply.js";

class AddCommentReplyUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async _verifyThread(threadId) {
    return this._threadRepository.detailThread(threadId);
  }

  async _verifyComment(commentId) {
    return this._threadRepository.getCommentById(commentId);
  }

  async execute(useCasePayload) {
    const { thread_id, comment_id } = useCasePayload;
    await this._verifyThread(thread_id);
    await this._verifyComment(comment_id);

    const addCommentReply = new AddCommentReply(useCasePayload);
    return this._threadRepository.addCommentReply(addCommentReply);
  }
}

export default AddCommentReplyUseCase;
