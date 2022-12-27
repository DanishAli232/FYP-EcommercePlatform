export const home = async(req, res, next) => {
    console.log({ title: "hello" });
    return res.status(201).json({ title: "Express" });
};