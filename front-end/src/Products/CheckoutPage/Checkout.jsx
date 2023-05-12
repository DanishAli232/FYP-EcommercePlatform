import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useReducer, useState } from "react";
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
import axios from "axios";
import LoadingBox from "../../Components/LoadingBox";
import NavBar1 from "../../Components/NavBar1";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true }; //keep the previous value and only update loading to true
    case "FETCH_SUCCESS":
      return { ...state, cartdata: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const Checkout = () => {
  const [totalitems, settotalitems] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = useState(null);
  const [message, setmessage] = useState("");
  const [severity, setseverity] = useState("success");

  const {
    AddressBoxOpen,
    AddressFormOpen,
    setCartPrice,
    state,
    allprice,
    buyNow,
    cartitems,
    setcartitems,
    setdashboardOpen,
  } = useContext(GlobalContext);

  const { cart, userInfo } = state;
  useEffect(() => {
    setdashboardOpen(false);
  });
  const initialstate = {
    cartdata: [],
    loading: true,
    error: "",
  };

  const [{ loading, error, cartdata }, dispatch] = useReducer(
    reducer,
    initialstate
  );

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStatus(null);
    setOpen(false);
  };

  const fetchData = async () => {
    if (Object.keys(buyNow).length === 0) {
      console.log("ok1");
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(
          `/api/allcartitems/${userInfo.user._id}`
        );

        console.log(data);
        setCartPrice(data[0].products);
        setcartitems(data[0].products);
        settotalitems(data[0].products.length);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    } else {
      console.log("ok1");
      dispatch({ type: "FETCH_SUCCESS", payload: [] });
    }
  };

  useEffect(() => {
    fetchData();
    console.log(allprice);
    console.log(buyNow);
    console.log(Object.keys(buyNow).length);
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      <NavBar1 />
      <Box
        sx={{
          paddingX: "39px",
          // marginTop: "30px",
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
              {loading ? (
                <LoadingBox />
              ) : error ? (
                <p>Something Went Wrong</p>
              ) : Object.keys(buyNow).length === 0 ? (
                cartitems.map((item, i) => (
                  <CheckoutList
                    key={i}
                    cartid={cart.cartid.cartId}
                    id={item.product._id}
                    title={item.product.name}
                    storename={item.product.brand}
                    price={item.product.price}
                    image={item.product.image}
                    quantity={item.quantity}
                    fetchData={fetchData}
                    setseverity={setseverity}
                    setmessage={setmessage}
                    setOpen={setOpen}
                    setStatus={setStatus}
                  />
                ))
              ) : (
                <CheckoutList
                  key={buyNow._id}
                  cartid={cart.cartid.cartId}
                  id={buyNow._id}
                  title={buyNow.title}
                  storename={buyNow.brand}
                  price={buyNow.price}
                  image={buyNow.image}
                  quantity={buyNow.quantity}
                  fetchData={fetchData}
                  setseverity={setseverity}
                  setmessage={setmessage}
                  setOpen={setOpen}
                  setStatus={setStatus}
                />
              )}
              {/* {cartitems.map((item, i) => (
                <CheckoutList
                  key={i}
                  title={item.title}
                  storename={item.storename}
                  price={item.price}
                  image={item.image}
                />
              ))} */}
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
                  Rs.
                  {Object.keys(buyNow).length === 0
                    ? allprice.alldelivery
                    : 149}
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
                  Rs.
                  {Object.keys(buyNow).length === 0
                    ? allprice.withdelivery
                    : buyNow.price + 149}
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
                  {Object.keys(buyNow).length === 0
                    ? allprice.withdelivery
                    : buyNow.price + 149}
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
      {AddressBoxOpen && (
        <AddressForm
          setOpen={setOpen}
          setStatus={setStatus}
          setmessage={setmessage}
          setseverity={setseverity}
        />
      )}
      {AddressFormOpen && (
        <AddressForm1
          setOpen={setOpen}
          setStatus={setStatus}
          setmessage={setmessage}
          setseverity={setseverity}
        />
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Checkout;
