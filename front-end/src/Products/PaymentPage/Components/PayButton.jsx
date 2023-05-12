import { Button } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../Context";

const PayButton = ({ cartItems }) => {
  const { state, allprice, DefaultAddress } = useContext(GlobalContext);
  const [cartDetails, setcartDetails] = useState([]);
  const { userInfo } = state;

  useEffect(() => {
    let data = cartItems.map((items, i) => {
      return {
        ...items,
        totalprice: items.product.price * items.quantity + 149,
      };
    });
    setcartDetails(data);
  }, []);
  const handleCheckout = async () => {
    const alldetail = {
      userInfo,
      DefaultAddress,
      paymentMethod: "Stripe",
      allprice,
    };
    try {
      let { data } = await axios.post(`/api/create-checkout-session`, {
        cartItems: cartDetails,
        userId: userInfo.user._id,
        alldetail,
      });

      if (data) {
        // await axios.post("/api/postorder", {
        //   cartItems: cartDetails,
        //   userId: userInfo.user._id,
        //   alldetail,
        // });
        window.location.href = data.url;
      }
    } catch (error) {}
  };

  return (
    <>
      <Button
        onClick={() => handleCheckout()}
        sx={{
          backgroundColor: "#f57224",
          marginTop: "20px",
          color: "white",
          width: "30%",
          "&:hover": {
            backgroundColor: "#f57224",
          },
        }}
      >
        Payment
      </Button>
    </>
  );
};

export default PayButton;
