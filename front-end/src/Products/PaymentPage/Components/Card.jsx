import { Box, Button, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../Context";
import PayButton from "./PayButton";

const Card = () => {
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
      <PayButton cartItems={cartitems} />

      {/* <Button
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
        Payment
      </Button> */}
    </Box>
  );
};

export default Card;
