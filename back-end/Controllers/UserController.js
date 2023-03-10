import User1 from "../Models/user1Model.js";
import Vendor from "../Models/VendorModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../Utils/generateToken.js";
import crypto from "crypto";
import Token from "../Models/TokenModel.js";
import { sendEmail } from "../Utils/sendEmail.js";
import nodemailer from "nodemailer";

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
    const products = await User1.find({});
    res.send(search(products));
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
};

export const deleteuser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const studentsdata = await User1.findByIdAndDelete(id);
    res.send(studentsdata);
    console.log(studentsdata);
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

export const alluser = async (req, res) => {
  try {
    const studentsdata = await User1.find({});
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
    const statusupdate = await User1.findByIdAndUpdate(id, req.body, {
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
    const useradmins = await User1.find({ status: "admin" });
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
  // const transporter = nodemailer.createTransport({
  //   host: "nslookup smtp.gmail.com",
  //   service: process.env.SERVICE,
  //   port: Number(process.env.EMAIL_PORT),
  //   secure: Boolean(process.env.SECURE),
  //   tls: {
  //     rejectUnauthorized: true,
  //     minVersion: "TLSv1.2",
  //   },
  //   auth: {
  //     user: process.env.USER,
  //     pass: process.env.PASS,
  //   },
  // });

  // // const token = jwt.sign({
  // //      data: 'Token Data'  .
  // //     }, 'ourSecretKey', { expiresIn: '10m' }
  // // );

  // const mailConfigurations = {
  //   // It should be a string of sender/server email
  //   from: "balochdanish2020@gmail.com",

  //   to: "mdanishawan165@gmail.com",

  //   // Subject of Email
  //   subject: "Email Verification",

  //   // This would be the text of email body
  //   text: `Hi! There, You have recently visited
  //          our website and entered your email.
  //          Please follow the given link to verify your email
  //          http://localhost:3000/verify
  //          Thanks`,
  // };

  // transporter.sendMail(mailConfigurations, function (error, info) {
  //   if (error) throw Error(error);
  //   console.log("Email Sent Successfully");
  //   console.log(info);
  // });
  const { isValid, errors, values } = validateRegisterInput(req.body.values);
  try {
    if (!isValid) {
      return res.status(400).send({ errors });
    }

    // let user = await User1.findOne({
    //   $or: [{ email: values.email }, { handle: values.handle }],
    // });

    let user = await User1.findOne({
      email: values.email,
    });

    if (user) {
      return res.status(401).json({
        errors: { message: "A user with that email address already exists" },
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(values.password, salt);

    const newUser = await User1.create({ ...values, password: hashedPassword });
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

export const Emailverify = async (req, res) => {
  try {
    const user = await User1.findOne({ _id: req.params.id });
    console.log(req.params.id);
    console.log(req.params.token);
    console.log(user);
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    console.log(token);
    if (!token) return res.status(400).send({ message: "Invalid link" });
    const _id = req.params.id;
    const newUser = await User1.findByIdAndUpdate(
      _id,
      { verified: true },
      {
        new: true,
      }
    );
    // let newUser = await User1.updateOne({ _id: user._id, verified: true });
    console.log(newUser);
    await token.remove();
    const token1 = generateToken(newUser);

    // res.status(200).send({ message: "Email verified successfully", user: {

    // }});
    console.log({
      message: "Email verified successfully",
      user: { ...newUser._doc, password: null },
      token1,
    });
    if (newUser) {
      return res.status(201).json({
        message: "Email verified successfully",
        user: { ...newUser._doc, password: null },
        token1,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  console.log(req.body);
  let values = req.body;
  if (req.body.platform) {
    try {
      const user = await User1.findOne({ email: values.email });
      console.log(user);
      let token;
      let newUser;
      if (!user) {
        console.log("yess1");
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(values.email, salt);
        newUser = await User1.create({
          email: values.email,
          name: values.name,
          password: hashedPassword,
        });
        console.log(newUser);

        token = generateToken(newUser);
        return res.json({ user: { ...newUser._doc, password: null }, token });
      } else {
        console.log("yess2");
        token = generateToken(user);
      }
      console.log("yesss3");
      if (!token) {
        return res
          .status(500)
          .send({ errors: { message: "Something went wrong!" } });
      }

      return res.json({ user: { ...user._doc, password: null }, token });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ errors: { message: error.message } });
    }
  } else {
    const { isValid, errors, values } = await validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).send({ errors });
    }

    try {
      const user = await User1.findOne({ email: values.email }).select(
        "+password"
      );

      if (!user) {
        return res.status(401).send({ errors: { message: "User1 not found" } });
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
  }
};
