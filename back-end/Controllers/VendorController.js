import Product from "../Models/productModel.js";
import Vendor from "../Models/VendorModel.js";
import bcrypt from "bcryptjs";

import {
  validateVendorInput,
  validateVendorLoginInput,
} from "../Validators/validateVendorInput.js";
import generateToken from "../Utils/generateToken.js";

export const getallvendors = async (req, res) => {
  try {
    const q = req.query.q;
    console.log(q);
    const keys = ["name", "email", "storename"];
    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q))
      );
    };
    // console.log(q);
    const products = await Vendor.find({});
    res.send(search(products));
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
};

export const deletevendor = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const vendorsdata = await Vendor.findByIdAndDelete(id);
    res.status(200).send(vendorsdata);
    console.log(vendorsdata);
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

export const allvendors = async (req, res) => {
  try {
    const studentsdata = await Vendor.find({});
    res.send(studentsdata);
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

export const statusupdate = async (req, res) => {
  try {
    const id = req.params.id;
    const statusupdate = await Vendor.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send(statusupdate);
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

export const allvendorsproducts = async (req, res) => {
  try {
    const q = req.query.q;
    console.log(q);
    const f = req.query.f;
    const keys = ["name", "description"];
    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q))
      );
    };
    // console.log(q);
    const products = await Product.find({ vendor: f });
    res.send(search(products));
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
};

export const postvendor = async (req, res) => {
  console.log(req.body);

  const { isValid, errors, values } = validateVendorInput(req.body.values);
  try {
    if (!isValid) {
      return res.status(400).send({ errors });
    }

    // let user = await Vendor.findOne({
    //   $or: [{ email: values.email }, { handle: values.handle }],
    // });

    let user = await Vendor.findOne({
      email: values.email,
    });

    if (user) {
      return res.status(401).json({
        errors: { message: "A Vendor with that email address already exists" },
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(values.password, salt);

    const newUser = await Vendor.create({
      ...values,
      password: hashedPassword,
    });
    console.log(newUser);
    // const token = await new Token({
    //   userId: newUser._id,
    //   token: crypto.randomBytes(32).toString("hex"),
    // }).save();

    // const url = `${process.env.BASE_URL}email/${newUser._id}/verify/${token.token}`;
    // console.log(url);
    // await sendEmail(newUser.email, "Verify Email", url);

    // if ((email.message = "error")) {
    //   res.send({ message: "Not Email Send" });
    // }
    // res.send({ message: "An Email sent to your account please verify" });
    const token = generateToken(newUser);
    res.json({ user: { ...newUser._doc, password: null }, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Not Email Send" });
  }
};

export const Vendorlogin = async (req, res) => {
  console.log(req.body);
  const { isValid, errors, values } = await validateVendorLoginInput(req.body);
  if (!isValid) {
    return res.status(400).send({ errors });
  }

  try {
    const user = await Vendor.findOne({ email: values.email }).select(
      "+password"
    );

    if (!user) {
      return res.status(401).send({ errors: { message: "Vendor not found" } });
    }

    const isMatch = await bcrypt.compare(values.password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .send({ errors: { message: "Credientials are not valid!" } });

    let token = generateToken(user);

    if (!token) {
      return res
        .status(500)
        .send({ errors: { message: "Something went wrong!" } });
    }

    return res.json({ user: { ...user._doc, password: null }, token });
  } catch (error) {
    return res.status(500).send({ errors: { message: error.message } });
  }
};

export const storeName = async (req, res) => {
  try {
    let data = await Vendor.findOne({ _id: req.params.id });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};
