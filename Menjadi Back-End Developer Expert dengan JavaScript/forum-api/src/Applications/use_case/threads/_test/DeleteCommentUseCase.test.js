import { vi } from "vitest";
import DeleteCommentUseCase from "../DeleteCommentUseCase.js";
import ThreadRepository from "../../../../Domains/threads/ThreadRepository.js";

describe("DeleteCommentUseCase", () => {
  it("should orchestrating the delete comment action correctly", async () => {
    // Arrange
    const useCasePayload = {
      threadId: "thread-123",
      commentId: "comment-123",
      owner: "user-123",
    };

    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.deleteComment = vi
      .fn()
      .mockImplementation(() => Promise.resolve());

    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    await deleteCommentUseCase.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.deleteComment).toBeCalledWith(useCasePayload);
  });
});
