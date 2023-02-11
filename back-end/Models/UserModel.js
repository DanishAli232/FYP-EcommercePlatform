import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneno: { type: String, default: "1234" },
    country: { type: String, default: "Pakistan" },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, default: "user" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
