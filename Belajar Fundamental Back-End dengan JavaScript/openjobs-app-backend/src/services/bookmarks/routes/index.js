import express from "express";
import authenticateToken from "../../../middlewares/auth.js";
import {
  createBookmark,
  deleteBookmarkByUserIdAndJobId,
  getBookmarkById,
  getBookmarks,
} from "../controllers/bookmark-controller.js";

const router = express.Router();

router.get("/bookmarks", authenticateToken, getBookmarks);
router.get("/jobs/:jobId/bookmark/:id", authenticateToken, getBookmarkById);
router.post("/jobs/:jobId/bookmark", authenticateToken, createBookmark);
router.delete(
  "/jobs/:jobId/bookmark",
  authenticateToken,
  deleteBookmarkByUserIdAndJobId,
);

export default router;
