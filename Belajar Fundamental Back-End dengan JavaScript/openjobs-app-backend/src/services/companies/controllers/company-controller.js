import { InvariantError, NotFoundError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";
import CompanyRepositories from "../repositories/company-repositories.js";

export const getCompanies = async (req, res) => {
  const companies = await CompanyRepositories.getCompanies();

  return response(res, 200, "Perusahaan sukses ditampilkan", { companies });
};

export const getCompanyById = async (req, res, next) => {
  const { id } = req.params;
  const company = await CompanyRepositories.getCompanyById(id);

  if (!company) {
    return next(new NotFoundError("Perusahaan tidak ditemukan"));
  }

  return response(res, 200, "Perusahaan sukses ditampilkan", company);
};

export const createCompany = async (req, res, next) => {
  const { id: user_id } = req.user;
  const { name, location, description } = req.validated;

  const company = await CompanyRepositories.createCompany({
    user_id,
    name,
    location,
    description,
  });

  if (!company) {
    return next(new InvariantError("Perusahaan gagal ditambahkan"));
  }

  return response(res, 201, "Perusahaan berhasil ditambahkan", company);
};

export const editCompanyById = async (req, res, next) => {
  const { id } = req.params;
  const { name, location, description } = req.validated;

  const company = await CompanyRepositories.editCompanyById({
    id,
    name,
    location,
    description,
  });

  if (!company) {
    return next(new NotFoundError("Perusahaan tidak ditemukan"));
  }

  return response(res, 200, "Perusahaan berhasil diperbarui", company);
};

export const deleteCompanyById = async (req, res, next) => {
  const { id } = req.params;

  const deletedCompany = await CompanyRepositories.deleteCompanyById(id);

  if (!deletedCompany) {
    return next(new NotFoundError("Perusahaan tidak ditemukan"));
  }

  return response(res, 200, "Perusahaan berhasil dihapus", deletedCompany);
};
