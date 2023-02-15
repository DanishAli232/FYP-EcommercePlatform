import {
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import Navbar from "../../Components/Navbar";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import img1 from "../../Assets/img.jpg";
import img2 from "../../Assets/img1.jpg";
import img3 from "../../Assets/img2.jpg";
import img4 from "../../Assets/img3.jpg";
import img5 from "../../Assets/img4.jpg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Address from "./Components/Address";
import CheckoutList from "./Components/CheckoutList";
import AddressForm from "../AddressPage/Address";
import { GlobalContext } from "../../Context";
import AddressForm1 from "../AddressPage/AdressForm1";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { AddressBoxOpen, AddressFormOpen } = useContext(GlobalContext);
  const cartitems = [
    {
      title: "Rubber Coated Dumbbell Fitness Home Gym Home Exercise Dumbbell",
      image: img1,
      storename: "Store Name",
      price: "499",
    },
    {
      title: "Rubber Coated Dumbbell Fitness Home Gym Home Exercise Dumbbell",
      image: img2,
      storename: "Store Name",
      price: "499",
    },
    {
      title: "Rubber Coated Dumbbell Fitness Home Gym Home Exercise Dumbbell",
      image: img3,
      storename: "Store Name",
      price: "499",
    },
    {
      title: "Rubber Coated Dumbbell Fitness Home Gym Home Exercise Dumbbell",
      image: img4,
      storename: "Store Name",
      price: "499",
    },
    {
      title: "Rubber Coated Dumbbell Fitness Home Gym Home Exercise Dumbbell",
      image: img5,
      storename: "Store Name",
      price: "499",
    },
  ];
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
        <Grid container>
          <Grid item md={8}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  marginRight: "10px",
                  backgroundColor: "white",
                  marginTop: "20px",
                  flexDirection: "row",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    fontSize: "12px",
                  }}
                >
                  <Checkbox sx={{ color: "#757575" }} />
                  <Typography sx={{ color: "#757575" }}>Select All</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <DeleteOutlineOutlinedIcon sx={{ color: "#757575" }} />
                  <Typography sx={{ color: "#757575", paddingRight: "12px" }}>
                    Delete All
                  </Typography>
                </Box>
              </Box>
              <Address />
              {cartitems.map((item, i) => (
                <CheckoutList
                  key={i}
                  title={item.title}
                  storename={item.storename}
                  price={item.price}
                  image={item.image}
                />
              ))}
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
                  fontSize: "16px",
                  color: "#1a1a1a",
                  fontWeight: 500,
                }}
              >
                Discount and Payment
              </Typography>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "13px",
                  }}
                >
                  {" "}
                  <input
                    style={{
                      padding: "10px",
                      outlineColor: "#2a29296b",
                      width: "70%",
                    }}
                    type='text'
                    name='voucher'
                    placeholder='Enter Voucher Code'
                    id='voucher'
                  />
                  <Button
                    sx={{
                      backgroundColor: "#25a5d8",
                      color: "#fff",
                      marginLeft: "10px",
                      paddingTop: "8px",
                      paddingBottom: "8px",
                      minWidth: "76px",
                      "&:hover": {
                        backgroundColor: "#25a5d8",
                      },
                    }}
                  >
                    Apply
                  </Button>
                </Box>
              </Box>
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
                  PLACEHOLDER
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {AddressBoxOpen && <AddressForm />}
      {AddressFormOpen && <AddressForm1 />}
    </Box>
  );
};

export default Checkout;