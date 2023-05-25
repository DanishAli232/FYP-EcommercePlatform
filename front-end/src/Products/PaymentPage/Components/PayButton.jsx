import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../Context";

const PayButton = ({ cartItems }) => {
  const { state, allprice, DefaultAddress } = useContext(GlobalContext);
  const [cartDetails, setcartDetails] = useState([]);
  const [status, setstatus] = useState(false);
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
    setstatus(true);
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
        await axios.post("/api/postorder", {
          cartItems: cartDetails,
          userId: userInfo.user._id,
          alldetail,
        });
        window.location.href = data.url;
      }
      setstatus(false);
    } catch (error) {}
  };

  return (
    <>
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
        onClick={() => handleCheckout()}
      >
        <p className='text-white text-base font-semibold'>
          Confirm Order{" "}
          {status && (
            <CircularProgress sx={{ ml: 1, color: "white" }} size='16px' />
          )}
        </p>
      </Button>
    </>
  );
};

export default PayButton;
