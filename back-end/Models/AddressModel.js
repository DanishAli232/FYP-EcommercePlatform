import mongoose from "mongoose";
const Schema = mongoose.Schema;

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User1",
    },
    addresslist: [
      {
        address: {
          type: String,
        },
        city: {
          type: String,
        },
        province: {
          type: String,
        },
        fullname: {
          type: String,
        },
        country: {
          type: String,
        },
        area: {
          type: String,
        },
        labelselect: {
          type: String,
        },
        landmark: {
          type: String,
        },
        mobilenumber: {
          type: String,
        },
        isDefault: {
          type: Boolean,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Address = mongoose.model("Address", addressSchema);
