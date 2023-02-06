import jwt from "jsonwebtoken";
import config from "./config.js";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    },

    config.SECRET_KEY,
    { expiresIn: "1d" }
  );
};

export default generateToken;
