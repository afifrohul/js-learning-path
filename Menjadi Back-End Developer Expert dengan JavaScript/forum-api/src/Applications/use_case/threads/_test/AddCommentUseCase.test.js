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
      content: "Isi comment",
      owner: "user-123",
    };

    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.detailThread = vi
      .fn()
      .mockResolvedValue({ id: "thread-123" });

    mockThreadRepository.addComment = vi
      .fn()
      .mockResolvedValue(mockAddedComment);

    const addCommentUseCase = new AddCommentUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const addedComment = await addCommentUseCase.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.detailThread).toBeCalledWith("thread-123");

    expect(mockThreadRepository.addComment).toBeCalledWith(
      new AddComment(useCasePayload),
    );

    expect(addedComment).toStrictEqual(mockAddedComment);
  });
});
