import { vi } from "vitest";
import DeleteCommentReplyUseCase from "../DeleteCommentReplyUseCase.js";
import ThreadRepository from "../../../../Domains/threads/ThreadRepository.js";

describe("DeleteCommentReplyUseCase", () => {
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

    mockThreadRepository.deleteCommentReply = vi.fn().mockResolvedValue();

    const deleteCommentReplyUseCase = new DeleteCommentReplyUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    await deleteCommentReplyUseCase.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.getCommentById).toBeCalledWith("comment-123");

    expect(mockThreadRepository.deleteCommentReply).toBeCalledWith(
      "comment-123",
    );
  });

  it("should throw error when comment not found", async () => {
    // Arrange
    const useCasePayload = {
      comment_id: "comment-123",
      user_id: "user-123",
    };

    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.getCommentById = vi.fn().mockResolvedValue(null);

    mockThreadRepository.deleteCommentReply = vi.fn();

    const deleteCommentReplyUseCase = new DeleteCommentReplyUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action & Assert
    await expect(
      deleteCommentReplyUseCase.execute(useCasePayload),
    ).rejects.toThrowError("DELETE_COMMENT.DATA_NOT_FOUND");

    expect(mockThreadRepository.deleteCommentReply).not.toBeCalled();
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

    mockThreadRepository.deleteCommentReply = vi.fn();

    const deleteCommentReplyUseCase = new DeleteCommentReplyUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action & Assert
    await expect(
      deleteCommentReplyUseCase.execute(useCasePayload),
    ).rejects.toThrowError("DELETE_COMMENT.UNAUTHORIZED");

    expect(mockThreadRepository.deleteCommentReply).not.toBeCalled();
  });
});
