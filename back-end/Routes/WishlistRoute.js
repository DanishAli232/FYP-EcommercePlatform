import express from "express";
import {
  addwishitems,
  allwishitems,
  deletewishitem,
  getwishitems,
  updatewishitems,
} from "../Controllers/WishController.js";
import checkAuth from "../Utils/checkAuth.js";

var WishRouter = express.Router();

WishRouter.post("/addwishitems", addwishitems);
WishRouter.patch("/updatewishitems/:id", updatewishitems);
WishRouter.patch("/deletewishitem", deletewishitem);
WishRouter.get("/allwishitems/:id", allwishitems);
WishRouter.get("/getwishitems", getwishitems);

export default WishRouter;
