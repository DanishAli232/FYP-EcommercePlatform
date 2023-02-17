import express from "express";
import {
  addcartitems,
  allcartitems,
  deletecartitem,
  deletesinglecartitem,
  updatecartitems,
  updatequantity,
} from "../Controllers/CartController.js";
import checkAuth from "../Utils/checkAuth.js";

var CartRouter = express.Router();

CartRouter.post("/addcartitems", addcartitems);
CartRouter.patch("/deletecartitem", deletecartitem);
CartRouter.patch("/deletesingleitem", deletesinglecartitem);
CartRouter.get("/allcartitems/:id", allcartitems);
CartRouter.patch("/updatequantity", updatequantity);
CartRouter.patch("/updatecartitems/:id", updatecartitems);

export default CartRouter;
