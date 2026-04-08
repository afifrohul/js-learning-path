import { nanoid } from "nanoid";
import { Pool } from "pg";

class CompanyRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async getCompanies() {
    const query = {
      text: "SELECT * FROM companies",
    };

    const result = await this.pool.query(query);
    return result.rows;
  }

  async getCompanyById(id) {
    const query = {
      text: "SELECT * FROM companies WHERE id = $1",
      values: [id],
    };

    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async createCompany({ user_id, name, location, description }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: "INSERT INTO companies(id, user_id, name, location, description, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id",
      values: [id, user_id, name, location, description, createdAt, updatedAt],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async editCompanyById({ id, name, location, description }) {
    const updatedAt = new Date().toISOString();

    const query = {
      text: "UPDATE companies set name = $1, location = $2, description = $3, updated_at = $4 WHERE id = $5 RETURNING id",
      values: [name, location, description, updatedAt, id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async deleteCompanyById(id) {
    const query = {
      text: "DELETE FROM companies WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this.pool.query(query);
    return result.rows[0];
  }
}

export default new CompanyRepositories();
