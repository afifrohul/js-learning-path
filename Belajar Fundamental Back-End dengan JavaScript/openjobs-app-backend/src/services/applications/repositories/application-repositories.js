import { nanoid } from "nanoid";
import { Pool } from "pg";
import CacheService from "../../../cache/redis-service.js";

class ApplicationRepositories {
  constructor() {
    this.pool = new Pool();
    this.cacheService = new CacheService();
  }

  async getApplications() {
    const query = {
      text: `
      SELECT applications.id, applications.user_id, applications.job_id, users.name, users.email, jobs.title, jobs.description, jobs.job_type, jobs.experience_level, jobs.location_type, jobs.location_city, jobs.salary_min, jobs.salary_max
      FROM applications
      JOIN users ON applications.user_id = users.id
      JOIN jobs ON applications.job_id = jobs.id
      `,
    };

    const result = await this.pool.query(query);

    return result.rows;
  }

  async getApplicationById(id) {
    const cacheKey = `application:${id}`;

    try {
      const result = await this.cacheService.get(cacheKey);
      const source = "cache";
      return { application: JSON.parse(result), source };
    } catch (error) {
      const query = {
        text: "SELECT * FROM applications WHERE id = $1",
        values: [id],
      };

      const result = await this.pool.query(query);
      const source = "database";

      if (result.rows[0] !== undefined) {
        await this.cacheService.set(cacheKey, JSON.stringify(result.rows[0]));
      }
      return { application: result.rows[0], source };
    }
  }

  async getApplicationsByUserId(userId) {
    const cacheKey = `applications.user:${userId}`;

    try {
      const result = await this.cacheService.get(cacheKey);
      const source = "cache";
      return { applications: JSON.parse(result), source };
    } catch (error) {
      const query = {
        text: "SELECT * FROM applications WHERE user_id = $1",
        values: [userId],
      };

      const result = await this.pool.query(query);
      const source = "database";
      await this.cacheService.set(cacheKey, JSON.stringify(result.rows));
      return { applications: result.rows, source };
    }
  }

  async getApplicationsByJobId(jobId) {
    const cacheKey = `applications.job:${jobId}`;

    try {
      const result = await this.cacheService.get(cacheKey);
      const source = "cache";
      return { applications: JSON.parse(result), source };
    } catch (error) {
      const query = {
        text: "SELECT * FROM applications WHERE job_id = $1",
        values: [jobId],
      };

      const result = await this.pool.query(query);
      const source = "database";
      await this.cacheService.set(cacheKey, JSON.stringify(result.rows));
      return { applications: result.rows, source };
    }
  }

  async isExistApplication({ user_id, job_id }) {
    const query = {
      text: "SELECT id FROM applications WHERE user_id = $1 AND job_id = $2",
      values: [user_id, job_id],
    };

    const result = await this.pool.query(query);
    return result.rows.length > 0;
  }

  async createApplication({ user_id, job_id, status }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: `INSERT INTO applications(
      id, 
      user_id, 
      job_id, 
      status, 
      created_at, 
      updated_at
      ) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, user_id, job_id, status`,
      values: [id, user_id, job_id, status, createdAt, updatedAt],
    };

    const result = await this.pool.query(query);
    await this.cacheService.delete(`applications.user:${user_id}`);
    await this.cacheService.delete(`applications.job:${job_id}`);
    return result.rows[0];
  }

  async editApplicationById({ id, status }) {
    const updatedAt = new Date().toISOString();

    const query = {
      text: `UPDATE applications SET
        status = $2,
        updated_at = $3
      WHERE id = $1
      RETURNING id, user_id, job_id`,
      values: [id, status, updatedAt],
    };

    const result = await this.pool.query(query);

    await this.cacheService.delete(`application:${id}`);
    await this.cacheService.delete(`applications.user:${result.user_id}`);
    await this.cacheService.delete(`applications.job:${result.job_id}`);

    return result.rows[0];
  }

  async deleteApplicationById(id) {
    const query = {
      text: "DELETE FROM applications WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this.pool.query(query);
    await this.cacheService.delete(`application:${id}`);
    return result.rows[0];
  }
}

export default new ApplicationRepositories();
