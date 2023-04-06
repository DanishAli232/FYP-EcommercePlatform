import Product from "../Models/productModel.js";
import Vendor from "../Models/VendorModel.js";
import { validateProductInput } from "../Validators/validateproductinput.js";

export const getallproducts = async (req, res) => {
  try {
    const q = req.query.q;
    console.log(q);
    const keys = [
      "name",
      "description",
      // "rating",
      // "numReviews",
      // "brand",
      // "countinstock",
    ];
    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q))
      );
    };
    // console.log(q);
    const products = await Product.find({});
    res.send(search(products));
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
};

export const deleteproduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const studentsdata = await Product.findByIdAndDelete(id);
    res.send(studentsdata);
    console.log(studentsdata);
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

export const getproducts = async (req, res) => {
  const protocol = req.protocol;
  const host = req.hostname;
  const port = process.env.PORT || 5000;
  let avatarUrl = `${protocol}://${host}:${port}/uploads/`;
  try {
    // console.log(q);
    const products = await Product.find({});
    var sortedArr = products.map((x) => {
      return { ...x._doc, image: avatarUrl + x.image };
    });

    res.send(sortedArr);
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
};
` `;
export const updateproduct = async (req, res) => {
  console.log(req.body.featured);
  try {
    console.log(req.body);
    const id = req.params.id;
    console.log(id);
    const findDataandupdate = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send(findDataandupdate);
    console.log(findData);
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

export const findOneproduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
    console.log(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
};

export const allproduct = async (req, res) => {
  const product = await Product.find({});
  if (product) {
    res.send(product);
    console.log(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
};

export const addproduct = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const protocol = req.protocol;
  const host = req.hostname;

  const port = process.env.PORT || 5000;
  let avatarUrl = `${protocol}://${host}:${port}/uploads/`;
  // console.log(req.body.featured);
  // // console.log(req.file);
  const { isValid, errors, values } = validateProductInput({
    ...req.body,
    image: req.file,
  });
  try {
    if (!isValid) {
      return res.status(400).json({ errors });
    }

    // const user = await User.findById(req.authUser.id);
    const vendor = await Vendor.findById({ _id: req.params.uid });

    // 63adaf89297e1cdd753232d7
    if (!vendor) {
      return res.status(404).json({ errors: { message: "Vendor not found" } });
    }

    const product = await Product.create({
      ...req.body,
      vendor: req.params.uid,
      image: avatarUrl + req.file.filename,
      rating: 2,
      numReviews: 20,
    });

    vendor.products.push(product);
    vendor.save();

    if (!product) {
      return res
        .status(500)
        .json({ errors: { message: "Something went wrong" } });
    }

    return res.status(201).json({ product });
  } catch (err) {
    return res.status(500).send({ errors: { message: err.message } });
  }
};

export const filterProducts = async (req, res) => {
  console.log(req.body);
  let values = req.body;
  if (values.limit === 1) {
    values.limit = 0;
  } else {
    values.limit = (values.limit - 1) * 9;
    console.log(values.limit);
  }
  let sortprice = {};
  if (values.sorting === "") {
    sortprice = {};
  } else if (values.sorting === "lowtohigh") {
    sortprice = { price: 1 };
  } else if (values.sorting === "hightolow") {
    sortprice = { price: -1 };
  }

  const product = await Product.find({
    $and: [
      { category: "Shoes" },
      { price: { $gte: 0, $lte: 600 } },
      { rating: 2 },
    ],
  })
    .skip(0)
    .limit(9)
    .sort(sortprice);

  console.log(product.length);
  res.send("pak");
  if (product) {
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
};

export const addComments = async (req, res) => {
  console.log(req.body);
  let id = req.body.productid;
  try {
    const findProduct = await Product.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: {
            userid: req.body.user,
            username: req.body.username,
            comment: req.body.comment,
          },
        },
      },
      {
        new: true,
      }
    ).exec();
    console.log(findProduct);
    res.send({ message: "your Comment Successfully Submit" });
  } catch (error) {
    console.log(error);
  }
};

export const allComments = async (req, res) => {
  let id = req.params.id;
  try {
    const findProduct = await Product.findById(id).select("comments");
    res.send(findProduct);
  } catch (error) {
    console.log(error);
  }
};

export const deleteComments = async (req, res) => {
  let pid = req.params.pid;
  let cid = req.params.cid;

  console.log(cid);
  try {
    const data = await Product.updateOne(
      { _id: pid },
      { $pull: { comments: { _id: cid } } },
      { new: true }
    ).exec();
    res.send({ message: "Comment Deleted" });
  } catch (error) {
    console.log(error);
  }
};

export const fetchComments = async (req, res) => {
  let id = req.params.vid;
  try {
    const findProduct = await Product.find({ vendor: id });
    // const comments = await Product.aggregate([
    //   { $group: { _id: "$vendor", comments: { $push: "$comments" } } },
    // ]);
    console.log(findProduct);
    // console.log(comments);
    res.send(findProduct);
  } catch (error) {
    console.log(error);
  }
};

export const postAnswer = async (req, res) => {
  let pid = req.params.pid;
  let cid = req.params.cid;
  console.log({ pid, cid, req: req.body });
  let ans = req.body.answer;
  try {
    const data1 = await Product.updateOne(
      { _id: pid, "comments._id": cid },
      { $set: { "comments.$.answer": ans } },
      {
        new: true,
      }
    );
    console.log(data1);
    // console.log(comments);
    res.send(data1);
  } catch (error) {
    console.log(error);
  }
};
