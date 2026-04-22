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
    const query = {
      text: `
      SELECT
      threads.id,
      threads.title,
      threads.body,
      users.username,
      threads.created_at AS date,

      COALESCE(
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', comments.id,
            'content', comments.content,
            'username', comment_users.username,
            'date', comments.created_at
          )
        ) FILTER (WHERE comments.id IS NOT NULL),
        '[]'
      ) AS comments

    FROM threads
    JOIN users ON threads.user_id = users.id
    LEFT JOIN comments ON threads.id = comments.thread_id
    LEFT JOIN users AS comment_users ON comments.user_id = comment_users.id

    WHERE threads.id = $1

    GROUP BY threads.id, users.username;
      `,
      values: [id],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw Error("DETAIL_THREAD.DATA_NOT_FOUND");
    }

    return result.rows[0];
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

    return result.rows[0] || null;
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
}

export default ThreadRepositoryPostgres;
