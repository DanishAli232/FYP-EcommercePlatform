import express from "express";
import { home } from "../Controllers/home.js";
var router = express.Router();

/* GET home page. */
router.get("/", home);

export default router;