import express from "express";
import cors from "cors";
import routes from "../routes/index.js";
import ErrorHandler from "../middlewares/error.js";

const app = express();
app.use(cors());
app.use(express.json());
// app.use("/documents", express.static("src/services/uploads/files/documents"));
app.use(routes);
app.use(ErrorHandler);

export default app;
