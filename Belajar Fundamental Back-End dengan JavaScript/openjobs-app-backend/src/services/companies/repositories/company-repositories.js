import { nanoid } from "nanoid";
import { Pool } from "pg";
import CacheService from "../../../cache/redis-service.js";

class CompanyRepositories {
  constructor() {
    this.pool = new Pool();
    this.cacheService = new CacheService();
  }

  async getCompanies() {
    const cacheKey = "companies";

    try {
      const result = await this.cacheService.get(cacheKey);
      const source = "cache";
      return { companies: JSON.parse(result), source };
    } catch (error) {
      const query = {
        text: "SELECT id, user_id, name, location, description, created_at FROM companies",
      };

      const result = await this.pool.query(query);
      const source = "database";
      await this.cacheService.set(cacheKey, JSON.stringify(result.rows));
      return { companies: result.rows, source };
    }
  }

  async getCompanyById(id) {
    const cacheKey = `company:${id}`;

    try {
      const result = await this.cacheService.get(cacheKey);
      const source = "cache";
      return { company: JSON.parse(result), source };
    } catch (error) {
      const query = {
        text: "SELECT * FROM companies WHERE id = $1",
        values: [id],
      };

      const result = await this.pool.query(query);
      const source = "database";

      if (result.rows[0] !== undefined) {
        await this.cacheService.set(cacheKey, JSON.stringify(result.rows[0]));
      }
      return { company: result.rows[0], source };
    }
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
    await this.cacheService.delete("companies");
    return result.rows[0];
  }

  async editCompanyById({ id, name, location, description }) {
    const updatedAt = new Date().toISOString();

    const query = {
      text: "UPDATE companies set name = $1, location = $2, description = $3, updated_at = $4 WHERE id = $5 RETURNING id",
      values: [name, location, description, updatedAt, id],
    };

    const result = await this.pool.query(query);
    await this.cacheService.delete(`company:${id}`);
    return result.rows[0];
  }

  async deleteCompanyById(id) {
    const query = {
      text: "DELETE FROM companies WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this.pool.query(query);
    await this.cacheService.delete(`company:${id}`);
    return result.rows[0];
  }
}

export default new CompanyRepositories();
