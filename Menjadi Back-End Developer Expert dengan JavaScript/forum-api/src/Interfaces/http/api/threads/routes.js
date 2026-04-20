import express from "express";
import authenticateToken from "../../middleware/authentication.js";

const routes = (controller) => {
  const router = express.Router();

  router.post("/", authenticateToken, controller.postThread);

  return router;
};

export default routes;
