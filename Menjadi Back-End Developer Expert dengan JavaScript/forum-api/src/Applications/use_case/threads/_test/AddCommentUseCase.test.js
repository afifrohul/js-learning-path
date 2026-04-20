import { vi } from "vitest";
import AddCommentUseCase from "../AddCommentUseCase.js";
import AddComment from "../../../../Domains/threads/entities/AddComment.js";
import ThreadRepository from "../../../../Domains/threads/ThreadRepository.js";

describe("AddCommentUseCase", () => {
  it("should orchestrating the add comment action correctly", async () => {
    // Arrange
    const useCasePayload = {
      content: "Isi comment",
      thread_id: "thread-123",
      user_id: "user-123",
    };

    const mockAddedComment = {
      id: "comment-123",
      content: useCasePayload.content,
      thread_id: useCasePayload.thread_id,
      user_id: useCasePayload.user_id,
    };

    /** creating dependency */
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.addComment = vi
      .fn()
      .mockImplementation(() => Promise.resolve(mockAddedComment));

    /** creating use case instance */
    const addCommentUseCase = new AddCommentUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const addedComment = await addCommentUseCase.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.addComment).toBeCalledWith(
      new AddComment({
        content: useCasePayload.content,
        thread_id: useCasePayload.thread_id,
        user_id: useCasePayload.user_id,
      }),
    );

    expect(addedComment).toStrictEqual(mockAddedComment);
  });
});
