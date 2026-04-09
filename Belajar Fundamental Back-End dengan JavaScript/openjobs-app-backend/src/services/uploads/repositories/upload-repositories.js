import { nanoid } from "nanoid";
import { Pool } from "pg";

class UploadRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async createDocument({ user_id, name }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: "INSERT INTO documents(id, user_id, name, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      values: [id, user_id, name, createdAt, updatedAt],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async getDocuments() {
    const query = {
      text: "SELECT * FROM documents",
    };

    const result = await this.pool.query(query);
    return result.rows;
  }

  async getDocumentById(id) {
    const query = {
      text: "SELECT * FROM documents WHERE id = $1",
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async deleteDocumentById(id) {
    const query = {
      text: "DELETE FROM documents WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }
}

export default new UploadRepositories();
