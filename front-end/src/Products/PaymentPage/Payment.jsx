import React from "react";
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
const Payment = () => {
  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "150px",
    width: "150px",
    backgroundColor: "white",
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
        <Typography sx={{ paddingTop: "20px" }}>
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
                <Box sx={style}>
                  <Typography>E</Typography>
                  <Typography>Easypaisa</Typography>
                </Box>
                <Box sx={{ ...style, marginLeft: "10px" }}>
                  <Typography>H</Typography>
                  <Typography>HBL Bank Account</Typography>
                </Box>
                <Box sx={{ ...style, marginLeft: "10px" }}>
                  <Typography>Jazz</Typography>
                  <Typography>JazzCash</Typography>
                </Box>
                <Box sx={{ ...style, marginLeft: "10px" }}>
                  <Typography>C</Typography>
                  <Typography>Credit/Cebit Caed</Typography>
                </Box>
                <Box sx={{ ...style, marginLeft: "10px" }}>
                  <Typography>C</Typography>
                  <Typography>Cash On Delivery</Typography>
                </Box>
              </Box>
            </Box>{" "}
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
                <Typography sx={{ fontSize: "14px" }}>Rs. 1200 </Typography>
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
                <Typography sx={{ fontSize: "14px" }}>Rs. 308 </Typography>
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
                <Typography sx={{ fontSize: "14px" }}>Rs. 1500 </Typography>
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
                  Rs. 1599{" "}
                </Typography>
              </Box>
              <Link to='/payment'>
                {" "}
                <Button
                  sx={{
                    backgroundColor: "#f57224",
                    color: "white",
                    width: "100%",
                    "&:hover": {
                      backgroundColor: "#f57224",
                    },
                  }}
                >
                  Confirm Order
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Payment;
