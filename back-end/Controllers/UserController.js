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
import User1 from "../Models/UserModel.js";

export const getall = async(req, res) => {
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

export const deleteuser = async(req, res) => {
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

export const alluser = async(req, res) => {
    try {
        const studentsdata = await User1.find({});
        res.send(studentsdata);
    } catch (error) {
        res.status(404).send(error);
        console.log(error);
    }
};

export const statusupdate = async(req, res) => {
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

export const alladmins = async(req, res) => {
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

export const addUser = async(req, res) => {
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

        const newUser = await User1.create({...values, password: hashedPassword });
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
            await User1.deleteOne({ _id: newUser._id });
            res.send({
                errors: { message: "Sorry Not Email Send" },
            });
        } else {
            const token = generateToken(newUser);
            res.json({ user: {...newUser._doc, password: null }, token });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Not Email Send" });
    }
};

export const Emailverify = async(req, res) => {
    try {
        let user;

        user = await User1.findOne({ _id: req.params.id });

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
            if (token) {}
        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: "Invalid link" });
        }

        const _id = req.params.id;
        const newUser = await User1.findByIdAndUpdate(
            _id, { verified: true }, {
                new: true,
            }
        );
        // let newUser = await User1.updateOne({ _id: user._id, verified: true });
        console.log(newUser);
        await Token.deleteMany({});

        // res.status(200).send({ message: "Email verified successfully", user: {

        // }});
        console.log({
            message: "Email verified successfully",
            user: {...newUser._doc, password: null },
        });
        if (newUser) {
            return res.status(201).json({
                message: "Email verified successfully",
                user: {...newUser._doc, password: null },
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

export const login = async(req, res) => {
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
                return res.json({ user: {...newUser._doc, password: null }, token });
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

            return res.json({ user: {...user._doc, password: null }, token });
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
            console.log(user);
            if (!user) {
                return res.status(401).send({ errors: { message: "User1 not found" } });
            }

            const isMatch = await bcrypt.compare(values.password, user.password);
            console.log(isMatch);
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

            return res.json({ user: {...user._doc, password: null }, token });
        } catch (error) {
            return res.status(500).send({ errors: { message: error.message } });
        }
    }
};

export const forgotPassword = async(req, res) => {
    let email1 = req.body.email;
    console.log(req.body.email);
    await Token.deleteMany({});
    try {
        if (!email1 || email1.trim() === "") {
            return res.status(400).send({ message: "Please provide email" });
        }
        const user = await User1.findOne({ email: email1 });

        console.log(user);
        if (!user) {
            console.log("User not found");
            return res.status(400).send({ message: "User Not Found" });
        }

        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}forgotpassword/${email1}/verify/${token.token}`;
        console.log(url);
        let email = await sendEmail(email1, "Verify Email", url);

        res.status(200).send({ message: "Email send to your gmail address" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

export const Emailverify2 = async(req, res) => {
    try {
        let user;

        user = await User1.findOne({ email: req.params.id });

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
            if (token) {}
        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: "Invalid link" });
        }
        await Token.deleteMany({});
        res.status(200).send({ message: "ok" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

export const ChangePassword = async(req, res) => {
    console.log(req.body);
    let errors = {};
    const { email, password, confirmpassword } = req.body;
    if (password.length < 6) {
        errors.password = "password length should be >= 6";
    }

    if (!password || password.trim() === "") {
        errors.password = "password should not be empty";
    }

    if (!confirmpassword || confirmpassword.trim() === "") {
        errors.confirmpassword = "ConfirmPassword should not be empty";
    } else if (password !== confirmpassword) {
        errors.confirmpassword = "Password and ConfirmPassword are not match";
    }

    console.log(errors);
    if (Object.keys(errors).length === 0) {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);
            let data = await User1.updateOne({
                email: email,
            }, {
                $set: {
                    password: hashedPassword,
                },
            }, { new: true });
            res.status(200).send({ message: "ok" });
        } catch (error) {
            console.log(error);
        }
    } else {
        return res.status(500).send(errors);
    }
};

export const accountDetail = async(req, res) => {
    try {
        let data = await User1.findOne({ _id: req.params.id });
        console.log(data);
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

export const updatePoints = async(req, res) => {
    let user = req.query.user;
    let points0 = await User1.findOne({ _id: user }).select("points email");

    //   console.log();
    try {
        let data = await User1.findByIdAndUpdate({ _id: user }, {
            $set: {
                points: points0.points + 100,
            },
        }, { new: true });
        console.log(data);
        const generateRandomNumbers = (count) => {
            let randomNumbers = "";
            for (let i = 0; i < count; i++) {
                const randomNumber = Math.floor(Math.random() * 100) + 1;
                randomNumbers += randomNumber;
            }
            return randomNumbers;
        };
        let token = generateToken(user);

        if (!token) {
            return res
                .status(500)
                .send({ errors: { message: "Something went wrong!" } });
        }
        const randomNumbers = generateRandomNumbers(4);
        if (data.points === 500) {
            let data1 = await User1.findByIdAndUpdate({ _id: user }, {
                $set: {
                    "couponcode.code": randomNumbers,
                    "couponcode.noofuse": 1,
                    "couponcode.expire": "",
                    "couponcode.discountper": "20%",
                },
            }, { new: true });
            const url = `${process.env.BASE_URL}email/${newUser._id}/verify/${token.token}`;
            console.log(url);
            let email = await sendEmail(
                points0.email,
                "Your Discount CouponCode",
                `No You can Enjoy 20% Discount on Your Shopping and you can use it only for one time your couponCode is ${randomNumbers}`
            );
            return res.json({ user: {...data1._doc, password: null }, token });
        } else if (data.points === 1000) {
            let data1 = await User1.findByIdAndUpdate({ _id: user }, {
                $set: {
                    "couponcode.code": randomNumbers,
                    "couponcode.noofuse": 1,
                    "couponcode.expire": "",
                    "couponcode.discountper": "30%",
                },
            }, { new: true });
            let email = await sendEmail(
                points0.email,
                "Your Discount CouponCode",
                `No You can Enjoy 30% Discount on Your Shopping and you can use it only for one time your couponCode is ${randomNumbers}`
            );
            return res.json({ user: {...data1._doc, password: null }, token });
        } else if (data.points === 2400) {
            let data1 = await User1.findByIdAndUpdate({ _id: user }, {
                $set: {
                    "couponcode.code": randomNumbers,
                    "couponcode.noofuse": 1,
                    "couponcode.expire": "",
                    "couponcode.discountper": "50%",
                },
            }, { new: true });
            let email = await sendEmail(
                points0.email,
                "Your Discount CouponCode",
                `No You can Enjoy 50% Discount on Your Shopping and you can use it only for one time your couponCode is ${randomNumbers}`
            );
            return res.json({ user: {...data1._doc, password: null }, token });
        }

        return res.json({ user: {...data._doc, password: null }, token });
    } catch (error) {
        console.log(error);
    }
};

export const updateCouponCode = async(req, res) => {
    let user = req.query.user;

    try {
        let data1 = await User1.findByIdAndUpdate({ _id: user }, {
            $set: {
                "couponcode.code": "",
                "couponcode.noofuse": 0,
                "couponcode.expire": "",
                "couponcode.discountper": "",
            },
        }, { new: true });
        console.log(data1);
        let token = generateToken(user);

        if (!token) {
            return res
                .status(500)
                .send({ errors: { message: "Something went wrong!" } });
        }
        return res.json({ user: {...data1._doc, password: null }, token });
    } catch (error) {}
};