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
      text: "SELECT * FROM applications WHERE user_id = $1",
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
