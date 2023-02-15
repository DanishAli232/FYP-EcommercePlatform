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
  try {
    // console.log(q);
    const products = await Product.find({});
    res.send(products);
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
};

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
    const vendor = await Vendor.findById({ _id: "63adaf89297e1cdd753232d7" });

    // 63adaf89297e1cdd753232d7
    if (!vendor) {
      return res.status(404).json({ errors: { message: "Vendor not found" } });
    }

    const product = await Product.create({
      ...req.body,
      vendor: "63adaf89297e1cdd753232d7",
      image: req.file.filename,
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
