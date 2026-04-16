import express from "express";

const routes = (controller) => {
  const router = express.Router();

  router.post("/", controller.login);
  router.put("/", controller.refreshAuthentication);
  router.delete("/", controller.logout);

  return router;
};

export default routes;
