import { Box, Button, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../Context";

const COD = () => {
  const { state, allprice, DefaultAddress, cartitems } =
    useContext(GlobalContext);
  const [cartDetails, setcartDetails] = useState([]);
  const [status, setstatus] = useState(false);
  const { userInfo } = state;

  useEffect(() => {
    let data = cartitems.map((items, i) => {
      return {
        ...items,
        totalprice: items.product.price * items.quantity + 150,
      };
    });
    setcartDetails(data);
  }, []);
  const navigate = useNavigate();
  const alldetail = {
    userInfo,
    DefaultAddress,
    paymentMethod: "Cash on Delivery",
    allprice,
  };
  const ConfirmOrder = async () => {
    console.log({
      cartItems: cartDetails,
      userId: userInfo.user._id,
      alldetail,
      isPaid: false,
      paidAt: null,
    });

    setstatus(true);
    try {
      let { data } = await axios.post("/api/postorder", {
        cartItems: cartDetails,
        userId: userInfo.user._id,
        alldetail,
        isPaid: false,
        paidAt: null,
      });
      console.log(data);
      if (data) {
        setstatus(false);
        navigate("/checkout-success");
      }
    } catch (error) {}
  };
  return (
    <Box
      sx={{
        backgroundColor: "#ededed",
        marginTop: "10px",
        height: "85px",
        padding: "40px 20px",
        width: "93%",
      }}
    >
      <Typography>
        You can pay in cash to our courier when you receive the goods at your
        doorstep.
      </Typography>
      <Button
        onClick={ConfirmOrder}
        sx={{
          backgroundColor: "#f57224",
          marginTop: "20px",
          color: "white",
          width: "40%",
          "&:hover": {
            backgroundColor: "#f57224",
          },
        }}
      >
        Confirm Order
        {status && (
          <CircularProgress sx={{ ml: 1, color: "white" }} size='16px' />
        )}
      </Button>
    </Box>
  );
};

export default COD;
