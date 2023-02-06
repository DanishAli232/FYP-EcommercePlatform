import bcrypt from "bcryptjs";

const comparePassword = (password, password2) => {
  const errors = {};
  return bcrypt.compare(password, password2).then((isMatch) => {
    if (!isMatch) {
      errors.account = "Wrong credentials";
      throw new Error("Wrong credentials");
    }
    return { isValid: !!errors, errors };
  });
};

export default comparePassword;
