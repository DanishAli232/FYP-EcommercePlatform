import express from "express";
import data from "../demoData.js";
import User from "../Models/userModel.js";

const DemoRouter = express.Router();

DemoRouter.get("/add", async(req, res) => {
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    // await User.remove({});
    // const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
});
export default DemoRouter;