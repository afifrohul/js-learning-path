class AddCommentReply {
  constructor(payload) {
    this._verifyPayload(payload);

    const { content, comment_id, thread_id, user_id } = payload;

    this.content = content;
    this.comment_id = comment_id;
    this.thread_id = thread_id;
    this.user_id = user_id;
  }

  _verifyPayload({ content, comment_id, thread_id, user_id }) {
    if (!content || !comment_id || !thread_id || !user_id) {
      throw new Error("ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof content !== "string" ||
      typeof comment_id !== "string" ||
      typeof thread_id !== "string" ||
      typeof user_id !== "string"
    ) {
      throw new Error("ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

export default AddCommentReply;
