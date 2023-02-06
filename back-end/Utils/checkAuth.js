import jwt from "jsonwebtoken";
import config from "./config.js";

const checkAuth = (auth) => {
  let token = auth?.split("Bearer ")[1];

  try {
    if (token) {
      const user = jwt.verify(token, config.SECRET_KEY);
      if (user) return user;
      else throw new Error("Invalid/Expired token");
    } else throw new Error("Authorization header must be provided");
  } catch (error) {
    throw new Error(error);
  }
};

export default checkAuth;
