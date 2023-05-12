import express from "express";
import {
  getmineorders,
  getorders,
  postorder,
} from "../Controllers/OrderController.js";

import checkAuth from "../Utils/checkAuth.js";

var OrderRouter = express.Router();

OrderRouter.post("/postorder", postorder);
// OrderRouter.patch("/deletecartitem", deletecartitem);
// OrderRouter.patch("/deletesingleitem", deletesinglecartitem);
OrderRouter.get("/getorders", getorders);
OrderRouter.get("/getmineorders/:id", getmineorders);
// OrderRouter.patch("/updatequantity", updatequantity);
// OrderRouter.patch("/updatecartitems/:id", updatecartitems);

export default OrderRouter;
