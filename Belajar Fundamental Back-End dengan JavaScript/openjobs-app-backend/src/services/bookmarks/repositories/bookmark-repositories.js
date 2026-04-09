import { nanoid } from "nanoid";
import { Pool } from "pg";
import CacheService from "../../../cache/redis-service.js";

class BookmarkRepositories {
  constructor() {
    this.pool = new Pool();
    this.cacheService = new CacheService();
  }

  async getBookmarks(userId) {
    const cacheKey = `bookmarks:${userId}`;

    try {
      const result = await this.cacheService.get(cacheKey);
      const source = "cache";
      return { bookmarks: JSON.parse(result), source };
    } catch (error) {
      const query = {
        text: `
        SELECT bookmarks.id, bookmarks.user_id, bookmarks.job_id, bookmarks.created_at, users.name, users.email, jobs.title, jobs.description, jobs.job_type, jobs.experience_level, jobs.location_type, jobs.location_city, jobs.salary_min, jobs.salary_max, jobs.is_salary_visible, jobs.status, jobs.category_id, jobs.company_id
        FROM bookmarks
        JOIN jobs ON bookmarks.job_id = jobs.id
        JOIN users ON bookmarks.user_id = users.id 
        WHERE user_id = $1`,
        values: [userId],
      };

      const result = await this.pool.query(query);
      const source = "database";
      await this.cacheService.set(cacheKey, JSON.stringify(result.rows));
      return { bookmarks: result.rows, source };
    }
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
    await this.cacheService.delete(`bookmarks:${user_id}`);
    return result.rows[0];
  }

  async deleteBookmarkByUserIdAndJobId(userId, jobId) {
    const query = {
      text: "DELETE FROM bookmarks WHERE user_id = $1 AND job_id = $2 RETURNING id",
      values: [userId, jobId],
    };

    const result = await this.pool.query(query);
    await this.cacheService.delete(`bookmarks:${userId}`);
    return result.rows[0];
  }
}

export default new BookmarkRepositories();
