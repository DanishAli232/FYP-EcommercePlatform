export const validateRegisterInput = ({
  name,
  email,
  password,
  confirmpassword,
}) => {
  console.log({
    name,
    email,
    password,
    confirmpassword,
  });
  const errors = {};

  // Validate name
  if (!name || name.trim() === "") {
    errors.name = "Name shouldn't be empty";
  }

  if (!email || email.trim() === "") {
    errors.email = "Email field shouldn't be empty";
  } else {
    let regExp =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regExp)) {
      errors.email = "Invalid Email";
    }
  }

  if (!password || password === "") {
    errors.password = "password field shouldn't be empty";
  } else {
    if (password != confirmpassword) {
      errors.confirmpassword = "password and confirmpassword don't match";
    }

    if (password.length < 6) {
      errors.password = "Password should be at least 6 characters";
    }
  }

  if (!confirmpassword || confirmpassword.trim() === "") {
    errors.confirmpassword = "Confirm password field shouldn't be empty";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
    values: { name, email, password },
  };
};

export const validateLoginInput = ({ email, password }) => {
  const errors = {};

  //Validate email
  if (!email || email.trim() === "") {
    errors.email = "Email field shouldn't be empty";
  } else {
    let regExp =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regExp)) {
      errors.email = "Invalid Email";
    }
  }

  // Validate Password
  if (!password || password === "") {
    errors.password = "password field shouldn't be empty";
  } else {
    if (password.length < 6) {
      errors.password = "Password should be at least 6 characters";
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
    values: { email, password },
  };
};
