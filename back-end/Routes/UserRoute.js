import express from "express";
import { deleteuser, getall } from "../Controllers/UserController.js";
var UserRouter = express.Router();

/* GET home page. */
UserRouter.get("/getallusers", getall);
UserRouter.delete("/deleteuser/:id", deleteuser);

export default UserRouter;