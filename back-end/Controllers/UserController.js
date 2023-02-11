import User from "../Models/userModel.js";
import Vendor from "../Models/VendorModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../Utils/generateToken.js";
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

    const token = generateToken(newUser);

    if (newUser) {
      return res
        .status(201)
        .json({ user: { ...newUser._doc, password: null }, token });
    }
  } catch (err) {
    return res.status(500).json({ errors: { message: err.message } });
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
