import { Cart } from "../Models/CartModel.js";
import { Wishlist } from "../Models/WishModel.js";

export const addwishitems = async (req, res) => {
  console.log(req.body);
  try {
    const user = req.body._id;
    const items = req.body.products;

    // const products = store.caculateItemsSalesTax(items);

    const wish = new Wishlist({
      user,
      products: [
        {
          product: items.productid,
          quantity: items.quantity,
          totalPrice: items.totalprice,
        },
      ],
    });

    const wishlist = await wish.save();
    console.log(wishlist);
    // decreaseQuantity(products);

    res.status(200).json({
      success: true,
      wishId: wishlist.id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

export const updatewishitems = async (req, res) => {
  console.log(req.body);
  try {
    const items = req.body.products;
    const id = req.params.id;

    const cartdata = await Wishlist.find({
      products: { $elemMatch: { product: items.productid } },
    });
    console.log(cartdata.length);

    if (cartdata.length === 0) {
      const { data } = await Wishlist.findByIdAndUpdate(
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

export const allwishitems = async (req, res) => {
  const id = req.params.id;
  try {
    const cartdata = await Wishlist.find({ user: id }).select("products");
    // .populate("products.product");

    res.status(200).send(cartdata);
  } catch (error) {
    res.status(404).send("Something Went Wrong");
    console.log(error);
  }
};

export const getwishitems = async (req, res) => {
  const userId = req.query.id;
  const searchVal = req.query.sval;
  let filter = {};
  if (searchVal) {
    filter = {
      $or: [
        { "products.product.name": { $regex: searchVal, $options: "i" } },
        // { "products.product.price": { $regex: searchVal, $options: "i" } },
      ],
    };
  }
  // const regex = new RegExp(searchVal, "i");

  try {
    const wishdata = await Wishlist.find({
      user: userId,
      ...filter,
    })
      .select("products")
      .populate("products.product");
    console.log(wishdata);
    res.status(200).send(wishdata);
  } catch (error) {
    res.status(404).send("Something Went Wrong");
    console.log(error);
  }
};

export const deletewishitem = async (req, res) => {
  try {
    const p = req.query.i;
    const c = req.query.c;

    const data = await Wishlist.updateOne(
      { _id: c },
      { $pull: { products: { product: p } } },
      { new: true }
    ).exec();
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

export const deletecartitems = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedata = await Cart.findByIdAndDelete(id);
    if (deletedata) {
      res.status(200).json({
        message: "Your Cart Items Deleted",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Your request could not be processed. Please try again.",
    });
  }
};
