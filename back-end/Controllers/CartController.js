import mongoose from "mongoose";
import { Cart } from "../Models/CartModel.js";

export const addcartitems = async (req, res) => {
  console.log(req.body);
  try {
    const user = req.body._id;
    const items = req.body.products;

    // const products = store.caculateItemsSalesTax(items);

    const cart = new Cart({
      user,
      products: [
        {
          product: items.productid,
          quantity: items.quantity,
          totalPrice: items.totalprice,
        },
      ],
    });

    const cartDoc = await cart.save();
    console.log(cartDoc);
    // decreaseQuantity(products);

    res.status(200).json({
      success: true,
      cartId: cartDoc.id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

export const updatecartitems = async (req, res) => {
  console.log(req.body);
  try {
    const items = req.body.products;
    const id = req.params.id;
    const cartdata = await Cart.find(
      { _id: id },
      {
        products: { $elemMatch: { product: items.productid } },
      }
    );

    if (cartdata[0].products.length === 0) {
      const data = await Cart.findByIdAndUpdate(
        id,
        {
          $push: {
            products: {
              product: items.productid,
              quantity: items.quantity,
              totalPrice: items.totalprice,
            },
          },
        },
        {
          new: true,
        }
      ).exec();
      res.status(200).json({
        success: true,
        data,
      });
    } else {
      res.status(200).json({
        success: true,
      });
    }

    // console.log(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

export const allcartitems = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("invalid pid");
    return res.status(400).send("Invalid product ID.");
  }
  try {
    const cartdata = await Cart.find({ user: id })
      .select("products")
      .populate("products.product");

    res.send(cartdata);
  } catch (error) {
    res.status(404).send(error);
    // console.log(error);
  }
};

export const deletecartitem = async (req, res) => {
  try {
    const c = req.query.c;
    console.log(req.body);
    let check = req.body.isCheck;

    check.map(async (item, i) => {
      const data = await Cart.updateOne(
        { _id: c },
        { $pull: { products: { product: item } } },
        { new: true }
      ).exec();
      console.log(data);
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

export const deletesinglecartitem = async (req, res) => {
  try {
    const c = req.query.c;
    const p = req.query.i;
    console.log(req.body);
    let check = req.body.isCheck;

    const data = await Cart.updateOne(
      { _id: c },
      { $pull: { products: { product: p } } },
      { new: true }
    ).exec();
    console.log(data);

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

export const updatequantity = async (req, res) => {
  console.log(req.body);
  const q = req.body.quantity;
  const p = req.query.i;

  const c = req.query.c;
  try {
    const data1 = await Cart.updateOne(
      { _id: c, "products.product": p },
      { $set: { "products.$.quantity": q } },
      {
        new: true,
      }
    );
    console.log(data1);
    res.send({ message: "Ok Quantity Updated" });
  } catch (error) {
    console.log(error);
    res.send({ message: "Something Went Wrong" });
  }
};
