import express from "express";
import {
  addUser,
  alladmins,
  alluser,
  ChangePassword,
  deleteuser,
  Emailverify,
  Emailverify2,
  forgotPassword,
  getall,
  login,
  statusupdate,
} from "../Controllers/UserController.js";
var UserRouter = express.Router();

/* GET home page. */
UserRouter.get("/getallusers", getall);
UserRouter.get("/:id/verify/:token/", Emailverify);
UserRouter.delete("/deleteuser/:id", deleteuser);
UserRouter.get("/alluser", alluser);
UserRouter.patch("/statususerupdate/:id", statusupdate);
UserRouter.get("/alladmins", alladmins);
UserRouter.post("/register", addUser);
UserRouter.post("/login", login);
UserRouter.post("/forgotpassword", forgotPassword);
UserRouter.get("/:id/verify2/:token", Emailverify2);
UserRouter.post("/changepassword", ChangePassword);

export default UserRouter;
