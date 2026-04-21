import express from "express";
import authenticateToken from "../../middleware/authentication.js";

const routes = (controller) => {
  const router = express.Router();

  router.post("/", authenticateToken, controller.postThread);
  router.get("/:threadId", controller.getDetailThread);
  router.post("/:threadId/comments", authenticateToken, controller.postComment);
  router.delete(
    "/:threadId/comments/:commentId",
    authenticateToken,
    controller.deleteComment,
  );

  return router;
};

export default routes;
