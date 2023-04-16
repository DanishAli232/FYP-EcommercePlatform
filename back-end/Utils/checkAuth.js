import jwt from "jsonwebtoken";
import config from "./config.js";

const checkAuth = (req, res) => {
  // console.log(req.body);
  const auth = req.headers.authorization;
  let token = auth.split("Bearer ")[1];
  // console.log(token);
  try {
    if (token) {
      const user = jwt.verify(token, config.SECRET_KEY);
      // console.log(user);
      if (user) return user;
      else throw new Error("Invalid/Expired token");
    } else throw new Error("Authorization header must be provided");
  } catch (error) {
    throw new Error(error);
  }
};

export default checkAuth;
