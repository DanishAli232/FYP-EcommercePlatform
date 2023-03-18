import express from "express";
import {
  addComments,
  addproduct,
  allComments,
  allproduct,
  deleteComments,
  deleteproduct,
  filterProducts,
  findOneproduct,
  getallproducts,
  getproducts,
  updateproduct,
} from "../Controllers/ProductController.js";
var ProductRouter = express.Router();

import multer from "multer";
import * as url from "url";
import path from "path";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const singleFileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads/"));
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, "productImage/" + Date.now() + file.originalname);
  },
});

const singleImageUpload = multer({
  storage: singleFileStorage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Allowed only .png, .jpg, .jpeg and .gif"));
    }
  },
});

/* GET home page. */
ProductRouter.get("/getallproducts", getallproducts);
ProductRouter.get("/getproducts", getproducts);
ProductRouter.delete("/deleteproduct/:id", deleteproduct);
ProductRouter.post(
  "/addproduct/postdata/:uid",
  singleImageUpload.single("image"),
  addproduct
);
ProductRouter.patch("/updateproduct", updateproduct);
ProductRouter.get("/findOneproduct/:id", findOneproduct);
ProductRouter.get("/allproduct", allproduct);
ProductRouter.post("/filterproducts", filterProducts);
ProductRouter.post("/addcomment", addComments);
ProductRouter.get("/allcomment/:id", allComments);
ProductRouter.patch("/deletecomment/:pid/:cid", deleteComments);

export default ProductRouter;
