import mongoose from "mongoose";
const Schema = mongoose.Schema;

const vendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneno: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    payments: [
      {
        Amount: { type: String },
        status: {
          type: String,
          default: "completed",
          enum: ["pending", "completed"],
        },
        Date: { type: Date },
        Recepient: { type: String },
        paymentMethod: { type: String },
      },
    ],
    status: { type: String, default: "vendor" },
    storename: { type: String, required: true, default: "AR" },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    billingPlan: { type: String },
    nextpayment: { type: Date },
    currentpayment: { type: String },
    currentpaymentDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
