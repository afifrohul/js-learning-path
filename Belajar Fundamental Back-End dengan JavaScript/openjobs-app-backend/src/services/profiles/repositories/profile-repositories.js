import { Pool } from "pg";

class ProfileRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async getProfile(userId) {
    const query = {
      text: "SELECT id, name, email, role FROM users WHERE id = $1",
      values: [userId],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async getProfileApplications(userId) {
    const query = {
      text: `SELECT applications.id, applications.user_id, applications.job_id, users.name, jobs.title, jobs.description, jobs.job_type, jobs.experience_level, jobs.location_type, jobs.location_city, jobs.salary_min, jobs.salary_max, jobs.status, jobs.category_id, jobs.company_id
      FROM applications
      JOIN jobs ON applications.job_id = jobs.id
      JOIN users ON applications.user_id = users.id 
      WHERE user_id = $1`,
      values: [userId],
    };

    const result = await this.pool.query(query);

    return result.rows;
  }

  async getProfileBookmarks(userId) {
    const query = {
      text: "SELECT * FROM bookmarks WHERE user_id = $1",
      values: [userId],
    };

    const result = await this.pool.query(query);

    return result.rows;
  }
}

export default new ProfileRepositories();
