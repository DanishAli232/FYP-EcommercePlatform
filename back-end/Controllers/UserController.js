import User from "../Models/userModel.js";

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