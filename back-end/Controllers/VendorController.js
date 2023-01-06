import Vendor from "../Models/VendorModel.js";

export const getallvendors = async(req, res) => {
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

export const deletevendor = async(req, res) => {
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

export const allvendors = async(req, res) => {
    try {
        const studentsdata = await Vendor.find({});
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
        const statusupdate = await Vendor.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.send(statusupdate);
    } catch (error) {
        res.status(404).send(error);
        console.log(error);
    }
};