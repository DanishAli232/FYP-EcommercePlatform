import User from "../Models/userModel.js";
import Vendor from "../Models/VendorModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../Utils/generateToken.js";
import crypto from "crypto";
import Token from "../Models/TokenModel.js";
import { sendEmail } from "../Utils/sendEmail.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../Validators/validateruserinput.js";

export const getall = async (req, res) => {
  try {
    const q = req.query.q;
    console.log(q);
    const keys = ["name", "email"];
    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q))
      );
    };
    // console.log(q);
    const products = await User.find({});
    res.send(search(products));
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
};

export const deleteuser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const studentsdata = await User.findByIdAndDelete(id);
    res.send(studentsdata);
    console.log(studentsdata);
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

export const alluser = async (req, res) => {
  try {
    const studentsdata = await User.find({});
    res.send(studentsdata);
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

export const statusupdate = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params.id);
    const id = req.params.id;
    const statusupdate = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send(statusupdate);
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

export const alladmins = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params.id);
    const id = req.params.id;
    const useradmins = await User.find({ status: "admin" });
    const vendoradmins = await Vendor.find({ status: "admin" });
    const admins = {
      useradmins,
      vendoradmins,
    };
    res.send(admins);
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

export const addUser = async (req, res) => {
  console.log(req.body.values);
  const { isValid, errors, values } = validateRegisterInput(req.body.values);
  try {
    if (!isValid) {
      return res.status(400).send({ errors });
    }

    // let user = await User.findOne({
    //   $or: [{ email: values.email }, { handle: values.handle }],
    // });

    let user = await User.findOne({
      email: values.email,
    });

    if (user) {
      return res.status(401).json({
        errors: { message: "A user with that email address already exists" },
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(values.password, salt);

    const newUser = await User.create({ ...values, password: hashedPassword });
    console.log(newUser);
    const token = await new Token({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `${process.env.BASE_URL}users/${newUser._id}/verify/${token.token}`;
    console.log(url);
    const emailverify = await sendEmail(newUser.email, "Verify Email", url);
    console.log(emailverify);
    res
      .status(201)
      .send({ message: "An Email sent to your account please verify" });
  } catch (err) {
    return res.status(500).json({ errors: { message: err.message } });
  }
};

export const Emailverify = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    let newUser = await User.updateOne({ _id: user._id, verified: true });
    await token.remove();
    const token1 = generateToken(newUser);

    // res.status(200).send({ message: "Email verified successfully", user: {

    // }});
    if (newUser) {
      return res.status(201).json({
        message: "Email verified successfully",
        user: { ...newUser._doc, password: null },
        token1,
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { isValid, errors, values } = await validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).send({ errors });
  }

  try {
    const user = await User.findOne({ email: values.email }).select(
      "+password"
    );

    if (!user) {
      return res.status(401).send({ errors: { message: "User not found" } });
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
