import { InvariantError, NotFoundError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";
import JobRepositories from "../repositories/job-repositories.js";

export const getJobs = async (req, res) => {
  const { title = "", "company-name": company_name = "" } = req.validated;

  const jobs = await JobRepositories.getJobs(title, company_name);

  return response(res, 200, "Pekerjaan sukses ditampilkan", { jobs });
};

export const getJobById = async (req, res, next) => {
  const { id } = req.params;
  const job = await JobRepositories.getJobById(id);

  if (!job) {
    return next(new NotFoundError("Pekerjaan tidak ditemukan"));
  }

  return response(res, 200, "Pekerjaan sukses ditampilkan", job);
};

export const getJobsByCompanyId = async (req, res) => {
  const { companyId } = req.params;
  const jobs = await JobRepositories.getJobsByCompanyId(companyId);

  return response(res, 200, "Pekerjaan sukses ditampilkan", { jobs });
};

export const getJobsByCategoryId = async (req, res) => {
  const { categoryId } = req.params;
  const jobs = await JobRepositories.getJobsByCategoryId(categoryId);

  return response(res, 200, "Pekerjaan sukses ditampilkan", { jobs });
};

export const createJob = async (req, res, next) => {
  const {
    company_id,
    category_id,
    title,
    description,
    job_type,
    experience_level,
    location_type,
    location_city,
    salary_min,
    salary_max,
    is_salary_visible,
    status,
  } = req.validated;

  const job = await JobRepositories.createJob({
    company_id,
    category_id,
    title,
    description,
    job_type,
    experience_level,
    location_type,
    location_city,
    salary_min,
    salary_max,
    is_salary_visible,
    status,
  });

  if (!job) {
    return next(new InvariantError("Pekerjaan gagal ditambahkan"));
  }

  return response(res, 201, "Pekerjaan berhasil ditambahkan", job);
};

export const editJobById = async (req, res, next) => {
  const { id } = req.params;
  const {
    company_id,
    category_id,
    title,
    description,
    job_type,
    experience_level,
    location_type,
    location_city,
    salary_min,
    salary_max,
    is_salary_visible,
    status,
  } = req.validated;

  const job = await JobRepositories.editJobById({
    id,
    company_id,
    category_id,
    title,
    description,
    job_type,
    experience_level,
    location_type,
    location_city,
    salary_min,
    salary_max,
    is_salary_visible,
    status,
  });

  if (!job) {
    return next(new NotFoundError("Pekerjaan tidak ditemukan"));
  }

  return response(res, 200, "Pekerjaan berhasil diperbarui", job);
};

export const deleteJobById = async (req, res, next) => {
  const { id } = req.params;

  const deletedJob = await JobRepositories.deleteJobById(id);

  if (!deletedJob) {
    return next(new NotFoundError("Pekerjaan tidak ditemukan"));
  }

  return response(res, 200, "Pekerjaan berhasil dihapus", deletedJob);
};
