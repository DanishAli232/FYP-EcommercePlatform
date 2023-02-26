import Order from "../Models/OrderModel.js";

export const postorder = async (req, res) => {
  console.log(req.body);
  try {
    const newOrder = new Order({
      orderItems: req.body.cartItems.map((x) => ({
        name: x.product.name,
        image: x.product.image,
        brand: x.product.brand,
        category: x.product.category,
        description: x.product.description,
        price: x.product.price,
        quantity: x.quantity,
        product: x.product._id,
      })),
      shippingAddress: {
        fullName: req.body.alldetail.DefaultAddress.fullname,
        address: req.body.alldetail.DefaultAddress.address,
        city: req.body.alldetail.DefaultAddress.city,
        province: req.body.alldetail.DefaultAddress.province,
        landmark: req.body.alldetail.DefaultAddress.landmark,
        shippingId: req.body.alldetail.DefaultAddress._id,
      },
      paymentMethod: req.body.alldetail.paymentMethod,
      itemsPrice: req.body.alldetail.allprice.itemstotal,
      shippingPrice: req.body.alldetail.allprice.alldelivery,
      // taxPrice: req.body.alldetail.taxPrice,
      totalPrice: req.body.alldetail.allprice.withdelivery,
      isPaid: true,
      paidAt: Date.now(),
      paymentResult: {
        status: "success",
        update_time: Date.now(),
        email_address: req.body.alldetail.userInfo.user.email,
      },
      user: req.body.userId,
    });

    const order = await newOrder.save();
    res.status(200).send({ message: "New Order Created", order });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Something Went Wrong" });
  }
};

export const getorders = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    }
  } catch (error) {
    res.status(400).send({ message: "Something Went Wrong" });
  }
};

export const getmineorders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id });
    res.send(orders);
  } catch (error) {
    res.status(400).send({ message: "Something Went Wrong" });
  }
};
