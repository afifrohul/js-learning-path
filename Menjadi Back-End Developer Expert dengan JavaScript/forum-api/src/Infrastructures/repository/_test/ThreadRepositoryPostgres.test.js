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

  describe("detailThread function", () => {
    it("should return thread detail correctly", async () => {
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
      await threadRepositoryPostgres.addThread(addThread);
      const detailThread =
        await threadRepositoryPostgres.detailThread("thread-123");

      // Assert database
      expect(detailThread.id).toEqual("thread-123");
      expect(detailThread.title).toEqual("Judul Thread");
      expect(detailThread.body).toEqual("Isi thread");
      expect(detailThread.username).toEqual("dicoding-123");
      expect(detailThread.date).toBeDefined();
      expect(detailThread.comments).toBeDefined();
    });
  });

  describe("addComment function", () => {
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

      const addComment = {
        content: "Ini komen",
        user_id: "user-123",
        thread_id: "thread-123",
      };

      const fakeIdGenerator = () => "123";
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      // Action
      const addedThread = await threadRepositoryPostgres.addThread(addThread);
      const addedComment =
        await threadRepositoryPostgres.addComment(addComment);

      const addedCommentDb = await threadRepositoryPostgres.getCommentById(
        addedComment.id,
      );

      // Assert
      expect(addedComment.id).toEqual("comment-123");
      expect(addedComment.content).toEqual("Ini komen");
      expect(addedComment.owner).toEqual("user-123");

      expect(addedCommentDb.id).toEqual("comment-123");
      expect(addedCommentDb.user_id).toEqual("user-123");
      expect(addedCommentDb.thread_id).toEqual("thread-123");
      expect(addedCommentDb.content).toEqual("Ini komen");
    });
  });

  describe("getCommentById function", () => {
    it("should return comment detail correctly", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: "user-123",
        username: "dicoding-123",
      });

      const fakeIdGenerator = () => "123";

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      await threadRepositoryPostgres.addThread({
        title: "Judul Thread",
        body: "Isi thread",
        user_id: "user-123",
      });

      await threadRepositoryPostgres.addComment({
        content: "Ini komen",
        user_id: "user-123",
        thread_id: "thread-123",
      });

      // Action
      const comment =
        await threadRepositoryPostgres.getCommentById("comment-123");

      // Assert
      expect(comment).toEqual({
        id: "comment-123",
        user_id: "user-123",
        content: "Ini komen",
        thread_id: "thread-123",
      });
    });

    it("should return null when comment not found", async () => {
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        () => "123",
      );

      const comment =
        await threadRepositoryPostgres.getCommentById("comment-xxx");

      expect(comment).toBeNull();
    });
  });

  describe("deleteComment function", () => {
    it("should soft delete comment correctly", async () => {
      await UsersTableTestHelper.addUser({
        id: "user-123",
        username: "dicoding-123",
      });

      const addThread = {
        title: "Judul Thread",
        body: "Isi thread",
        user_id: "user-123",
      };

      const addComment = {
        content: "Ini komen",
        user_id: "user-123",
        thread_id: "thread-123",
      };

      const fakeIdGenerator = () => "123";
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      // Action
      const addedThread = await threadRepositoryPostgres.addThread(addThread);
      const addedComment =
        await threadRepositoryPostgres.addComment(addComment);
      const deletedComment =
        await threadRepositoryPostgres.deleteComment("comment-123");

      const deletedCommentDb =
        await threadRepositoryPostgres.getCommentById("comment-123");

      // Assert
      expect(deletedComment.id).toEqual("comment-123");

      expect(deletedCommentDb.id).toEqual("comment-123");
      expect(deletedCommentDb.content).toEqual("**komentar telah dihapus**");
      expect(deletedCommentDb.deleted_at).not.toBeNull();
    });
  });
});
