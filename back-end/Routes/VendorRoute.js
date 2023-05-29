import express from "express";
import {
  allvendors,
  allvendorsproducts,
  deletevendor,
  Emailverify3,
  getallvendors,
  getVendorData,
  postPayment,
  postvendor,
  statusupdate,
  storeName,
  updatePayments,
  Vendorlogin,
} from "../Controllers/VendorController.js";
var VendorRouter = express.Router();

VendorRouter.get("/getallvendors", getallvendors);
VendorRouter.delete("/deletevendor/:id", deletevendor);
VendorRouter.get("/allvendor", allvendors);
VendorRouter.patch("/statusupdate/:id", statusupdate);
VendorRouter.get("/allvendorsproduct", allvendorsproducts);
VendorRouter.post("/postvendor", postvendor);
VendorRouter.get("/:id/verify3/:token", Emailverify3);
VendorRouter.get("/storeName/:id", storeName);
VendorRouter.post("/vendorlogin", Vendorlogin);
VendorRouter.post("/postpayment", postPayment);
VendorRouter.get("/getvendorsData", getVendorData);
VendorRouter.post("/updatepayment", updatePayments);

export default VendorRouter;
