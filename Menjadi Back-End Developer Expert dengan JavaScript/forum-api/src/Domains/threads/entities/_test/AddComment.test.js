import AddComment from "../AddComment.js";

describe("a AddComment entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      content: "abc",
      thread_id: "thread-123",
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError(
      "ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY",
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      content: 123,
      thread_id: 123,
      user_id: 123,
    };
    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError(
      "ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION",
    );
  });

  it("should create AddComment object correctly", () => {
    // Arrange
    const payload = {
      content: "abc",
      thread_id: "thread-123",
      user_id: "user-123",
    };

    // Action
    const { content, thread_id, user_id } = new AddComment(payload);

    // Assert
    expect(content).toEqual(payload.content);
    expect(thread_id).toEqual(payload.thread_id);
    expect(user_id).toEqual(payload.user_id);
  });
});
