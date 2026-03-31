import { Router } from "express";
import {
  createCategory,
  deleteCategoryById,
  editCategoryById,
  getCategories,
  getCategoryById,
} from "../controllers/category-controller.js";
import authenticateToken from "../../../middlewares/auth.js";
import { categoryPayloadSchema } from "../validator/schema.js";
import { validate } from "../../../middlewares/validate.js";

const router = Router();

router.get("/categories", getCategories);
router.get("/categories/:id", getCategoryById);
router.post(
  "/categories",
  validate(categoryPayloadSchema),
  authenticateToken,
  createCategory,
);
router.put(
  "/categories/:id",
  validate(categoryPayloadSchema),
  authenticateToken,
  editCategoryById,
);
router.delete("/categories/:id", authenticateToken, deleteCategoryById);

export default router;
