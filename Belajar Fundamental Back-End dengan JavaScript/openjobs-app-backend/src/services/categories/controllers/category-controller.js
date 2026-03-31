import {
  InvariantError,
  AuthenticationError,
  NotFoundError,
} from "../../../exceptions/index.js";
import response from "../../../utils/response.js";
import CategoryRepositories from "../repositories/category-repositories.js";

export const getCategories = async (req, res) => {
  const categories = await CategoryRepositories.getCategories();

  return response(res, 200, "Kategori sukses ditampilkan", { categories });
};

export const getCategoryById = async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryRepositories.getCategoryById(id);

  if (!category) {
    return next(new NotFoundError("Kategori tidak ditemukan"));
  }

  return response(res, 200, "Kategori sukses ditampilkan", category);
};

export const createCategory = async (req, res, next) => {
  const { name } = req.validated;

  const category = await CategoryRepositories.createCategory({ name });

  if (!category) {
    return next(new InvariantError("Kategori gagal ditambahkan"));
  }

  return response(res, 201, "Kategori berhasil ditambahkan", category);
};

export const editCategoryById = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.validated;

  const category = await CategoryRepositories.editCategoryById({ id, name });

  if (!category) {
    return next(new NotFoundError("Kategori tidak ditemukan"));
  }

  return response(res, 200, "Kategori berhasil diperbarui", category);
};

export const deleteCategoryById = async (req, res, next) => {
  const { id } = req.params;

  const deletedCategory = await CategoryRepositories.deleteCategoryById(id);

  if (!deletedCategory) {
    return next(new NotFoundError("Kategori tidak ditemukan"));
  }

  return response(res, 200, "Kategori berhasil dihapus", deletedCategory);
};
