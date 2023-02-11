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
          product: "63e61d404f913ccbc7c6e584",
          quantity: items.quantity,
          totalprice: items.totalPrice,
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
  try {
    const product = req.body.product;
    const query = { _id: req.params.cartId };

    const { data } = await Cart.updateOne(query, {
      $push: { products: product },
    }).exec();
    console.log(data);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};
