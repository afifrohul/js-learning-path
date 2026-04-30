import AddCommentReply from "../AddCommentReply.js";

describe("a AddCommentReply entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      content: "abc",
      thread_id: "thread-123",
    };

    // Action and Assert
    expect(() => new AddCommentReply(payload)).toThrowError(
      "ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY",
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      content: 123,
      comment_id: 123,
      thread_id: 123,
      user_id: 123,
    };
    // Action and Assert
    expect(() => new AddCommentReply(payload)).toThrowError(
      "ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION",
    );
  });

  it("should create AddCommentReply object correctly", () => {
    // Arrange
    const payload = {
      content: "abc",
      comment_id: "comment-123",
      thread_id: "thread-123",
      user_id: "user-123",
    };

    // Action
    const { content, comment_id, thread_id, user_id } = new AddCommentReply(
      payload,
    );

    // Assert
    expect(content).toEqual(payload.content);
    expect(comment_id).toEqual(payload.comment_id);
    expect(thread_id).toEqual(payload.thread_id);
    expect(user_id).toEqual(payload.user_id);
  });
});
