import { vi } from "vitest";
import AddThread from "../../../../Domains/threads/entities/AddThread.js";
import ThreadRepository from "../../../../Domains/threads/ThreadRepository.js";
import AddThreadUseCase from "../AddThreadUseCase.js";

describe("AddThreadUseCase", () => {
  it("should orchestrating the add thread action correctly", async () => {
    // Arrange
    const useCasePayload = {
      title: "Judul Thread",
      body: "Isi thread",
      user_id: "user-123",
    };

    const mockAddedThread = {
      id: "thread-123",
      title: useCasePayload.title,
      owner: "user-123",
    };

    /** creating dependency */
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.addThread = vi
      .fn()
      .mockImplementation(() => Promise.resolve(mockAddedThread));

    /** creating use case instance */
    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const addedThread = await addThreadUseCase.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.addThread).toBeCalledWith(
      new AddThread({
        title: useCasePayload.title,
        body: useCasePayload.body,
        user_id: useCasePayload.user_id,
      }),
    );

    expect(addedThread).toStrictEqual(mockAddedThread);
  });
});
