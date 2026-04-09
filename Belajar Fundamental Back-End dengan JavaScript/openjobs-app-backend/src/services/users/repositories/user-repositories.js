import { nanoid } from "nanoid";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import CacheService from "../../../cache/redis-service.js";

class UserRepositories {
  constructor() {
    this.pool = new Pool();
    this.cacheService = new CacheService();
  }

  async createUser({ email, password, name, role }) {
    const id = nanoid(16);
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: "INSERT INTO users VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id",
      values: [id, email, hashedPassword, name, role, createdAt, updatedAt],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async getUserById(id) {
    const cacheKey = `user:${id}`;

    try {
      const result = await this.cacheService.get(cacheKey);
      const source = "cache";
      return { user: JSON.parse(result), source };
    } catch (error) {
      const query = {
        text: "SELECT id, email, name, created_at, updated_at FROM users WHERE id = $1",
        values: [id],
      };

      const result = await this.pool.query(query);
      const source = "database";

      if (result.rows[0] !== undefined) {
        await this.cacheService.set(cacheKey, JSON.stringify(result.rows[0]));
      }

      return { user: result.rows[0], source };
    }
  }

  async verifyUserCredential(email, password) {
    const query = {
      text: "SELECT id, password FROM users WHERE email = $1",
      values: [email],
    };

    const user = await this.pool.query(query);

    if (!user.rows[0]) {
      return null;
    }

    const { id, password: hashedPassword } = user.rows[0];
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatch) {
      return null;
    }

    return id;
  }
}

export default new UserRepositories();
