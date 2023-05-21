import express from "express";
import {
  addcoupon,
  deletecoupons,
  getcoupons,
} from "../Controllers/CouponController.js";

var CouponRouter = express.Router();

CouponRouter.post("/addcoupon", addcoupon);
CouponRouter.get("/getcoupons", getcoupons);
CouponRouter.patch("/deletecoupons", deletecoupons);

export default CouponRouter;
