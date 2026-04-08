import { Router } from "express";
import {
  uploadDocuments,
  getDocumentById,
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

router.get("/documents/:id",
  // authenticateToken, 
  getDocumentById
);

export default router;
