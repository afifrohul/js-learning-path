import request from "supertest";
import pool from "../../database/postgres/pool.js";
import UsersTableTestHelper from "../../../../tests/UsersTableTestHelper.js";
import AuthenticationsTableTestHelper from "../../../../tests/AuthenticationsTableTestHelper.js";
import container from "../../container.js";
import createServer from "../CreateServer.js";

describe("HTTP server", () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
  });

  describe("when POST /users", () => {
    it("should response 404 when request unregistered route", async () => {
      // Arrange
      const app = await createServer({});
      // Action
      const response = await request(app).get("/unregisteredRoute");
      // Assert
      expect(response.statusCode).toEqual(404);
    });

    it("should response 201 and persisted user", async () => {
      // Arrange
      const requestPayload = {
        username: "dicoding",
        password: "secret",
        fullname: "Dicoding Indonesia",
      };
      const app = await createServer(container);

      // Action
      const response = await request(app).post("/users").send(requestPayload);

      // Assert
      expect(response.status).toEqual(201);
      expect(response.body.status).toEqual("success");
      expect(response.body.data.addedUser).toBeDefined();
    });

    it("should response 400 when request payload not contain needed property", async () => {
      // Arrange
      const requestPayload = {
        fullname: "Dicoding Indonesia",
        password: "secret",
      };
      const app = await createServer(container);
      // Action
      const response = await request(app).post("/users").send(requestPayload);
      // Assert
      expect(response.status).toEqual(400);
      expect(response.body.status).toEqual("fail");
      expect(response.body.message).toEqual(
        "tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada",
      );
    });

    it("should response 400 when request payload not meet data type specification", async () => {
      // Arrange
      const requestPayload = {
        username: "dicoding",
        password: "secret",
        fullname: ["Dicoding Indonesia"],
      };
      const app = await createServer(container);
      // Action
      const response = await request(app).post("/users").send(requestPayload);
      // Assert
      expect(response.status).toEqual(400);
      expect(response.body.status).toEqual("fail");
      expect(response.body.message).toEqual(
        "tidak dapat membuat user baru karena tipe data tidak sesuai",
      );
    });

    it("should response 400 when username more than 50 character", async () => {
      // Arrange
      const requestPayload = {
        username: "dicodingindonesiadicodingindonesiadicodingindonesiadicoding",
        password: "secret",
        fullname: "Dicoding Indonesia",
      };
      const app = await createServer(container);
      // Action
      const response = await request(app).post("/users").send(requestPayload);
      // Assert
      expect(response.status).toEqual(400);
      expect(response.body.status).toEqual("fail");
      expect(response.body.message).toEqual(
        "tidak dapat membuat user baru karena karakter username melebihi batas limit",
      );
    });

    it("should response 400 when username contain restricted character", async () => {
      // Arrange
      const requestPayload = {
        username: "dicoding indonesia",
        password: "secret",
        fullname: "Dicoding Indonesia",
      };
      const app = await createServer(container);
      // Action
      const response = await request(app).post("/users").send(requestPayload);
      // Assert
      expect(response.status).toEqual(400);
      expect(response.body.status).toEqual("fail");
      expect(response.body.message).toEqual(
        "tidak dapat membuat user baru karena username mengandung karakter terlarang",
      );
    });

    it("should response 400 when username unavailable", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: "dicoding" });
      const requestPayload = {
        username: "dicoding",
        fullname: "Dicoding Indonesia",
        password: "super_secret",
      };
      const app = await createServer(container);
      // Action
      const response = await request(app).post("/users").send(requestPayload);
      // Assert
      expect(response.status).toEqual(400);
      expect(response.body.status).toEqual("fail");
      expect(response.body.message).toEqual("username tidak tersedia");
    });

    it("should handle server error correctly", async () => {
      // Arrange
      const requestPayload = {
        username: "dicoding",
        fullname: "Dicoding Indonesia",
        password: "super_secret",
      };
      const app = await createServer({}); // fake container
      // Action
      const response = await request(app).post("/users").send(requestPayload);
      // Assert
      expect(response.status).toEqual(500);
      expect(response.body.status).toEqual("error");
      expect(response.body.message).toEqual(
        "terjadi kegagalan pada server kami",
      );
    });
  });

  describe("when POST /authentications", () => {
    it("should response 201 and persisted refresh token", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        username: "dicoding",
        password: await require("bcrypt").hash("secret123", 10),
        fullname: "Dicoding Indonesia",
      });

      const requestPayload = {
        username: "dicoding",
        password: "secret123",
      };

      const app = await createServer(container);

      // Action
      const response = await request(app)
        .post("/authentications")
        .send(requestPayload);

      // Assert
      expect(response.status).toEqual(201);
      expect(response.body.status).toEqual("success");
      expect(response.body.data.accessToken).toBeDefined();
      expect(response.body.data.refreshToken).toBeDefined();

      const tokens = await AuthenticationsTableTestHelper.findToken(
        response.body.data.refreshToken,
      );
      expect(tokens).toHaveLength(1);
    });

    it("should response 400 when username not found", async () => {
      // Arrange
      const requestPayload = {
        username: "dicoding",
        password: "secret123",
      };

      const app = await createServer(container);

      // Action
      const response = await request(app)
        .post("/authentications")
        .send(requestPayload);

      // Assert
      expect(response.status).toEqual(400);
      expect(response.body.status).toEqual("fail");
    });

    it("should response 401 when password is wrong", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        username: "dicoding",
        password: await require("bcrypt").hash("secret123", 10),
        fullname: "Dicoding Indonesia",
      });

      const requestPayload = {
        username: "dicoding",
        password: "wrongpassword",
      };

      const app = await createServer(container);

      // Action
      const response = await request(app)
        .post("/authentications")
        .send(requestPayload);

      // Assert
      expect(response.status).toEqual(401);
      expect(response.body.status).toEqual("fail");
    });
  });
});
