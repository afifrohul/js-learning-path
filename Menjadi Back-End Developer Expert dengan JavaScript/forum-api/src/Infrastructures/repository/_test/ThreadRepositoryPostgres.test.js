import ThreadsTableTestHelper from "../../../../tests/ThreadsTableTestHelper.js";
import UsersTableTestHelper from "../../../../tests/UsersTableTestHelper.js";
import pool from "../../database/postgres/pool.js";
import ThreadRepositoryPostgres from "../ThreadRepositoryPostgres.js";

describe("ThreadRepositoryPostgres", () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("addThread function", () => {
    it("should persist add thread and return thread correctly", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: "user-123",
        username: "dicoding-123",
      });

      const addThread = {
        title: "Judul Thread",
        body: "Isi thread",
        user_id: "user-123",
      };

      const fakeIdGenerator = () => "123";
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      // Action
      const addedThread = await threadRepositoryPostgres.addThread(addThread);

      // Assert return value
      expect(addedThread.id).toEqual("thread-123");
      expect(addedThread.title).toEqual("Judul Thread");
      expect(addedThread.owner).toEqual("user-123");

      // Assert database
      const threads = await ThreadsTableTestHelper.findThreadById("thread-123");

      expect(threads).toHaveLength(1);
      expect(threads[0].title).toEqual("Judul Thread");
      expect(threads[0].body).toEqual("Isi thread");
      expect(threads[0].user_id).toEqual("user-123");
    });
  });
});
