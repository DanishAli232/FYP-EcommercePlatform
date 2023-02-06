import mongoose from "mongoose";
const Schema = mongoose.Schema;

const vendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneno: { type: Number, required: true },
    country: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, default: "vendor" },
    storename: { type: String, required: true, default: "AR" },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
}, {
    timestamps: true,
});

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;