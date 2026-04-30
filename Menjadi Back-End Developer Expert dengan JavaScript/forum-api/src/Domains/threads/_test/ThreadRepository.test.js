import ThreadRepository from "../ThreadRepository.js";

describe("ThreadRepository interace", () => {
  it("should throw error when invoke abstract behavior", async () => {
    // Arrange
    const threadRepository = new ThreadRepository();

    // Action and Assert
    await expect(threadRepository.addThread({})).rejects.toThrowError(
      "THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED",
    );
    await expect(threadRepository.detailThread("")).rejects.toThrowError(
      "THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED",
    );
    await expect(threadRepository.addComment({})).rejects.toThrowError(
      "THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED",
    );
    await expect(threadRepository.getCommentById("")).rejects.toThrowError(
      "THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED",
    );
    await expect(threadRepository.addCommentReply({})).rejects.toThrowError(
      "THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED",
    );
    await expect(threadRepository.deleteComment("")).rejects.toThrowError(
      "THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED",
    );
    await expect(threadRepository.deleteCommentReply("")).rejects.toThrowError(
      "THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED",
    );
  });
});
