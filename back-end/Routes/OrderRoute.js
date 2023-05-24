import express from "express";
import {
  fetchOrderProducts,
  getmineorders,
  getorders,
  getvendororders,
  postorder,
} from "../Controllers/OrderController.js";

import checkAuth from "../Utils/checkAuth.js";

var OrderRouter = express.Router();

OrderRouter.post("/postorder", postorder);
// OrderRouter.patch("/deletecartitem", deletecartitem);
// OrderRouter.patch("/deletesingleitem", deletesinglecartitem);
OrderRouter.get("/getorders", getorders);
OrderRouter.get("/getmineorders/:id", getmineorders);
OrderRouter.get("/getvendororders", getvendororders);
OrderRouter.get("/fetchorderproducts", fetchOrderProducts);
// OrderRouter.patch("/updatequantity", updatequantity);
// OrderRouter.patch("/updatecartitems/:id", updatecartitems);

export default OrderRouter;
