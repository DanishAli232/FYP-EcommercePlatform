export const validateAddressInput = ({
  fullname,
  address,
  number,
  landmark,
  province,
  city,
  labelselect,
  area,
}) => {
  const errors = {};

  if (!fullname || fullname.trim() === "") {
    errors.fullname = "Name is required";
  }

  if (!address || address.trim() === "") {
    errors.address = "Address is required";
  }

  if (!number || number.trim() === "") {
    errors.number = "PhoneNumber is required";
  }

  if (!landmark || landmark.trim() === "") {
    errors.landmark = "Landmark is required";
  }
  if (!province || province.trim() === "") {
    errors.province = "Province is required";
  }
  if (!area || area.trim() === "") {
    errors.area = "Area is required";
  }
  if (!city || city.trim() === "") {
    errors.city = "City is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
    values: {
      fullname,
      address,
      number,
      landmark,
      province,
      city,
      labelselect,
      area,
    },
  };
};
