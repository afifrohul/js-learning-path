import express from "express";
import { validate } from "../../../middlewares/validate.js";
import {
  postApplicationPayloadSchema,
  putApplicationPayloadSchema,
} from "../validator/schema.js";
import authenticateToken from "../../../middlewares/auth.js";
import {
  createApplication,
  deleteApplicationById,
  editApplicationById,
  getApplicationById,
  getApplications,
  getApplicationsByJobId,
  getApplicationsByUserId,
} from "../controllers/application-controller.js";

const router = express.Router();

router.post(
  "/applications",
  authenticateToken,
  validate(postApplicationPayloadSchema),
  createApplication,
);
router.get("/applications", authenticateToken, getApplications);
router.get("/applications/:id", authenticateToken, getApplicationById);
router.get(
  "/applications/user/:userId",
  authenticateToken,
  getApplicationsByUserId,
);
router.get("/applications/job/:jobId", authenticateToken, getApplicationsByJobId);
router.put(
  "/applications/:id",
  authenticateToken,
  validate(putApplicationPayloadSchema),
  editApplicationById,
);
router.delete("/applications/:id", authenticateToken, deleteApplicationById);

export default router;
