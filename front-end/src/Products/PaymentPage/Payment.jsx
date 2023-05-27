import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";

import {
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import easypaisa from "../../Assets/easypaisa.png";
import { loadStripe } from "@stripe/stripe-js";

import jazzcash from "../../Assets/ethereum.png";
import cod from "../../Assets/cod.png";
import credit from "../../Assets/credit.png";

import { GlobalContext } from "../../Context";
import axios from "axios";
import PayButton from "./Components/PayButton";
import COD from "./Components/COD";
import JazzCash from "./Components/JazzCash";
import Card from "./Components/Card";
import HBL from "./Components/HBL";
import paypal from "../../Assets/paypal.png";
import NavBar1 from "../../Components/NavBar1";
import Paypal from "./Components/paypal";
import Footer1 from "../../Components/Footer1";

const Payment = () => {
  const navigate = useNavigate();
  const { allprice, state, cartitems, buyNow, setdashboardOpen } =
    useContext(GlobalContext);
  useEffect(() => {
    setdashboardOpen(false);
  });
  const [openBox, setopenBox] = useState({
    COD: false,
    Easypaisa: false,
    HBL: false,
    Card: false,
    JazzCash: false,
  });
  const [background, setbackground] = useState({
    cod: "white",
    card: "white",
    easypaisa: "white",
    hbl: "white",
    jazzcash: "white",
  });
  const style = {
    display: "flex",
    width: { sm: "150px", xs: "100%" },
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "150px",
    marginBottom: { sm: "0px", xs: "20px" },
    // width: "150px",
    "&:hover": {
      backgroundColor: "#ededed",
    },
    cursor: "pointer",
  };

  return (
    <Box sx={{ position: "relative" }}>
      <NavBar1 />
      <Box
        sx={{
          // paddingX: "39px",
          padding: { md: "5px 69px", xs: "5px 13px" },

          // marginTop: "30px",
          backgroundColor: "#f4f4f4",
          minHeight: "100vh",
          paddingBottom: "40px",
        }}
      >
        <Typography
          sx={{
            paddingTop: "20px",
            fontSize: "22px",
            fontWeight: 400,
            color: "#424242",
          }}
        >
          Select Payment Method
        </Typography>
        <Grid container>
          <Grid item md={8} sx={{ width: { sm: "auto", xs: "100%" } }}>
            <Box
              sx={{
                marginTop: "20px",
                paddingBottom: "40px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { sm: "row", xs: "column" },
                  alignItems: "center",
                  width: { sm: "auto", xs: "100%" },
                }}
              >
                <Box
                  sx={{ ...style, backgroundColor: background.easypaisa }}
                  onClick={() => {
                    setopenBox({
                      COD: false,
                      Easypaisa: true,
                      HBL: false,
                      Card: false,
                      JazzCash: false,
                    });
                    setbackground({
                      ...background,
                      cod: "white",
                      card: "white",
                      easypaisa: "#ededed",
                      hbl: "white",
                      jazzcash: "white",
                    });
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      height: "61px",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <img
                      src={paypal}
                      alt=''
                      style={{
                        width: "111px",
                        height: "27px",
                      }}
                    />
                    <Typography>Paypal</Typography>
                  </Box>
                </Box>
                <Tooltip title='Not Available' arrow>
                  <Box
                    sx={{
                      ...style,
                      cursor: "default",
                      marginLeft: "10px",
                      backgroundColor: "#ededed",
                    }}
                    onClick={() => {
                      setopenBox({
                        COD: false,
                        Easypaisa: false,
                        HBL: true,
                        Card: false,
                        JazzCash: false,
                      });
                      setbackground({
                        ...background,
                        cod: "white",
                        card: "white",
                        easypaisa: "white",
                        hbl: "#ededed",
                        jazzcash: "white",
                      });
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        height: "61px",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "blue",
                          fontWeight: "800",
                          fontSize: "25px",
                        }}
                      >
                        HBL
                      </Typography>
                      <Typography>HBL Bank Account</Typography>
                    </Box>
                  </Box>
                </Tooltip>
                <Box
                  sx={{
                    ...style,
                    marginLeft: "10px",
                    backgroundColor: background.jazzcash,
                  }}
                  onClick={() => {
                    setopenBox({
                      COD: false,
                      Easypaisa: false,
                      HBL: false,
                      Card: false,
                      JazzCash: true,
                    });
                    setbackground({
                      ...background,
                      cod: "white",
                      card: "white",
                      easypaisa: "white",
                      hbl: "white",
                      jazzcash: "#ededed",
                    });
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      height: "61px",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <img
                      src={jazzcash}
                      alt=''
                      style={{ width: "42px", height: "32px" }}
                    />
                    <Typography>Using Etherium</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    ...style,
                    marginLeft: "10px",
                    backgroundColor: background.card,
                  }}
                  onClick={() => {
                    setopenBox({
                      COD: false,
                      Easypaisa: false,
                      HBL: false,
                      Card: true,
                      JazzCash: false,
                    });
                    setbackground({
                      ...background,
                      cod: "white",
                      card: "#ededed",
                      easypaisa: "white",
                      hbl: "white",
                      jazzcash: "white",
                    });
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      height: "61px",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <img
                      src={credit}
                      alt=''
                      style={{ width: "47px", height: "37px" }}
                    />
                    <Typography>Credit/Debit Card</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    ...style,
                    marginLeft: "10px",
                    backgroundColor: background.cod,
                  }}
                  onClick={() => {
                    setopenBox({
                      COD: true,
                      Easypaisa: false,
                      HBL: false,
                      Card: false,
                      JazzCash: false,
                    });
                    setbackground({
                      ...background,
                      cod: "#ededed",
                      card: "white",
                      easypaisa: "white",
                      hbl: "white",
                      jazzcash: "white",
                    });
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      height: "61px",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <img
                      src={cod}
                      alt=''
                      style={{ width: "72px", height: "34px" }}
                    />
                    <Typography>Cash On Delivery</Typography>
                  </Box>
                </Box>
              </Box>
              {openBox.COD && <COD />}
              {openBox.Easypaisa && <Paypal />}
              {openBox.JazzCash && <JazzCash />}
              {openBox.Card && <Card />}
              {openBox.HBL && <HBL />}
            </Box>
          </Grid>

          <Grid item md={4}>
            <Box
              sx={{
                marginLeft: { sm: "25px", xs: "0px" },
                width: { sm: "90%", xs: "100%" },
                backgroundColor: "white",
                marginTop: "20px",
                paddingX: "10px",
                paddingBottom: "15px",
              }}
            >
              <Typography
                sx={{
                  paddingTop: "10px",
                  marginBottom: "10px",
                  fontSize: "18px",
                  color: "#212121",
                  fontWeight: 500,
                }}
              >
                Order Summary
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",

                  color: "#757575",
                  lineHeight: "21px",
                  marginBottom: "10px",
                }}
              >
                <Typography sx={{ fontSize: "14px" }}>Items Total</Typography>
                <Typography sx={{ fontSize: "14px" }}>
                  Rs.{" "}
                  {Object.keys(buyNow).length === 0
                    ? allprice.itemstotal
                    : buyNow.price}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",

                  color: "#757575",
                  lineHeight: "21px",
                  marginBottom: "10px",
                }}
              >
                <Typography sx={{ fontSize: "14px" }}>Delivery Fee</Typography>
                <Typography sx={{ fontSize: "14px" }}>
                  Rs.{" "}
                  {Object.keys(buyNow).length === 0
                    ? allprice.alldelivery
                    : 150}{" "}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",

                  color: "#757575",
                  lineHeight: "21px",
                  marginBottom: "10px",
                }}
              >
                <Typography sx={{ fontSize: "14px" }}>Total Payment</Typography>
                <Typography sx={{ fontSize: "14px" }}>
                  Rs.{" "}
                  {Object.keys(buyNow).length === 0
                    ? allprice.withdelivery
                    : buyNow.price + 150}{" "}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "13px",
                }}
              >
                <Typography>Total</Typography>
                <Typography sx={{ fontSize: "18px", color: "#f57224" }}>
                  Rs.{" "}
                  {allprice.withdelivery !== 0
                    ? Object.keys(buyNow).length === 0
                      ? allprice.withdelivery
                      : buyNow.price + 150
                    : navigate("/cartpage")}
                </Typography>
              </Box>
              <Link to='/payment'> </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer1 />
    </Box>
  );
};

export default Payment;
