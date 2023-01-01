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
        const studentsdata = await Vendor.findByIdAndDelete(id);
        res.send(studentsdata);
        console.log(studentsdata);
    } catch (error) {
        res.status(404).send(error);
        console.log(error);
    }
};