/* istanbul ignore file */
import pool from "../src/Infrastructures/database/postgres/pool.js";

const ThreadsTableTestHelper = {
  async addThread({
    id = "thread-123",
    title = "Judul Thread",
    body = "Isi thread",
    user_id = "user-123",
  }) {
    const query = {
      text: "INSERT INTO threads VALUES($1, $2, $3, $4",
      values: [id, title, body, user_id],
    };

    await pool.query(query);
  },

  async findThreadById(id) {
    const query = {
      text: "SELECT * FROM threads WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query("TRUNCATE TABLE threads CASCADE");
  },
};

export default ThreadsTableTestHelper;
