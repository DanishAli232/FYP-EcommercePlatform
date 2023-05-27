import mongoose from "mongoose";
const userSchema1 = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    points: { type: Number, default: 0 },
    couponcode: [
      {
        code: { type: Number },
        discountper: { type: String },
        noofuse: { type: Number },
        expire: { type: Date },
      },
    ],
    status: { type: String, default: "user" },
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User1 = mongoose.model("User1", userSchema1);

export default User1;
