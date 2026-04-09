import { InvariantError, NotFoundError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";
import BookmarksRepositories from "../repositories/bookmark-repositories.js";

export const getBookmarks = async (req, res) => {
  const { id: userId } = req.user;
  const { bookmarks, source } =
    await BookmarksRepositories.getBookmarks(userId);

  res.setHeader("X-Data-Source", source);
  return response(res, 200, "Bookmark sukses ditampilkan", {
    bookmarks,
  });
};

export const getBookmarkById = async (req, res, next) => {
  const { jobId, id } = req.params;
  const bookmark = await BookmarksRepositories.getBookmarkById(jobId, id);

  if (!bookmark) {
    return next(new NotFoundError("Bookmark tidak ditemukan"));
  }

  return response(res, 200, "Bookmark sukses ditampilkan", bookmark);
};

export const createBookmark = async (req, res, next) => {
  const { id: user_id } = req.user;
  const { jobId: job_id } = req.params;

  const bookmark = await BookmarksRepositories.createBookmark({
    user_id,
    job_id,
  });

  if (!bookmark) {
    return next(new InvariantError("Bookmark gagal ditambahkan"));
  }

  return response(res, 201, "Bookmark berhasil ditambahkan", bookmark);
};

export const deleteBookmarkByUserIdAndJobId = async (req, res, next) => {
  const { id: userId } = req.user;
  const { jobId } = req.params;

  const deletedBookmark =
    await BookmarksRepositories.deleteBookmarkByUserIdAndJobId(userId, jobId);

  if (!deletedBookmark) {
    return next(new NotFoundError("Bookmark tidak ditemukan"));
  }

  return response(res, 200, "Bookmark berhasil dihapus", deletedBookmark);
};
