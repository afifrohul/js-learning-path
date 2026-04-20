import express from "express";
import authenticateToken from "../../middleware/authentication.js";

const routes = (controller) => {
  const router = express.Router();

  router.post("/", authenticateToken, controller.postThread);
  router.get("/:threadId", controller.getDetailThread);
  router.post("/:threadId/comments", authenticateToken, controller.postComment);

  return router;
};

export default routes;
