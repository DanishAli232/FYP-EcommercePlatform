import User from "../Models/userModel.js";
import Vendor from "../Models/VendorModel.js";

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
        const products = await User.find({});
        res.send(search(products));
    } catch (err) {
        return res.status(500).json({ error: { message: err.message } });
    }
};

export const deleteuser = async(req, res) => {
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

export const alluser = async(req, res) => {
    try {
        const studentsdata = await User.find({});
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
        const statusupdate = await User.findByIdAndUpdate(id, req.body, {
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