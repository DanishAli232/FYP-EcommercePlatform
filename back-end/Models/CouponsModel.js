import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
  {
    couponname: { type: String, required: true },
    maxprice: { type: String, required: true },
    discountper: { type: String, required: true },
    description: { type: String, required: false },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
  },
  {
    timestamps: true,
  }
);

const Coupon = mongoose.model("Coupon", CouponSchema);

export default Coupon;
