import { InvariantError, NotFoundError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";
import UserRepositories from "../repositories/user-repositories.js";

export const createUser = async (req, res, next) => {
  const { email, password, name } = req.validated;

  const user = await UserRepositories.createUser({
    email,
    password,
    name,
  });

  if (!user) {
    return next(new InvariantError("User gagal ditambahkan"));
  }

  return response(res, 201, "User berhasil ditambahkan", user);
};

export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  const user = await UserRepositories.getUserById(id);

  if (!user) {
    return next(new NotFoundError("User tidak ditemukan"));
  }

  return response(res, 200, "User berhasil ditampilkan", user);
};
