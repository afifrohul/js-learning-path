import ThreadRepository from "../../Domains/threads/ThreadRepository.js";

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(addThread) {
    const { title, body, user_id } = addThread;
    const id = `thread-${this._idGenerator()}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: "INSERT INTO threads(id, title, body, user_id, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, title, user_id AS owner",
      values: [id, title, body, user_id, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async detailThread(id) {
    const thread = await this._getThreadById(id);
    const comments = await this._getCommentsByThreadId(id);

    thread.comments = this._buildCommentTree(comments);

    return thread;
  }

  async _getThreadById(id) {
    const query = {
      text: `
      SELECT
        threads.id,
        threads.title,
        threads.body,
        threads.created_at AS date,
        users.username
      FROM threads
      JOIN users ON users.id = threads.user_id
      WHERE threads.id = $1
    `,
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error("DETAIL_THREAD.DATA_NOT_FOUND");
    }

    return result.rows[0];
  }

  async _getCommentsByThreadId(threadId) {
    const query = {
      text: `
      SELECT
        comments.id,
        comments.comment_id,
        comments.content,
        comments.created_at AS date,
        users.username
      FROM comments
      JOIN users ON users.id = comments.user_id
      WHERE comments.thread_id = $1
      ORDER BY comments.created_at ASC, comments.id ASC
    `,
      values: [threadId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  _buildCommentTree(rows) {
    const commentMap = new Map();
    const rootComments = [];

    // buat node
    rows.forEach((row) => {
      commentMap.set(row.id, {
        id: row.id,
        username: row.username,
        date: row.date,
        content: row.content,
        replies: [],
      });
    });

    // susun parent-child
    rows.forEach((row) => {
      const node = commentMap.get(row.id);

      if (!row.comment_id) {
        rootComments.push(node);
        return;
      }

      const parent = commentMap.get(row.comment_id);

      parent.replies.push(node);
    });

    return rootComments;
  }

  async addComment(addComment) {
    const { content, user_id, thread_id } = addComment;

    const id = `comment-${this._idGenerator()}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: "INSERT INTO comments(id, user_id, thread_id, content, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, content, user_id as owner",
      values: [id, user_id, thread_id, content, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getCommentById(commentId) {
    const query = {
      text: `
      SELECT id, user_id, content, thread_id
      FROM comments
      WHERE id = $1
    `,
      values: [commentId],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw Error("DETAIL_COMMENT.DATA_NOT_FOUND");
    }

    return result.rows[0];
  }

  async addCommentReply(addComment) {
    const { content, comment_id, user_id, thread_id } = addComment;
    const id = `comment-${this._idGenerator()}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: "INSERT INTO comments(id, comment_id, user_id, thread_id, content, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id, content, comment_id, user_id as owner",
      values: [
        id,
        comment_id,
        user_id,
        thread_id,
        content,
        createdAt,
        updatedAt,
      ],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async deleteComment(comment_id) {
    const deletedAt = new Date().toISOString();

    const query = {
      text: `
      UPDATE comments
      SET content = $2,
          deleted_at = $3
      WHERE id = $1
      RETURNING id
    `,
      values: [comment_id, "**komentar telah dihapus**", deletedAt],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async deleteCommentReply(comment_id) {
    const deletedAt = new Date().toISOString();

    const query = {
      text: `
      UPDATE comments
      SET content = $2,
          deleted_at = $3
      WHERE id = $1
      RETURNING id
    `,
      values: [comment_id, "**balasan telah dihapus**", deletedAt],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }
}

export default ThreadRepositoryPostgres;
