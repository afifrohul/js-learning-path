import express from "express";

const routes = (controller) => {
  const router = express.Router();

  /**
   * @swagger
   * /authentications:
   *   post:
   *     summary: POST authentications
   *     description: Test
   *     tags:
   *       - auth
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: success
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: success
   *                 data:
   *                   type: object
   *                   properties:
   *                     accessToken:
   *                       type: string
   *                     refreshToken:
   *                       type: string
   */
  router.post("/", controller.login);

  /**
   * @openapi
   * /authentications:
   *   put:
   *     summary: PUT authentications
   *     description: Test
   *     tags:
   *       - auth
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               refreshToken:
   *                 type: string
   *     responses:
   *       200:
   *         description: success
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: success
   *                 data:
   *                   type: object
   *                   properties:
   *                     accessToken:
   *                       type: string
   */
  router.put("/", controller.refreshAuthentication);

  /**
   * @openapi
   * /authentications:
   *   delete:
   *     summary: DELETE authentications
   *     description: Test
   *     tags:
   *       - auth
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               refreshToken:
   *                 type: string
   *     responses:
   *       200:
   *         description: success
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: success
   */
  router.delete("/", controller.logout);

  return router;
};

export default routes;
