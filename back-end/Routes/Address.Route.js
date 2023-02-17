import express from "express";
import {
  getaddresses,
  postAddress,
  postnewaddress,
  updateaddress,
} from "../Controllers/AddressController.js";
import checkAuth from "../Utils/checkAuth.js";

var AddressRouter = express.Router();

AddressRouter.post("/postaddress", postAddress);
AddressRouter.patch("/postnewaddress/:id", postnewaddress);
AddressRouter.patch("/updateaddress/:id/:addressid", updateaddress);
// AddressRouter.patch("/deletesingleitem", deletesinglecartitem);
AddressRouter.get("/getaddresses/:id", getaddresses);
// AddressRouter.patch("/updatequantity", updatequantity);
// AddressRouter.patch("/updatecartitems/:id", updatecartitems);

export default AddressRouter;
