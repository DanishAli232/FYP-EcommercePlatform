import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../../Context";

const AddressList = ({
  fullname,
  address,
  mobilenumber,
  setOpen,
  setStatus,
  setmessage,
  setseverity,
  landmark,
  province,
  city,
  labelselect,
  area,
  isDefault,
  _id,
}) => {
  const {
    state,
    fetchAddresses,
    addresslist,
    adddress,
    setadddress,
    setnewAddress,
    setAddressFormOpen,
    setDefaultAddress,
    DefaultAddress,
    setaddresslist,
    dispatch,
  } = useContext(GlobalContext);
  let defaultA;
  const changeDefault = async () => {
    setStatus("loading");
    try {
      const { data2 } = await axios.patch(
        `/api/updatedefaultaddress/${_id}/${state.shippingAddress.data.addressId}`,
        {
          isDefault: true,
        }
      );
      console.log(data2);

      const { data: data1 } = await axios.get(
        `/api/getaddressesbyid/${state.shippingAddress.data.addressId}`
      );
      console.log(data1);

      defaultA = {
        fullname,
        address,
        mobilenumber,
        landmark,
        province,
        city,
        labelselect,
        area,
        isDefault,
        _id,
      };
      console.log(defaultA);

      setDefaultAddress(defaultA);
      setaddresslist(data1[0].addresslist);

      setOpen(true);
      setStatus(null);
      setmessage("Your Default Address Change");
      setseverity("success");
    } catch (error) {
      setOpen(true);
      setStatus(null);
      setmessage("Something Went Wrong");
      setseverity("error");
    }
  };
  useEffect(() => {
    console.log({ isDefault, fullname });
    console.log(addresslist);
  }, [isDefault]);

  return (
    <Box
      onClick={changeDefault}
      sx={{
        border: "0.5px solid #007787",
        width: "400px",
        padding: "10px",
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        boxShadow: isDefault ? "2px 1px 5px 0px #00778785" : "",
        "&:hover": {
          boxShadow: "2px 1px 5px 0px #00778785",
        },
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: "15px" }}>{fullname}</Typography>
        <Button
          sx={{ fontSize: "13px" }}
          onClick={() => {
            setnewAddress(false);
            setAddressFormOpen(true);
            setadddress({
              ...adddress,
              addresslist: {
                fullname,
                address,
                mobilenumber,
                landmark,
                province,
                city,
                labelselect,
                area,
                isDefault,
                _id,
              },
            });
          }}
        >
          Edit
        </Button>
      </Box>
      <Typography sx={{ fontSize: "13px" }}>{mobilenumber}</Typography>
      <Typography sx={{ fontSize: "13px", marginTop: "5px" }}>
        {`${province},${city},${landmark},${address}`}
      </Typography>
      <Typography
        sx={{
          fontSize: "12px",
          color: "#007787",
          padding: "2px 6px",
          width: "35px",
          background: "rgba(0,119,135,.08)",
          marginTop: "10px",
        }}
      >
        {labelselect}
      </Typography>
    </Box>
  );
};

export default AddressList;
