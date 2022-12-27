import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneno: { type: Number, required: true, unique: true },
    idcard: { type: Number, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;