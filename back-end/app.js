import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import { handle404 } from "./Utils/handle404.js";
import DemoRouter from "./Routes/DemoRoute.js";
import UserRouter from "./Routes/UserRoute.js";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(cookieParser());
app.use(cors());

app.use("/api", UserRouter);
app.use("/", DemoRouter);
app.use("/", handle404);

export default app;