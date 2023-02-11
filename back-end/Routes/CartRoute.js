// const express = require("express");
// const router = express.Router();

// Bring in Models & Utils

// const Cart = require("../../models/cart");
// const Product = require("../../models/product");
// const auth = require("../../middleware/auth");
// const store = require("../../utils/store");

import express from "express";
import {
  addcartitems,
  updatecartitems,
} from "../Controllers/CartController.js";
import checkAuth from "../Utils/checkAuth.js";

var CartRouter = express.Router();

/* GET home page. */
CartRouter.post("/addcartitems", addcartitems);
// CartRouter.delete("/deletevendor/:id", deletevendor);
// CartRouter.get("/allvendor", allvendors);
CartRouter.patch("/statusupdate/:id", updatecartitems);
// CartRouter.get("/allvendorsproduct", allvendorsproducts);

export default CartRouter;

// // router.delete("/delete/:cartId", auth, async (req, res) => {
// //   try {
// //     await Cart.deleteOne({ _id: req.params.cartId });

// //     res.status(200).json({
// //       success: true,
// //     });
// //   } catch (error) {
// //     res.status(400).json({
// //       error: "Your request could not be processed. Please try again.",
// //     });
// //   }
// // });

// // router.delete("/delete/:cartId/:productId", auth, async (req, res) => {
// //   try {
// //     const product = { product: req.params.productId };
// //     const query = { _id: req.params.cartId };

// //     await Cart.updateOne(query, { $pull: { products: product } }).exec();

// //     res.status(200).json({
// //       success: true,
// //     });
// //   } catch (error) {
// //     res.status(400).json({
// //       error: "Your request could not be processed. Please try again.",
// //     });
// //   }
// // });

// // const decreaseQuantity = (products) => {
// //   let bulkOptions = products.map((item) => {
// //     return {
// //       updateOne: {
// //         filter: { _id: item.product },
// //         update: { $inc: { quantity: -item.quantity } },
// //       },
// //     };
// //   });

// //   Product.bulkWrite(bulkOptions);
// // };

// module.exports = router;
