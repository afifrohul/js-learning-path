import { Router } from "express";

import authenticateToken from "../../../middlewares/auth.js";
import {
  postJobPayloadSchema,
  putJobPayloadSchema,
  queryJobSchema,
} from "../validator/schema.js";
import { validate, validateQuery } from "../../../middlewares/validate.js";
import {
  createJob,
  deleteJobById,
  editJobById,
  getJobById,
  getJobs,
  getJobsByCategoryId,
  getJobsByCompanyId,
} from "../controllers/job-controller.js";

const router = Router();

router.get("/jobs", validateQuery(queryJobSchema), getJobs);
router.get("/jobs/:id", getJobById);
router.get("/jobs/company/:companyId", getJobsByCompanyId);
router.get("/jobs/category/:categoryId", getJobsByCategoryId);
router.post(
  "/jobs",
  authenticateToken,
  validate(postJobPayloadSchema),
  createJob,
);
router.put(
  "/jobs/:id",
  authenticateToken,
  validate(putJobPayloadSchema),
  editJobById,
);
router.delete("/jobs/:id", authenticateToken, deleteJobById);

export default router;
