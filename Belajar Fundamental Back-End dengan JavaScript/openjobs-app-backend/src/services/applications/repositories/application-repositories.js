import { nanoid } from "nanoid";
import { Pool } from "pg";

class ApplicationRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async getApplications() {
    const query = {
      text: "SELECT * FROM applications",
    };

    const result = await this.pool.query(query);

    return result.rows;
  }

  async getApplicationById(id) {
    const query = {
      text: "SELECT * FROM applications WHERE id = $1",
      values: [id],
    };

    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async getApplicationsByUserId(userId) {
    const query = {
      text: "SELECT * FROM applications WHERE user_id = $1",
      values: [userId],
    };

    const result = await this.pool.query(query);
    return result.rows;
  }

  async getApplicationsByJobId(jobId) {
    const query = {
      text: "SELECT * FROM applications WHERE job_id = $1",
      values: [jobId],
    };

    const result = await this.pool.query(query);
    return result.rows;
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
      ) VALUES($1, $2, $3, $4, $5, $6) RETURNING id`,
      values: [id, user_id, job_id, status, createdAt, updatedAt],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async editApplicationById({ id, status }) {
    const updatedAt = new Date().toISOString();

    const query = {
      text: `UPDATE applications SET
        status = $2,
        updated_at = $3
      WHERE id = $1
      RETURNING id`,
      values: [id, status, updatedAt],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async deleteApplicationById(id) {
    const query = {
      text: "DELETE FROM applications WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this.pool.query(query);
    return result.rows[0];
  }
}

export default new ApplicationRepositories();
