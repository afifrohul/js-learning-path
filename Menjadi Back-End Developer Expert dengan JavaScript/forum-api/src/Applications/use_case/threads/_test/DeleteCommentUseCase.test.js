import { vi } from "vitest";
import DeleteCommentUseCase from "../DeleteCommentUseCase.js";
import ThreadRepository from "../../../../Domains/threads/ThreadRepository.js";

describe("DeleteCommentUseCase", () => {
  it("should orchestrating delete comment action correctly", async () => {
    // Arrange
    const useCasePayload = {
      comment_id: "comment-123",
      user_id: "user-123",
    };

    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.getCommentById = vi.fn().mockResolvedValue({
      id: "comment-123",
      user_id: "user-123",
    });

    mockThreadRepository.deleteComment = vi.fn().mockResolvedValue();

    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    await deleteCommentUseCase.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.getCommentById).toBeCalledWith("comment-123");

    expect(mockThreadRepository.deleteComment).toBeCalledWith("comment-123");
  });

  it("should throw error when comment not found", async () => {
    // Arrange
    const useCasePayload = {
      comment_id: "comment-123",
      user_id: "user-123",
    };

    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.getCommentById = vi.fn().mockResolvedValue(null);

    mockThreadRepository.deleteComment = vi.fn();

    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action & Assert
    await expect(
      deleteCommentUseCase.execute(useCasePayload),
    ).rejects.toThrowError("DELETE_COMMENT.DATA_NOT_FOUND");

    expect(mockThreadRepository.deleteComment).not.toBeCalled();
  });

  it("should throw error when user not owner of comment", async () => {
    // Arrange
    const useCasePayload = {
      comment_id: "comment-123",
      user_id: "user-123",
    };

    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.getCommentById = vi.fn().mockResolvedValue({
      id: "comment-123",
      user_id: "user-999",
    });

    mockThreadRepository.deleteComment = vi.fn();

    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action & Assert
    await expect(
      deleteCommentUseCase.execute(useCasePayload),
    ).rejects.toThrowError("DELETE_COMMENT.UNAUTHORIZED");

    expect(mockThreadRepository.deleteComment).not.toBeCalled();
  });
});
