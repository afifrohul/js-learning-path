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
    it("should return thread detail correctly with empty comments", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: "user-123",
        username: "dicoding-123",
      });

      const repo = new ThreadRepositoryPostgres(pool, () => "123");

      await repo.addThread({
        title: "Judul Thread",
        body: "Isi thread",
        user_id: "user-123",
      });

      // Action
      const result = await repo.detailThread("thread-123");

      // Assert
      expect(result).toEqual({
        id: "thread-123",
        title: "Judul Thread",
        body: "Isi thread",
        username: "dicoding-123",
        date: expect.any(Date),
        comments: [],
      });
    });

    it("should throw error when thread not found", async () => {
      // Arrange
      const repo = new ThreadRepositoryPostgres(pool, () => "123");

      // Assert
      await expect(repo.detailThread("thread-xxx")).rejects.toThrowError(
        "DETAIL_THREAD.DATA_NOT_FOUND",
      );
    });

    it("should return thread detail with root comment only", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: "user-123",
        username: "dicoding",
      });

      const repo = new ThreadRepositoryPostgres(pool, () => "123");

      await repo.addThread({
        title: "Thread Test",
        body: "Isi Thread",
        user_id: "user-123",
      });

      await repo.addComment({
        content: "Komentar utama",
        user_id: "user-123",
        thread_id: "thread-123",
      });

      // Action
      const result = await repo.detailThread("thread-123");

      // Assert
      expect(result.comments).toHaveLength(1);

      expect(result.comments[0]).toEqual({
        id: "comment-123",
        username: "dicoding",
        date: expect.any(Date),
        content: "Komentar utama",
        replies: [],
      });
    });

    it("should attach reply into parent comment replies", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: "user-123",
        username: "dicoding",
      });

      const repo = new ThreadRepositoryPostgres(pool, () => "123");
      const repo2 = new ThreadRepositoryPostgres(pool, () => "456");

      await repo.addThread({
        title: "Judul Thread",
        body: "Isi Thread",
        user_id: "user-123",
      });

      await repo.addComment({
        content: "Komentar utama",
        user_id: "user-123",
        thread_id: "thread-123",
      });

      await repo2.addCommentReply({
        content: "Komentar balasan",
        comment_id: "comment-123",
        user_id: "user-123",
        thread_id: "thread-123",
      });

      // Action
      const result = await repo.detailThread("thread-123");

      // Assert
      expect(result.comments).toHaveLength(1);

      expect(result.comments[0]).toEqual({
        id: "comment-123",
        username: "dicoding",
        date: expect.any(Date),
        content: "Komentar utama",
        replies: [
          {
            id: "comment-456",
            username: "dicoding",
            date: expect.any(Date),
            content: "Komentar balasan",
            replies: [],
          },
        ],
      });
    });

    it("should return multiple root comments correctly", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: "user-123",
        username: "dicoding",
      });

      const repo = new ThreadRepositoryPostgres(pool, () => "123");
      const repo2 = new ThreadRepositoryPostgres(pool, () => "456");

      await repo.addThread({
        title: "Thread Multi",
        body: "Isi",
        user_id: "user-123",
      });

      await repo.addComment({
        content: "Komentar 1",
        user_id: "user-123",
        thread_id: "thread-123",
      });

      await repo2.addComment({
        content: "Komentar 2",
        user_id: "user-123",
        thread_id: "thread-123",
      });

      // Action
      const result = await repo.detailThread("thread-123");

      // Assert
      expect(result.comments).toHaveLength(2);
      expect(result.comments[0].id).toEqual("comment-123");
      expect(result.comments[1].id).toEqual("comment-456");
    });
  });

  describe("addComment function", () => {
    it("should persist add comment and return thread correctly", async () => {
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

    it("should throw error when comment not found", async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        () => "123",
      );

      // Action & Assert
      await expect(
        threadRepositoryPostgres.getCommentById("comment-xxx"),
      ).rejects.toThrowError("DETAIL_COMMENT.DATA_NOT_FOUND");
    });
  });

  describe("addCommentReply function", () => {
    it("should persist add comment reply and return thread correctly", async () => {
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

      const addCommentReply = {
        content: "Ini komen balasan",
        comment: "comment-123",
        user_id: "user-123",
        thread_id: "thread-123",
      };

      const fakeIdGenerator = () => "123";
      const fakeIdGenerator2 = () => "456";
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );
      const threadRepositoryPostgres2 = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator2,
      );

      // Action
      const addedThread = await threadRepositoryPostgres.addThread(addThread);
      const addedComment =
        await threadRepositoryPostgres.addComment(addComment);
      const addedReply =
        await threadRepositoryPostgres2.addCommentReply(addCommentReply);

      const addedCommentReplyDb =
        await threadRepositoryPostgres2.getCommentById(addedReply.id);

      // Assert
      expect(addedReply.id).toEqual("comment-456");
      expect(addedReply.content).toEqual("Ini komen balasan");
      expect(addedReply.owner).toEqual("user-123");

      expect(addedCommentReplyDb.id).toEqual("comment-456");
      expect(addedCommentReplyDb.user_id).toEqual("user-123");
      expect(addedCommentReplyDb.thread_id).toEqual("thread-123");
      expect(addedCommentReplyDb.content).toEqual("Ini komen balasan");
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
  describe("deleteCommentReply function", () => {
    it("should soft delete comment reply correctly", async () => {
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

      const addCommentReply = {
        content: "Ini komen balasan",
        comment_id: "comment-123",
        user_id: "user-123",
        thread_id: "thread-123",
      };

      const fakeIdGenerator = () => "123";
      const fakeIdGenerator2 = () => "456";
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );
      const threadRepositoryPostgres2 = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator2,
      );

      // Action
      const addedThread = await threadRepositoryPostgres.addThread(addThread);
      const addedComment =
        await threadRepositoryPostgres.addComment(addComment);
      const addedCommentReply =
        await threadRepositoryPostgres2.addCommentReply(addCommentReply);

      const deletedCommentReply =
        await threadRepositoryPostgres.deleteCommentReply("comment-456");

      const deletedCommentReplyDb =
        await threadRepositoryPostgres.getCommentById("comment-456");

      // Assert
      expect(deletedCommentReply.id).toEqual("comment-456");

      expect(deletedCommentReplyDb.id).toEqual("comment-456");
      expect(deletedCommentReplyDb.content).toEqual(
        "**balasan telah dihapus**",
      );
      expect(deletedCommentReplyDb.deleted_at).not.toBeNull();
    });
  });
});
