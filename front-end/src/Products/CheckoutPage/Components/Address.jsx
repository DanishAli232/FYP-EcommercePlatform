import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../Context";

const Address = () => {
  const {
    setAddressBoxOpen,
    setAddressFormOpen,
    setaddresslist,
    dispatch: ctxDispatch,
    DefaultAddress,
    setDefaultAddress,
    setnewAddress,
    state,
  } = useContext(GlobalContext);
  const openAdressBox = () => {
    setAddressBoxOpen(true);
  };
  const fetchData = async () => {
    const { data: data1 } = await axios.get(
      `/api/getaddresses/${state.userInfo.user._id}`
    );
    console.log(data1);
    let data = { success: true, addressId: data1[0]._id };
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        data,
      },
    });

    let defaultA = data1[0].addresslist.find((item) => {
      return (item.isDefault = true);
    });
    setDefaultAddress(defaultA);
    setaddresslist(data1[0].addresslist);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        marginTop: "15px",
        padding: "13px",
      }}
    >
      <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#1a1a1a" }}>
        Deliver to: {DefaultAddress.fullname}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {" "}
        <Typography
          sx={{
            fontSize: "12px",
            color: "#007787",
            padding: "2px 6px",
            background: "rgba(0,119,135,.08)",
          }}
        >
          {DefaultAddress.labelselect}
        </Typography>
        <span
          style={{
            height: "19px",
            margin: "0px 8px",
            backgroundColor: "#e5e5e5",
            width: ".5px",
          }}
        ></span>
        <Typography sx={{ fontSize: "12px", color: "#1a1a1a" }}>
          {DefaultAddress.mobilenumber}
        </Typography>
        <span
          style={{
            height: "19px",
            margin: "0px 8px",
            backgroundColor: "#e5e5e5",
            width: ".5px",
          }}
        ></span>
        <Typography
          sx={{
            fontSize: "12px",
            color: "#1a1a1a",
          }}
        >
          {`${DefaultAddress.address},${DefaultAddress.city},${DefaultAddress.province}`}
        </Typography>
        <Button
          onClick={() => {
            setnewAddress(false);
            setAddressFormOpen(true);
          }}
          sx={{ fontSize: "12px" }}
        >
          Change
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "12px" }}>Bill To Same Address</Typography>
        <Button sx={{ fontSize: "12px" }} onClick={openAdressBox}>
          Edit
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "12px" }}>
          Email To: {state.userInfo.user.email}
        </Typography>
        <Button sx={{ fontSize: "12px" }}>Edit</Button>
      </Box>
    </Box>
  );
};

export default Address;
