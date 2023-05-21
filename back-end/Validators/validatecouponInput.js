export const validateCouponInput = ({ couponname, maxprice, discountper }) => {
  const errors = {};

  if (!couponname || couponname.trim() === "") {
    errors.couponname = "couponName is required";
  }

  if (!maxprice || maxprice.trim() === "") {
    errors.maxprice = "maximumPrice is required";
  }

  if (!discountper || discountper.trim() === "") {
    errors.discountper = "discountPercentage is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
    values: {
      couponname,
      maxprice,
      discountper,
    },
  };
};
