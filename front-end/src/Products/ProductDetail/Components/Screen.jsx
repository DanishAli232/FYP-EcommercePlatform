import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../Context";
import img from "../../../Assets/img.jpg";
import Navbar from "../../../Components/Navbar";
import Rating from "./Rating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ReactImageZoom from "react-image-zoom";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BrowserNotSupportedIcon from "@mui/icons-material/BrowserNotSupported";
import ProductSlider from "./ProductSlider";
import Quantity from "../../../Components/Quantity";
import axios from "axios";
import NavBar1 from "../../../Components/NavBar1";

const ProductDetail = () => {
  const [quantity, setquantity] = useState(1);
  const { state: state1 } = useLocation();
  console.log(state1);
  const navigate = useNavigate();
  const {
    state,
    dispatch: ctxDispatch,
    DefaultAddress,
    fetchAddresses,
    fetchcartItems,
  } = useContext(GlobalContext);
  const { cart, userInfo } = state;
  const imageRef = useRef(null);
  console.log(cart.cartid);
  const [imagestyle, setimagestyle] = useState({
    position: "",
    top: "",
  });

  useEffect(() => {
    fetchAddresses();
  }, []);
  // const [topPosition, settopPosition] = useState(0);
  // useEffect(() => {
  //   const existItem = cart.cartItem.find((x) => x.id === state1.id);
  //   if (existItem) {
  //     setquantity(existItem.quantity);
  //   }
  // }, [state1, cart.cartItem]);

  // useEffect(() => {
  //   console.log(quantity);
  // }, [quantity]);

  const addToCartHandler = async () => {
    const existItem = cart.cartItem.find((x) => x.id === state1.id);
    console.log(cart.cartItem);

    // const { data } = await axios.get(`/api/products/${product._id}`);
    // if (data.countinstock < quantity) {
    //   window.alert("Sorry, Product is out of Stock");
    //   return;
    // }
    const products = {
      productid: state1._id,
      quantity: quantity,
      totalprice: state1.price,
    };
    const _id = userInfo.user._id;
    if (cart.cartid) {
      const { data } = await axios.patch(
        `/api/updatecartitems/${cart.cartid.cartId}`,
        {
          products,
        }
      );
      console.log(data);
    } else {
      const { data } = await axios.post("/api/addcartitems", {
        products,
        _id,
      });
      console.log(data);
      fetchcartItems();
      ctxDispatch({
        type: "CART_ADD_ITEM",
        payload: {
          products,
        },
      });
      // ctxDispatch({
      //   type: "CART_ID",
      //   payload: {
      //     data,
      //   },
      // });
    }

    // navigate("/cartpage");
  };
  // useEffect(() => {
  //   settopPosition();
  //   setInterval(() => {
  //     if (window.pageYOffset >= topPosition) {
  //       // navbar.classList.add("sticky")
  //       setimagestyle({ position: "fixed", top: 0, width: "29%" });
  //     } else {
  //       // navbar.classList.remove("sticky");
  //       setimagestyle({ position: "", top: "", width: "86%" });
  //     }
  //   }, 2000);
  // }, [topPosition]);
  // const props = {
  //   width: 400,
  //   height: 250,
  //   // zoomWidth: 500,
  //   img: img,
  //   zoomPosition: "original",
  // };

  const description = [
    {
      detail:
        "🎧【Steelseries Arctis 1 Mic】: Fit perfectly for Steelseries Arctis 1 1.0 One Raw Wired Wireless Headphones Gaming Headsets",
    },
    {
      detail:
        "🎧【Steelseries Arctis 1 Mic】: Fit perfectly for Steelseries Arctis 1 1.0 One Raw Wired Wireless Headphones Gaming Headsets",
    },
    {
      detail:
        "🎧【Steelseries Arctis 1 Mic】: Fit perfectly for Steelseries Arctis 1 1.0 One Raw Wired Wireless Headphones Gaming Headsets",
    },
    {
      detail:
        "🎧【Steelseries Arctis 1 Mic】: Fit perfectly for Steelseries Arctis 1 1.0 One Raw Wired Wireless Headphones Gaming Headsets",
    },
    {
      detail:
        "🎧【Steelseries Arctis 1 Mic】: Fit perfectly for Steelseries Arctis 1 1.0 One Raw Wired Wireless Headphones Gaming Headsets",
    },
  ];

  return (
    <Box sx={{}}>
      <NavBar1 />
      <Grid
        container
        sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Grid item md={4}>
          <Box>
            {/* <ReactImageZoom {...props} /> */}

            <img
              ref={imageRef}
              style={{
                marginLeft: "33px",
                marginTop: "7px",
                width: "86%",
                ...imagestyle,
              }}
              src={state1.image}
              alt='product_img'
            />

            <Typography
              sx={{
                textAlign: "center",
                cursor: "pointer",
                color: "#565959",
              }}
            >
              Do you want to see product in Augmented Reality?
            </Typography>
          </Box>
        </Grid>
        <Grid item md={8}>
          <Grid container>
            <Grid item md={7}>
              <Typography sx={{ fontSize: "24px", lineHeight: "32px" }}>
                {state1.name}
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "10px",
                  alignItems: "center",
                }}
              >
                <Rating Rating={3.5} numReviews={15} />
                <FavoriteBorderIcon
                  sx={{
                    cursor: "pointer",
                    marginRight: "15px",
                    "&:hover": {
                      color: "red",
                    },
                  }}
                />
              </Typography>
              <div
                style={{
                  width: "96%",
                  border: "1px solid #b3afaf29",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              ></div>
              <Typography sx={{ fontSize: "30px", color: "#f85606" }}>
                Rs. {state1.price}
              </Typography>
              <div
                style={{
                  width: "96%",
                  border: "1px solid #b3afaf29",
                  marginTop: "10px",
                }}
              ></div>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                {" "}
                <Typography sx={{ color: "#757575", fontSize: "14px" }}>
                  Quantity
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: "20px",
                  }}
                >
                  <Quantity qty={quantity} setqty={setquantity} />
                </Box>
              </Box>
              <div
                style={{
                  width: "96%",
                  border: "1px solid #b3afaf29",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              ></div>
              <Typography sx={{ marginBottom: "8px" }}>
                About this Product
              </Typography>
              {description.map((item, i) => (
                <Typography
                  key={i}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingRight: "10px",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "30px",
                      position: "relative",
                      top: "-10px",
                      paddingRight: "10px",
                    }}
                  >
                    •
                  </span>{" "}
                  {item.detail}
                </Typography>
              ))}
            </Grid>
            <Grid item md={5}>
              <Box
                sx={{
                  width: "90%",
                  height: "500px",
                  marginLeft: "4px",
                  border: "1px solid #b3afaf29",
                  padding: "8px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "12px", color: "#757575" }}>
                    Delivery
                  </Typography>
                  <ErrorOutlineIcon
                    sx={{ fontSize: "12px", color: "#757575" }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <Box
                    sx={{
                      width: "250px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <LocationOnOutlinedIcon sx={{ color: "#757575" }} />
                    <Typography sx={{ paddingLeft: "8px", fontSize: "14px" }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        {" "}
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "#007787",
                            padding: "2px 6px",
                            background: "rgba(0,119,135,.08)",
                          }}
                        >
                          {DefaultAddress.labelselect}
                        </Typography>
                        <span
                          style={{
                            height: "19px",
                            margin: "0px 8px",
                            backgroundColor: "#e5e5e5",
                            width: ".5px",
                          }}
                        ></span>
                        <Typography sx={{ fontSize: "12px", color: "#1a1a1a" }}>
                          {DefaultAddress.mobilenumber}
                        </Typography>
                        <span
                          style={{
                            height: "19px",
                            margin: "0px 8px",
                            backgroundColor: "#e5e5e5",
                            width: ".5px",
                          }}
                        ></span>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "#1a1a1a",
                          }}
                        >
                          {`${DefaultAddress.address},${DefaultAddress.city},${DefaultAddress.province}`}
                        </Typography>
                      </Box>
                    </Typography>
                  </Box>
                  {/* <Typography
                    sx={{
                      color: "#1a9cb7",
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    Change
                  </Typography> */}
                </Box>
                <div
                  style={{
                    width: "100%",
                    border: "1px solid #b3afaf29",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                ></div>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <Box
                    sx={{
                      width: "250px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <LocalShippingOutlinedIcon sx={{ color: "#757575" }} />
                    <Typography sx={{ paddingLeft: "8px", fontSize: "14px" }}>
                      Delivery Charges
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    Rs.99
                  </Typography>
                </Box>
                <div
                  style={{
                    width: "100%",
                    border: "1px solid #b3afaf29",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                ></div>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <Box
                    sx={{
                      width: "250px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <CurrencyExchangeOutlinedIcon sx={{ color: "#757575" }} />
                    <Typography sx={{ paddingLeft: "8px", fontSize: "14px" }}>
                      Cash on Delivery Available
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: "#1a9cb7",
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  ></Typography>
                </Box>
                <div
                  style={{
                    width: "100%",
                    border: "1px solid #b3afaf29",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                ></div>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "12px", color: "#757575" }}>
                    Service
                  </Typography>
                  <ErrorOutlineIcon
                    sx={{ fontSize: "12px", color: "#757575" }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <Box
                    sx={{
                      width: "250px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <AccessTimeIcon sx={{ color: "#757575" }} />
                    <Typography sx={{ paddingLeft: "8px", fontSize: "14px" }}>
                      No Return Policy
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <Box
                    sx={{
                      width: "250px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <BrowserNotSupportedIcon sx={{ color: "#757575" }} />
                    <Typography sx={{ paddingLeft: "8px", fontSize: "14px" }}>
                      Warranty not Available
                    </Typography>
                  </Box>
                </Box>
                <div
                  style={{
                    width: "100%",
                    border: "1px solid #b3afaf29",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                ></div>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <Box
                    sx={{
                      width: "250px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography
                      sx={{
                        paddingLeft: "8px",
                        color: "#757575",
                        fontSize: "12px",
                      }}
                    >
                      Sold By
                    </Typography>
                    <Typography
                      sx={{
                        paddingLeft: "8px",
                        fontSize: "16px",
                        color: "#424242",
                        marginTop: "4px",
                      }}
                    >
                      GanaTraZ Fashion (Karachi)
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: "#1a9cb7",
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    CHAT
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    onClick={addToCartHandler}
                    sx={{
                      backgroundColor: "#ffd814",
                      width: "79%",
                      color: "#0F1111",
                      fontSize: "13px",
                      borderRadius: "20px",
                      marginTop: "18px",
                      "&:hover": {
                        backgroundColor: "#ebce01",
                      },
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: "#ffa41c",
                      width: "79%",
                      color: "#0F1111",
                      fontSize: "13px",
                      borderRadius: "20px",
                      marginTop: "10px",
                      "&:hover": {
                        backgroundColor: "#e99a09",
                      },
                    }}
                  >
                    Buy Now
                  </Button>
                </Box>
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "#1a9cb7",
                    fontSize: "13px",
                    marginTop: "10px",
                    cursor: "pointer",
                  }}
                >
                  Visit Store
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Box sx={{ width: "100%" }}>
          <ProductSlider />
        </Box>
      </Grid>
    </Box>
  );
};

export default ProductDetail;
