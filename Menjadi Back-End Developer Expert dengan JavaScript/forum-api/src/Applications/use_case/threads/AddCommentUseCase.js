import AddComment from "../../../Domains/threads/entities/AddComment.js";

class AddCommentUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async _verifyThread(threadId) {
    return this._threadRepository.detailThread(threadId);
  }

  async execute(useCasePayload) {
    const { thread_id } = useCasePayload;
    await this._verifyThread(thread_id);

    const addComment = new AddComment(useCasePayload);
    return this._threadRepository.addComment(addComment);
  }
}

export default AddCommentUseCase;
