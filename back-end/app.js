import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import { handle404 } from "./Utils/handle404.js";
import DemoRouter from "./Routes/DemoRoute.js";
import UserRouter from "./Routes/UserRoute.js";
import VendorRouter from "./Routes/VendorRoute.js";
import ProductRouter from "./Routes/ProductRoute.js";
import CartRouter from "./Routes/CartRoute.js";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(cookieParser());
app.use(cors());

app.use("/api", UserRouter);
app.use("/api", ProductRouter);
app.use("/api", VendorRouter);
app.use("/api", CartRouter);
app.use("/", DemoRouter);
app.use("/", handle404);

export default app;
