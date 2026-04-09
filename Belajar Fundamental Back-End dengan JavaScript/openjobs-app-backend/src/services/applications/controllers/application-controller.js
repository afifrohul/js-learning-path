import { InvariantError, NotFoundError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";
import ApplicationRepositories from "../repositories/application-repositories.js";

export const getApplications = async (req, res) => {
  const applications = await ApplicationRepositories.getApplications();

  return response(res, 200, "Apply pekerjaan sukses ditampilkan", {
    applications,
  });
};

export const getApplicationById = async (req, res, next) => {
  const { id } = req.params;
  const { application, source } =
    await ApplicationRepositories.getApplicationById(id);

  if (!application) {
    return next(new NotFoundError("Apply pekerjaan tidak ditemukan"));
  }

  res.setHeader("X-Data-Source", source);
  return response(res, 200, "Apply pekerjaan sukses ditampilkan", application);
};

export const getApplicationsByUserId = async (req, res) => {
  const { userId } = req.params;
  const { applications, source } =
    await ApplicationRepositories.getApplicationsByUserId(userId);

  res.setHeader("X-Data-Source", source);
  return response(res, 200, "Apply pekerjaan sukses ditampilkan", {
    applications,
  });
};

export const getApplicationsByJobId = async (req, res) => {
  const { jobId } = req.params;
  const { applications, source } =
    await ApplicationRepositories.getApplicationsByJobId(jobId);

  res.setHeader("X-Data-Source", source);
  return response(res, 200, "Apply pekerjaan sukses ditampilkan", {
    applications,
  });
};

export const createApplication = async (req, res, next) => {
  const { user_id, job_id, status } = req.validated;

  const application = await ApplicationRepositories.createApplication({
    user_id,
    job_id,
    status,
  });

  if (!application) {
    return next(new InvariantError("Apply pekerjaan gagal ditambahkan"));
  }

  return response(
    res,
    201,
    "Apply pekerjaan berhasil ditambahkan",
    application,
  );
};

export const editApplicationById = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.validated;

  const application = await ApplicationRepositories.editApplicationById({
    id,
    status,
  });

  if (!application) {
    return next(new NotFoundError("Apply pekerjaan tidak ditemukan"));
  }

  return response(res, 200, "Apply pekerjaan berhasil diperbarui", application);
};

export const deleteApplicationById = async (req, res, next) => {
  const { id } = req.params;

  const deletedApplication =
    await ApplicationRepositories.deleteApplicationById(id);

  if (!deletedApplication) {
    return next(new NotFoundError("Apply pekerjaan tidak ditemukan"));
  }

  return response(
    res,
    200,
    "Apply pekerjaan berhasil dihapus",
    deletedApplication,
  );
};
