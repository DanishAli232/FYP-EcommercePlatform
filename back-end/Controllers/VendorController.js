import Product from "../Models/productModel.js";
import Vendor from "../Models/VendorModel.js";
import { sendEmail } from "../Utils/sendEmail.js";

import bcrypt from "bcryptjs";
import Token from "../Models/TokenModel.js";
import crypto from "crypto";

import {
  validateVendorInput,
  validateVendorLoginInput,
} from "../Validators/validateVendorInput.js";
import generateToken from "../Utils/generateToken.js";

export const updatePayments = async (req, res) => {
  console.log(req.body);
  const payment = req.body;

  try {
    const vendor = await Vendor.updateOne(
      { _id: payment.vendor },
      {
        $push: {
          payments: {
            Amount: payment.amount,
            status: payment.status,
            Date: payment.Date,
            Recepient: payment.recepient,
            paymentMethod: payment.paymentMethod,
          },
        },
        billingPlan: payment.BillingPlan,
        nextpayment: payment.nextpayment,
        currentpayment: payment.currentpayment,
        currentpaymentDate: payment.currentpaymentDate,
      },
      { new: true }
    );
    const vendor0 = await Vendor.findOne({ _id: payment.vendor });

    console.log(vendor0);

    const token = generateToken(vendor0);
    res.json({ user: { ...vendor0._doc, password: null }, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

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
      billingPlan: "",
      nextpayment: "",
      currentpayment: "",
      currentpaymentDate: null,
    });
    console.log(newUser);
    const token = await new Token({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `${process.env.BASE_URL}email/${newUser._id}/verify/${token.token}`;
    console.log(url);
    let email = await sendEmail(newUser.email, "Verify Email", url);

    if (email.message === "error") {
      console.log("errorrr");
      await Vendor.deleteOne({ _id: newUser._id });
      res.send({
        errors: { message: "Sorry Not Email Send" },
      });
    } else {
      const token = generateToken(newUser);
      res.json({ user: { ...newUser._doc, password: null }, token });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Not Email " });
  }
};

export const Emailverify3 = async (req, res) => {
  try {
    let user;

    user = await Vendor.findOne({ _id: req.params.id });

    console.log(req.params.id);
    console.log(req.params.token);
    console.log(user);
    if (!user) {
      console.log("user not found");
      return res.status(400).send({ message: "Invalid link" });
    }

    try {
      const token = await Token.findOne({
        token: req.params.token,
      });
      console.log(token);
      if (token) {
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: "Invalid link" });
    }

    const _id = req.params.id;
    const newUser = await Vendor.findByIdAndUpdate(
      _id,
      { verified: true },
      {
        new: true,
      }
    );
    // let newUser = await Vendor.updateOne({ _id: user._id, verified: true });
    console.log(newUser);
    await Token.deleteMany({});

    // res.status(200).send({ message: "Email verified successfully", user: {

    // }});
    console.log({
      message: "Email verified successfully",
      user: { ...newUser._doc, password: null },
    });
    if (newUser) {
      return res.status(201).json({
        message: "Email verified successfully",
        user: { ...newUser._doc, password: null },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
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

export const postPayment = (req, res) => {
  try {
  } catch (error) {}
};

export const getVendorData = async (req, res) => {
  try {
    let data = await Vendor.findOne({ _id: req.query.f });
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};
