import { vi } from "vitest";
import AddCommentReplyUseCase from "../AddCommentReplyUseCase.js";
import AddCommentReply from "../../../../Domains/threads/entities/AddCommentReply.js";
import ThreadRepository from "../../../../Domains/threads/ThreadRepository.js";

describe("AddCommentReplyUseCase", () => {
  it("should orchestrating the add comment reply action correctly", async () => {
    // Arrange
    const useCasePayload = {
      content: "Ini balasan komentar",
      thread_id: "thread-123",
      comment_id: "comment-123",
      user_id: "user-123",
    };

    const mockAddedReply = {
      id: "reply-123",
      content: useCasePayload.content,
      owner: useCasePayload.user_id,
    };

    /** create dependency */
    const mockThreadRepository = new ThreadRepository();

    /** mock needed methods */
    mockThreadRepository.detailThread = vi
      .fn()
      .mockImplementation(() => Promise.resolve());

    mockThreadRepository.getCommentById = vi
      .fn()
      .mockImplementation(() => Promise.resolve());

    mockThreadRepository.addCommentReply = vi
      .fn()
      .mockImplementation(() => Promise.resolve(mockAddedReply));

    /** create use case instance */
    const addCommentReplyUseCase = new AddCommentReplyUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const addedReply = await addCommentReplyUseCase.execute(useCasePayload);

    // Assert verify thread checked
    expect(mockThreadRepository.detailThread).toBeCalledWith(
      useCasePayload.thread_id,
    );

    // Assert verify comment checked
    expect(mockThreadRepository.getCommentById).toBeCalledWith(
      useCasePayload.comment_id,
    );

    // Assert add reply called with entity
    expect(mockThreadRepository.addCommentReply).toBeCalledWith(
      new AddCommentReply({
        content: useCasePayload.content,
        thread_id: useCasePayload.thread_id,
        comment_id: useCasePayload.comment_id,
        user_id: useCasePayload.user_id,
      }),
    );

    // Assert return value
    expect(addedReply).toStrictEqual(mockAddedReply);
  });
});
