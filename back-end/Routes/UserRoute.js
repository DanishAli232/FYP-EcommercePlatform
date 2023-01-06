import express from "express";
import {
    alladmins,
    alluser,
    deleteuser,
    getall,
    statusupdate,
} from "../Controllers/UserController.js";
var UserRouter = express.Router();

/* GET home page. */
UserRouter.get("/getallusers", getall);
UserRouter.delete("/deleteuser/:id", deleteuser);
UserRouter.get("/alluser", alluser);
UserRouter.patch("/statususerupdate/:id", statusupdate);
UserRouter.get("/alladmins", alladmins);

export default UserRouter;