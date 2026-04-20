import { vi } from "vitest";
import GetDetailThreadUseCase from "../GetDetailThreadUseCase.js";
import ThreadRepository from "../../../../Domains/threads/ThreadRepository.js";

describe("GetDetailThreadUseCase", () => {
  it("should orchestrating the get detail thread action correctly", async () => {
    // Arrange
    const useCasePayload = "thread-123";

    const mockDetailThread = {
      id: "thread-123",
      title: "Thread Title",
      body: "Thread Body",
      date: "2021-08-08T07:19:09.775Z",
      username: "user-123",
      comments: [],
    };

    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.detailThread = vi
      .fn()
      .mockImplementation(() => Promise.resolve(mockDetailThread));

    const getDetailThreadUseCase = new GetDetailThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const detailThread = await getDetailThreadUseCase.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.detailThread).toBeCalledWith(useCasePayload);
    expect(detailThread).toStrictEqual(mockDetailThread);
  });
});
