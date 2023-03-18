import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User1",
      unique: true,
    },
    token: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Token = mongoose.model("Token", tokenSchema);

export default Token;
