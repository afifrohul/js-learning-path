import { InvariantError, NotFoundError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";
import ProfilesRepositories from "../repositories/profile-repositories.js";

export const getProfile = async (req, res) => {
  const { id: userId } = req.user;
  const profile = await ProfilesRepositories.getProfile(userId);

  if (!profile) {
    return next(new NotFoundError("User tidak ditemukan"));
  }

  return response(res, 200, "Profile sukses ditampilkan", profile);
};

export const getProfileApplications = async (req, res) => {
  const { id: userId } = req.user;
  const applications =
    await ProfilesRepositories.getProfileApplications(userId);

  if (!applications) {
    return next(new NotFoundError("User tidak ditemukan"));
  }

  return response(res, 200, "Profile applications sukses ditampilkan", {
    applications,
  });
};

export const getProfileBookmarks = async (req, res) => {
  const { id: userId } = req.user;
  const bookmarks = await ProfilesRepositories.getProfileBookmarks(userId);

  if (!bookmarks) {
    return next(new NotFoundError("User tidak ditemukan"));
  }

  return response(res, 200, "Profile bookmarks sukses ditampilkan", {
    bookmarks,
  });
};
