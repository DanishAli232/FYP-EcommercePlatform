import express from "express";
import {
  allvendors,
  allvendorsproducts,
  deletevendor,
  getallvendors,
  postvendor,
  statusupdate,
  Vendorlogin,
} from "../Controllers/VendorController.js";
var VendorRouter = express.Router();

VendorRouter.get("/getallvendors", getallvendors);
VendorRouter.delete("/deletevendor/:id", deletevendor);
VendorRouter.get("/allvendor", allvendors);
VendorRouter.patch("/statusupdate/:id", statusupdate);
VendorRouter.get("/allvendorsproduct", allvendorsproducts);
VendorRouter.post("/postvendor", postvendor);
VendorRouter.post("/vendorlogin", Vendorlogin);

export default VendorRouter;
