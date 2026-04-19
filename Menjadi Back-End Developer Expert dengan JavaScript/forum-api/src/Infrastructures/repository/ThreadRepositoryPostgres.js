import ThreadRepository from "../../Domains/threads/ThreadRepository.js";

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(addThread) {
    const { title, body, user_id } = addThread;
    const id = `thread-${this._idGenerator()}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: "INSERT INTO threads(id, title, body, user_id, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, title, user_id AS owner",
      values: [id, title, body, user_id, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }
}

export default ThreadRepositoryPostgres;
