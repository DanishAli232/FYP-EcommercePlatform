import express from "express";
import data from "../demoData.js";
import Product from "../Models/productModel.js";
import User1 from "../Models/UserModel.js";
import Vendor from "../Models/VendorModel.js";

const DemoRouter = express.Router();

DemoRouter.get("/adduserss", async(req, res) => {
    await User1.remove({});
    const createdUsers = await User.insertMany(data.users);
    // await User.remove({});
    // const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
});

DemoRouter.get("/addvendorss", async(req, res) => {
    await Vendor.remove({});
    const createdUsers = await Vendor.insertMany(data.vendors);
    // await User.remove({});
    // const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
});

DemoRouter.get("/addproductss", async(req, res) => {
    await Product.remove({});
    const createdUsers = await Product.insertMany(data.products);
    // await User.remove({});
    // const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
});
export default DemoRouter;