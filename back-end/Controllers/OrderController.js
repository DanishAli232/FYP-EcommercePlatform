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
        vendor: x.product.vendor,
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
      isPaid: req.body.isPaid,
      paidAt: req.body.paidAt,
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
    // console.log(error);
    res.status(400).send({ message: "Something Went Wrong" });
  }
};

export const getorders = async (req, res) => {
  const searchVal = req.query.sval;
  const userId = req.query.uid;

  console.log(q);

  // const searchVal = req.query.sval;
  // let filter = {};
  // if (searchVal) {
  //   filter = {
  //     $or: [
  //       // { totalPrice: searchVal },
  //       { "user.name": { $regex: searchVal, $options: "i" } },

  //       { paymentMethod: { $regex: searchVal, $options: "i" } },
  //     ],
  //   };
  // }
  try {
    const keys = [
      "user.name",
      "user.email",
      // "rating",
      // "numReviews",
      // "brand",a
      // "countinstock",
    ];
    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q))
      );
    };
    // console.log(q);
    const order = await Order.find({ user: userId }).populate("user");
    res.send(search(order));
    // const order = await Order.find({ user: userId, ...filter }).populate(
    //   "user"
    // );
    // console.log(order);
    // res.send(order);
  } catch (error) {
    console.log("error");
    console.log(error);
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

export const getvendororders = async (req, res) => {
  try {
    const orders = await Order.find(
      { "orderItems.vendor": req.query.uid }
      // { "orderItems.$": 1 }
    );

    res.send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something Went Wrong" });
  }
};

export const fetchOrderProducts = async (req, res) => {
  try {
    let data = await Order.find({ user: req.query.id }).select("orderItems");
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

// orderRouter.put(
//   "/:id/pay",
//   isAuth,
//   expressAsyncHandler(async(req, res) => {
//       const order = await Order.findById(req.params.id);
//       if (order) {
//           order.isPaid = true;
//           order.paidAt = Date.now();
//           order.paymentResult = {
//               id: req.body.id,
//               status: req.body.status,
//               update_time: req.body.update_time,
//               email_address: req.body.email_address,
//           };

//           const updatedOrder = await order.save();
//           res.send({ message: "Order Paid", order: updatedOrder });
//       } else {
//           res.status(404).send({ message: "Order Not Found" });
//       }
//   })
// );
