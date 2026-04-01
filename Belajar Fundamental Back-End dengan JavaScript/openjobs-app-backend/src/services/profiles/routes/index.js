import express from "express";
import authenticateToken from "../../../middlewares/auth.js";
import { getProfile, getProfileApplications, getProfileBookmarks } from "../controllers/profile-controller.js";

const router = express.Router();

router.get("/profile", authenticateToken, getProfile);
router.get("/profile/applications", authenticateToken, getProfileApplications);
router.get("/profile/bookmarks", authenticateToken, getProfileBookmarks);

export default router;
