import React, { useContext, useState } from "react";
import Navbar from "../../Components/Navbar";

import {
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import easypaisa from "../../Assets/easypaisa.png";
import { loadStripe } from "@stripe/stripe-js";

import jazzcash from "../../Assets/jazzcash.png";
import cod from "../../Assets/cod.png";
import credit from "../../Assets/credit.png";

import { GlobalContext } from "../../Context";
import axios from "axios";
import PayButton from "./Components/PayButton";
import COD from "./Components/COD";
import JazzCash from "./Components/JazzCash";
import Card from "./Components/Card";
import HBL from "./Components/HBL";

const Payment = () => {
  const { allprice, state, cartitems } = useContext(GlobalContext);
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "150px",
    width: "150px",
    "&:hover": {
      backgroundColor: "#ededed",
    },
    cursor: "pointer",
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Navbar />
      <Box
        sx={{
          paddingX: "39px",
          marginTop: "30px",
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
          <Grid item md={8}>
            <Box
              sx={{
                marginTop: "20px",
                paddingBottom: "40px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
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
                      src={easypaisa}
                      alt=''
                      style={{ width: "111px", height: "27px" }}
                    />
                    <Typography>Easypaisa</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    ...style,
                    marginLeft: "10px",
                    backgroundColor: background.hbl,
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
                      style={{ width: "64px", height: "32px" }}
                    />
                    <Typography>JazzCash</Typography>
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
                    <Typography>Credit/Cebit Caed</Typography>
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
              {openBox.Easypaisa && <COD />}
              {openBox.JazzCash && <JazzCash />}
              {openBox.Card && <Card />}
              {openBox.HBL && <HBL />}

              <PayButton cartItems={cartitems} />
            </Box>
          </Grid>

          <Grid item md={4}>
            <Box
              sx={{
                marginLeft: "15px",
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
                  Rs. {allprice.itemstotal}{" "}
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
                  Rs. {allprice.alldelivery}{" "}
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
                  Rs. {allprice.withdelivery}{" "}
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
                  Rs. {allprice.withdelivery}{" "}
                </Typography>
              </Box>
              <Link to='/payment'> </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Payment;
