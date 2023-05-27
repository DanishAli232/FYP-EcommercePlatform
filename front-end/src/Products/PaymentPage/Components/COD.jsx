import { Box, Button, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../Context";

const COD = () => {
  const {
    state,
    allprice,
    DefaultAddress,
    cartitems,
    dispatch: ctxDispatch,
  } = useContext(GlobalContext);
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
      // let { data } = await axios.post("/api/postorder", {
      //   cartItems: cartDetails,
      //   userId: userInfo.user._id,
      //   alldetail,
      //   isPaid: false,
      //   paidAt: null,
      // });
      // console.log(data);
      // if (data) {
      setstatus(false);
      try {
        let { data } = await axios.get(
          `/api/updatePoints?user=${state?.userInfo?.user?._id}`
        );
        console.log(data);
        ctxDispatch({ type: "USER_SIGNIN", payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
      } catch (error) {}
      // navigate("/checkout-success");
      // }
    } catch (error) {}
  };
  return (
    <Box
      sx={{
        backgroundColor: "#ededed",
        marginTop: "10px",
        height: "85px",
        padding: "10px 20px",
        width: "95%",
      }}
    >
      <Button
        sx={{
          backgroundColor: "#f0353b",
          color: "white",
          width: "98%",
          height: "44px",
          marginTop: "19px",
          "&:hover": {
            backgroundColor: "#d90429",
          },
        }}
        onClick={ConfirmOrder}
      >
        <p className='text-white text-base font-semibold'>
          Confirm Order
          {status && (
            <CircularProgress sx={{ ml: 1, color: "white" }} size='16px' />
          )}
        </p>
      </Button>
    </Box>
  );
};

export default COD;
