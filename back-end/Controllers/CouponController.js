import Coupon from "../Models/CouponsModel.js";
import { validateCouponInput } from "../Validators/validatecouponInput.js";

export const addcoupon = async (req, res) => {
  console.log(req.body);
  const { isValid, errors, values } = validateCouponInput(req.body);
  try {
    if (!isValid) {
      return res.status(500).send({ errors });
    }
    let data = await Coupon.create({ ...req.body });
    console.log(data);
    res.send({ message: "Operartion Successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something Went Wrong" });
  }
};

export const getcoupons = async (req, res) => {
  const userId = req.query.id;
  const searchVal = req.query.sval;
  let filter = {};
  if (searchVal) {
    filter = {
      $or: [
        { couponname: { $regex: searchVal, $options: "i" } },
        // { "products.product.price": { $regex: searchVal, $options: "i" } },
      ],
    };
  }
  // const regex = new RegExp(searchVal, "i");

  try {
    const couponsData = await Coupon.find({
      vendor: userId,
      ...filter,
    });

    console.log(couponsData);
    res.status(200).send(couponsData);
  } catch (error) {
    res.status(404).send("Something Went Wrong");
    console.log(error);
  }
};

export const deletecoupons = async (req, res) => {
  try {
    const i = req.query.i;
    const v = req.query.v;

    const data = await Coupon.deleteOne({ vendor: v, _id: i }).exec();
    console.log(data);
    res.status(200).json({
      success: true,
      message: "Successfully Removed",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};
