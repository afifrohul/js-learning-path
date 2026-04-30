import express from "express";
import authenticateToken from "../../middleware/authentication.js";

const routes = (controller, container) => {
  const router = express.Router();

  router.post("/", authenticateToken(container), controller.postThread);
  router.get("/:threadId", controller.getDetailThread);
  router.post(
    "/:threadId/comments",
    authenticateToken(container),
    controller.postComment,
  );
  router.post(
    "/:threadId/comments/:commentId/replies",
    authenticateToken(container),
    controller.postCommentReply,
  );
  router.delete(
    "/:threadId/comments/:commentId",
    authenticateToken(container),
    controller.deleteComment,
  );
  router.delete(
    "/:threadId/comments/:commentId/replies/:replyId",
    authenticateToken(container),
    controller.deleteCommentReply,
  );

  return router;
};

export default routes;
