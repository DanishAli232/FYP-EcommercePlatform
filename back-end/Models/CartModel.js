import mongoose, { Schema } from "mongoose";

import { CART_ITEM_STATUS } from "../constants/index.js";

// const CartItemSchema = new mongoose.Schema({
//   product: {
//     type: Schema.Types.ObjectId,
//     ref: "Product",
//   },
//   quantity: Number,
//   purchasePrice: {
//     type: Number,
//     default: 0,
//   },
//   totalPrice: {
//     type: Number,
//     default: 0,
//   },
//   priceWithTax: {
//     type: Number,
//     default: 0,
//   },
//   totalTax: {
//     type: Number,
//     default: 0,
//   },
//   status: {
//     type: String,
//     default: CART_ITEM_STATUS.Not_processed,
//     enum: [
//       CART_ITEM_STATUS.Not_processed,
//       CART_ITEM_STATUS.Processing,
//       CART_ITEM_STATUS.Shipped,
//       CART_ITEM_STATUS.Delivered,
//       CART_ITEM_STATUS.Cancelled,
//     ],
//   },
// });

// export const CartItem = mongoose.model("CartItem", CartItemSchema);

const CartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
        purchasePrice: {
          type: Number,
          default: 0,
        },
        totalPrice: {
          type: Number,
          default: 0,
        },
        priceWithTax: {
          type: Number,
          default: 0,
        },
        totalTax: {
          type: Number,
          default: 0,
        },
        status: {
          type: String,
          default: CART_ITEM_STATUS.Not_processed,
          enum: [
            CART_ITEM_STATUS.Not_processed,
            CART_ITEM_STATUS.Processing,
            CART_ITEM_STATUS.Shipped,
            CART_ITEM_STATUS.Delivered,
            CART_ITEM_STATUS.Cancelled,
          ],
        },
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User1",
    },
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", CartSchema);
