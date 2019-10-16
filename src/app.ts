import express, { Application } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

import authRoute from "./routes/auth";

const app: Application = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/auth", authRoute);

export default app;
