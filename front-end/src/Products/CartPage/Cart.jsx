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
  const [cartitems, setcartitems] = useState([]);
  const [totalitems, settotalitems] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = useState(null);
  const [message, setmessage] = useState("");
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const {
    setCartPrice,
    state,
    dispatch: ctxDispatch,
    totalprice,
    CheckVal,
    newCheckVal,
  } = useContext(GlobalContext);
  const { cart, userInfo } = state;
  const initialstate = {
    cartdata: [],
    loading: true,
    error: "",
  };

  const [{ loading, error, cartdata }, dispatch] = useReducer(
    reducer,
    initialstate
  );

  const fetchData = async () => {
    try {
      newCheckVal([]);
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
    fetchData();
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
      <Navbar />
      {status === "loading" && <CircularProgress sx={{ ml: 1 }} size='16px' />}
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
              ) : (
                cartitems.map((item, i) => (
                  <CartList
                    key={i}
                    cartid={cart.cartid.cartId}
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
                    setStatus={setStatus}
                    isChecked={isCheck.includes(item.product._id)}
                  />
                ))
              )}
              {}
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
                <Typography sx={{ fontSize: "14px" }}>
                  SubTotal ({totalitems} items )
                </Typography>
                <Typography sx={{ fontSize: "14px" }}>
                  Rs. {totalprice}
                </Typography>
              </Box>
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
                  Rs.
                  {loading ? (
                    <CircularProgress size='20px' sx={{ color: "#f57224" }} />
                  ) : (
                    totalprice
                  )}
                </Typography>
              </Box>
              <Link to='/checkout' sx={{ textDecoration: "none" }}>
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
                  PROCEED TO CHECKOUT
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Cart;