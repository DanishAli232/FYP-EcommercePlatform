import express from "express";
import {
  addcartitems,
  allcartitems,
  deletecartitem,
  deletecartitems,
  updatecartitems,
  updatequantity,
} from "../Controllers/CartController.js";
import checkAuth from "../Utils/checkAuth.js";

var CartRouter = express.Router();

CartRouter.post("/addcartitems", addcartitems);
CartRouter.patch("/deletecartitem", deletecartitem);
CartRouter.delete("/deletecartitems/:id", deletecartitems);
CartRouter.get("/allcartitems/:id", allcartitems);
CartRouter.patch("/updatequantity", updatequantity);
CartRouter.patch("/updatecartitems/:id", updatecartitems);

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
