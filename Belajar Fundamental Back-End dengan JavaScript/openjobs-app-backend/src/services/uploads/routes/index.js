import { Router } from "express";
import {
  uploadDocuments,
  getDocumentById,
  deleteDocumentById,
  getDocuments,
} from "../controller/upload-controller.js";
import authenticateToken from "../../../middlewares/auth.js";
import { upload } from "../storage/storage-config.js";

const router = Router();

router.post(
  "/documents",
  authenticateToken,
  upload.single("document"),
  uploadDocuments,
);
router.get("/documents", getDocuments);
router.get("/documents/:id", getDocumentById);
router.delete("/documents/:id", authenticateToken, deleteDocumentById);

export default router;
