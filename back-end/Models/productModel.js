import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countinstock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    vendor: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
    comments: [
      {
        userid: { type: Schema.Types.ObjectId, ref: "User1" },
        username: { type: String },
        comment: { type: String },
        answer: { type: String },
      },
    ],
    reviews: [
      {
        userid: { type: Schema.Types.ObjectId, ref: "User1" },
        username: { type: String },
        review: { type: String },
        rating: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
