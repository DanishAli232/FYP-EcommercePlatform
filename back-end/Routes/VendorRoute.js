import express from "express";
import {
    deletevendor,
    getallvendors,
} from "../Controllers/VendorController.js";
var VendorRouter = express.Router();

/* GET home page. */
VendorRouter.get("/getallvendors", getallvendors);
VendorRouter.delete("/deletevendor/:id", deletevendor);

export default VendorRouter;