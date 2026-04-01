import { nanoid } from "nanoid";
import { Pool } from "pg";

class BookmarkRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async getBookmarks(userId) {
    const query = {
      text: "SELECT * FROM bookmarks WHERE user_id = $1",
      values: [userId],
    };

    const result = await this.pool.query(query);

    return result.rows;
  }

  async getBookmarkById(jobId, id) {
    const query = {
      text: "SELECT * FROM bookmarks WHERE id = $1 AND job_id = $2",
      values: [id, jobId],
    };

    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async createBookmark({ user_id, job_id }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: `INSERT INTO bookmarks(
      id, 
      user_id, 
      job_id, 
      created_at
      ) VALUES($1, $2, $3, $4) RETURNING id`,
      values: [id, user_id, job_id, createdAt],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async deleteBookmarkByUserIdAndJobId(userId, jobId) {
    const query = {
      text: "DELETE FROM bookmarks WHERE user_id = $1 AND job_id = $2 RETURNING id",
      values: [userId, jobId],
    };

    const result = await this.pool.query(query);
    return result.rows[0];
  }
}

export default new BookmarkRepositories();
