import mongoose, { Schema } from "mongoose";

import { CART_ITEM_STATUS } from "../constants/index.js";

const WishListSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,

        totalPrice: {
          type: Number,
          default: 0,
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

export const Wishlist = mongoose.model("Wishlist", WishListSchema);
