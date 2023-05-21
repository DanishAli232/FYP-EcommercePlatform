import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { AnimatePresence, motion } from "framer-motion";
import {
  divVariants,
  fadeIn,
  pVariants,
  staggerContainer,
} from "../../../FramerMotion/motion";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../Context";
import axios from "axios";

const ShopItemsDes = ({
  name,
  price,
  image,
  _id,
  vendor,
  description,
  rating,
  brand,
}) => {
  const {
    state,
    dispatch: ctxDispatch,
    fetchcartItems,
    setbuyNow,
  } = useContext(GlobalContext);
  const { cart, userInfo } = state;
  const navigate = useNavigate();
  const [display1, setdisplay1] = useState("none");
  const [open, setopen] = useState(false);

  const addToCartHandler = async () => {
    const products = {
      productid: _id,
      quantity: 1,
      totalprice: price,
    };
    const id = userInfo.user._id;
    if (cart.cartid) {
      const { data } = await axios.patch(
        `/api/updatecartitems/${cart.cartid.cartId}`,
        {
          products,
        }
      );
      navigate("/cartpage");
      console.log(data);
    } else {
      const { data } = await axios.post("/api/addcartitems", {
        products,
        id,
      });
      console.log(data);
      fetchcartItems();
      ctxDispatch({
        type: "CART_ADD_ITEM",
        payload: {
          products,
        },
      });
      navigate("/cartpage");

      // ctxDispatch({
      //   type: "CART_ID",
      //   payload: {
      //     data,
      //   },
      // });
    }

    // navigate("/cartpage");
  };
  const handleClicker = (item) => {
    navigate(`/productdetail/${_id}`, { state: item });
  };

  const handleBasket = () => {
    const _id = userInfo?.user?._id;
    if (_id) {
      setbuyNow({
        id: _id,
        name,
        brand,
        price: price,
        image: image,
        description,
        rating,
        quantity: 1,
        vendor,
      });
      navigate("/checkout");
    } else {
      navigate("/signin");
    }
  };
  return (
    <motion.div
      variants={staggerContainer}
      initial='hidden'
      animate='show'
      whileHover='hover'
      viewport={{ once: false, amount: 0.25 }}
    >
      <Box>
        <Box
          sx={{ display: "flex", position: "relative" }}
          onMouseEnter={() => {
            setdisplay1("flex");
            setopen(true);
          }}
          onMouseLeave={() => {
            setdisplay1("none");
            setopen(false);
          }}
        >
          <Box sx={{ height: { md: "250px", xs: "150px" }, width: "100%" }}>
            <img
              src={image}
              alt='image1'
              style={{
                width: "100%",
                objectFit: "cover",
                objectPosition: "center",
                // height: { md: "300px", xs: "150px" },
                height: "100%",
                borderRadius: "5px",
              }}
            />
          </Box>
          <AnimatePresence>
            {open && (
              <motion.p
                onClick={addToCartHandler}
                whileHover={{
                  background: "#eb2d42",
                  transition: {
                    //   yoyo: Infinity,
                    duration: 0.5,
                  },
                }}
                variants={pVariants()}
                style={{
                  position: "absolute",
                  bottom: "-16px",
                  background: "#2b2d42",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: 600,
                  width: "100%",
                  padding: "10px 0px",
                  fontSize: "16px",
                  color: "#fff",
                  cursor: "pointer",
                  zIndex: 0,
                  textAlign: "center",
                }}
                exit={{
                  y: 50,
                  background: "transparent",
                }}
              >
                Add to Cart
              </motion.p>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {open && (
              <motion.div
                onClick={() =>
                  handleClicker({
                    name,
                    price,
                    image,
                    vendor,
                    description,
                    rating,
                    _id,
                  })
                }
                whileHover={{
                  background: "#eb2d42",
                  color: "white",
                  transition: {
                    //   yoyo: Infinity,
                    duration: 0.5,
                  },
                }}
                variants={divVariants()}
                style={{
                  width: "45px",
                  display: display1,
                  position: "absolute",
                  height: "45px",
                  background: "#fff",
                  borderRadius: "360px",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#2b2d42",
                  bottom: "124px",
                  right: "6px",
                  cursor: "pointer",
                }}
                exit={{
                  x: 60,
                  background: "transparent",
                }}
              >
                <VisibilityIcon sx={{}} />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {open && (
              <motion.div
                onClick={handleBasket}
                whileHover={{
                  background: "#eb2d42",
                  color: "white",
                  transition: {
                    //   yoyo: Infinity,
                    duration: 0.5,
                  },
                }}
                variants={divVariants()}
                style={{
                  width: "45px",
                  position: "absolute",
                  height: "45px",
                  background: "#fff",
                  display: "flex",
                  borderRadius: "360px",
                  alignItems: "center",
                  bottom: "69px",
                  right: "6px",
                  justifyContent: "center",
                  color: "#2b2d42",
                  cursor: "pointer",
                }}
                exit={{
                  x: 60,
                  background: "transparent",
                }}
              >
                <ShoppingBasketIcon sx={{}} />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          {" "}
          <Typography
            sx={{
              fontSize: "17px",
              fontWeight: 600,
              lineHeight: "26px",
              color: "#2b2d42",
              cursor: "pointer",
              paddingTop: "10px",
              "&:hover": {
                color: "#ef233c",
              },
            }}
          >
            {name}
          </Typography>
          <Typography
            variant='p'
            sx={{
              fontSize: "17px",
              textAlign: "center",
              fontWeight: "bold",
              color: "#ef233c",
              cursor: "pointer",
              paddingTop: "10px",
              "&:hover": {
                color: "#ef233c",
              },
            }}
          >
            {price}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

export default ShopItemsDes;
