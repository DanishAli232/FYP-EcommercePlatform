import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { AnimatePresence, motion } from "framer-motion";
import {
  fadeIn,
  pVariants,
  staggerContainer,
} from "../../../FramerMotion/motion";

const ShopItemsDes = ({ title, price, img }) => {
  const [display1, setdisplay1] = useState("none");
  const [open, setopen] = useState(false);

  useEffect(() => {
    console.log(open);
  }, [open]);

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
          {/* <AnimatePresence>
            {open && (
              <motion.h2
                exit={{ height: "0px", color: "transparent" }}
                variants={pVariants()}
                style={{
                  background: "red",
                  height: "200px",
                  // position: "absolute",
                  // bottom: 0,
                  // backgroundColor: "#2b2d42",
                  // justifyContent: "center",
                  // alignItems: "center",
                  // fontWeight: 600,
                  // width: "100%",
                  // padding: "10px 0px",
                  // fontSize: "16px",
                  // color: "#fff",
                  // cursor: "pointer",
                  // zIndex: 200,
                  // "&:hover": {
                  //   background: "#ef233c",
                  // },
                }}
              >
                Add to Cart
              </motion.h2>
            )}
          </AnimatePresence> */}
          <motion.img
            src={img}
            alt=''
            style={{
              width: "100%",

              height: "300px",
              borderRadius: "5px",
            }}
          />
          {open && (
            <AnimatePresence>
              <motion.p
                exit={{ height: "0px", color: "transparent", y: 100 }}
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
              >
                Add to Cart
              </motion.p>
            </AnimatePresence>
          )}

          {/* <motion.p
            variants={pVariants()}
            style={{
              position: "absolute",
              bottom: 0,
              background: "#2b2d42",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: 600,
              width: "100%",
              padding: "10px 0px",
              fontSize: "16px",
              color: "#fff",
              cursor: "pointer",
              zIndex: 200,
            }}
          >
            Add to Cart
          </motion.p> */}
          <Box
            sx={{
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
              "&:hover": {
                background: "#eb2d42",
                color: "white",
              },
            }}
          >
            <VisibilityIcon sx={{}} />
          </Box>
          <Box
            sx={{
              width: "45px",
              display: display1,
              position: "absolute",
              height: "45px",
              background: "#fff",
              borderRadius: "360px",
              alignItems: "center",
              bottom: "69px",
              right: "6px",
              justifyContent: "center",
              color: "#2b2d42",
              cursor: "pointer",
              "&:hover": {
                background: "#eb2d42",
                color: "white",
              },
            }}
          >
            <ShoppingBasketIcon sx={{}} />
          </Box>
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
            {title}
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
