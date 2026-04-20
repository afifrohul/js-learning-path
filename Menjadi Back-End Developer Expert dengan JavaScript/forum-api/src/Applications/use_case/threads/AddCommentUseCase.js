import AddCommment from "../../../Domains/threads/entities/AddComment.js";

class AddCommentUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const addComment = new AddCommment(useCasePayload);
    return this._threadRepository.addComment(addComment);
  }
}

export default AddCommentUseCase;
