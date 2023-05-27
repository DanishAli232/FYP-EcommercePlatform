import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useState, useContext, useReducer, useEffect } from "react";
import Navbar from "../../Components/Navbar";

import CartList from "./Components/CartList";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../Context";
import axios from "axios";
import LoadingBox from "../../Components/LoadingBox";
import NavBar1 from "../../Components/NavBar1";
import Footer1 from "../../Components/Footer1";
import styled from "styled-components";

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

const Cart = () => {
  const [totalitems, settotalitems] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = useState(null);
  const [message, setmessage] = useState("");
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [wishitems, setwishitems] = useState([]);

  const {
    cartitems,
    setcartitems,
    setCartPrice,
    setbuyNow,
    fetchcartItems,
    state,
    dispatch: ctxDispatch,
    totalprice,
    CheckVal,
    setdashboardOpen,
    newCheckVal,
  } = useContext(GlobalContext);
  useEffect(() => {
    setdashboardOpen(false);
  });
  const { cart, userInfo } = state;
  const [message1, setmessage1] = useState("");
  const initialstate = {
    cartdata: [],
    loading: true,
    error: "",
  };
  console.log(userInfo.user._id);
  const [{ loading, error, cartdata }, dispatch] = useReducer(
    reducer,
    initialstate
  );

  const fetchWishData = async () => {
    try {
    } catch (error) {}
    const { data } = await axios.get(`/api//allwishitems/${userInfo.user._id}`);
    console.log(data);
    if (data) {
      console.log(data);
      setwishitems(data[0].products);
    }
  };

  const fetchData = async () => {
    try {
      newCheckVal([]);
      dispatch({ type: "FETCH_REQUEST" });
      // const { data } = await axios.get(
      //   `/api/allcartitems/${userInfo.user._id}`
      // );
      const data = await fetchcartItems();
      if (data) {
        console.log(data);
        setCartPrice(data[0].products);
        setmessage1("");
        settotalitems(data[0].products.length);
      } else {
        setmessage1("No Cart Items Yet");
      }

      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_FAIL", payload: error.message });
    }
  };

  const DeleteRow = async () => {
    // window.location.reload();
    try {
      setStatus("loading");

      // const data = CheckVal.map(async (item) => {
      const data = await axios.patch(
        `/api/deletecartitem?c=${cart.cartid.cartId}`,
        {
          isCheck,
        }
      );
      // // });
      console.log(data);
      if (data) {
        setOpen(true);
        setmessage("Data Delete Successfully");
        setStatus("");
        if (isCheckAll) {
          setIsCheckAll(!isCheckAll);
          setIsCheck([]);
        }
        fetchData();
      }
    } catch (error) {
      setOpen(true);
      setmessage("Something Went Wrong");
      setStatus("");
      console.log(error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStatus(null);
    setOpen(false);
  };

  useEffect(() => {
    fetchWishData();
    fetchData();
    setbuyNow({});
  }, []);

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(cartitems.map((li) => li.product._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };
  useEffect(() => {
    console.log(isCheck);
  }, [isCheck]);

  useEffect(() => {
    console.log(cartitems);
  }, [cartitems]);

  return (
    <Box>
      <NavBar1 />
      {/* {status === "loading" && <CircularProgress sx={{ ml: 1 }} size='16px' />} */}
      <Box
        sx={{
          padding: { md: "5px 69px", xs: "5px 13px" },
          // marginTop: "30px",
          backgroundColor: "#f4f4f4",
          minHeight: "100vh",
        }}
      >
        <Grid container>
          <Grid item md={8} sx={{ width: "100%", paddingBottom: "40px" }}>
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "100%" }}
            >
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
                  <Checkbox
                    sx={{ color: "#757575" }}
                    onClick={handleSelectAll}
                  />
                  <Typography sx={{ color: "#757575" }}>Select All</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  {/* <DeleteOutlineOutlinedIcon sx={{ color: "#757575" }} /> */}
                  {isCheck.length === 0 ? (
                    <Typography
                      sx={{
                        color: "#757575",
                        paddingRight: "12px",
                      }}
                    >
                      Delete All
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        color: "#757575",
                        paddingRight: "12px",
                        "&:hover": {
                          color: "red",
                        },
                      }}
                      onClick={DeleteRow}
                    >
                      Delete All
                      {status === "loading" && (
                        <CircularProgress sx={{ ml: 1 }} size='16px' />
                      )}
                    </Typography>
                  )}
                </Box>
              </Box>

              {loading ? (
                <LoadingBox />
              ) : error ? (
                <p>Something Went Wrong</p>
              ) : message1 ? (
                <p>No Cart Items Yet</p>
              ) : (
                cartitems.map((item, i) => (
                  <CartList
                    key={i}
                    cartid={cart.cartid.cartId}
                    // cartid={23}
                    id={item.product._id}
                    name={item.product.name}
                    storename={item.product.brand}
                    price={item.product.price}
                    image={item.product.image}
                    quantity={item.quantity}
                    fetchData={fetchData}
                    CheckVal={CheckVal}
                    newCheckVal={newCheckVal}
                    state={state}
                    dispatch={ctxDispatch}
                    setmessage={setmessage}
                    setOpen={setOpen}
                    handleClick={handleClick}
                    wishitems={wishitems}
                    setStatus={setStatus}
                    isChecked={isCheck.includes(item.product._id)}
                  />
                ))
              )}
              {}
            </Box>
          </Grid>
          <Grid item md={4} sx={{ width: "100%" }}>
            <Box
              sx={{
                marginLeft: { md: "15px", xs: "0px" },
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
                <Typography sx={{ fontSize: "14px" }}>
                  SubTotal ({totalitems} items )
                </Typography>
                <Typography sx={{ fontSize: "14px" }}>
                  Rs. {totalprice}
                </Typography>
              </Box>
              {/* <Box
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
                  value={voucher}
                  onChange={(e) => handleVoucher(e)}
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
              </Box> */}

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
                <Typography sx={{ fontSize: "18px", color: "#f0353b" }}>
                  Rs.
                  {loading ? (
                    <CircularProgress size='20px' sx={{ color: "#f0353b" }} />
                  ) : (
                    totalprice
                  )}
                </Typography>
              </Box>
              <Link to='/checkout' sx={{ textDecoration: "none" }}>
                {" "}
                <Button
                  sx={{
                    backgroundColor: "#f0353b",
                    color: "white",
                    width: "100%",
                    "&:hover": {
                      backgroundColor: "#d90429",
                    },
                  }}
                >
                  PROCEED TO CHECKOUT
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer1 />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Cart;
