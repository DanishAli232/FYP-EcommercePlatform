import express from "express";
import {
    allvendors,
    deletevendor,
    getallvendors,
    statusupdate,
} from "../Controllers/VendorController.js";
var VendorRouter = express.Router();

/* GET home page. */
VendorRouter.get("/getallvendors", getallvendors);
VendorRouter.delete("/deletevendor/:id", deletevendor);
VendorRouter.get("/allvendor", allvendors);
VendorRouter.patch("/statusupdate/:id", statusupdate);

export default VendorRouter;