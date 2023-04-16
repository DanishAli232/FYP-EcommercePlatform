import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../Context";
import { Magnifier, GlassMagnifier } from "react-image-magnifiers";

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
import Footer1 from "../../../Components/Footer1";
import QA from "./Q&A";
import Reviews from "./Reviews";
import ShopItems from "../../HomePage/Components/ShopItems";
import styled from "styled-components";

const MagnifierDiv = styled.div``;

let reviews = [
  {
    personName: "Danish",
    stars: "4",
    desc: 'I was surprised when I found out that this had an in-screen fingerprint reader. All my previous phones had one on the back. Andi it works fine FOR ME, I dont know how good it is at preventing others from trying to open it with their prints. Try asking someone on the street: "Hey, could you put your thumb on my phone here, please?" Id get locked up in no time, right?',
  },
  {
    personName: "Danish",
    stars: "4",
    desc: 'I was surprised when I found out that this had an in-screen fingerprint reader. All my previous phones had one on the back. Andi it works fine FOR ME, I dont know how good it is at preventing others from trying to open it with their prints. Try asking someone on the street: "Hey, could you put your thumb on my phone here, please?" Id get locked up in no time, right?',
  },
  {
    personName: "Danish",
    stars: "4",
    desc: 'I was surprised when I found out that this had an in-screen fingerprint reader. All my previous phones had one on the back. Andi it works fine FOR ME, I dont know how good it is at preventing others from trying to open it with their prints. Try asking someone on the street: "Hey, could you put your thumb on my phone here, please?" Id get locked up in no time, right?',
  },
];

const ProductDetail = () => {
  const [quantity, setquantity] = useState(1);
  const [storename, setstorename] = useState("");
  const [allcomment, setallcomment] = useState([]);
  const { state: state1 } = useLocation();

  const navigate = useNavigate();
  const {
    state,
    setbuyNow,
    dispatch: ctxDispatch,
    DefaultAddress,
    fetchAddresses,
    switchbtn,
    setswitchbtn,
    fetchcartItems,
  } = useContext(GlobalContext);
  const { cart, userInfo } = state;
  const [comment, setcomment] = useState({
    user: "",
    username: "",
    productid: "s",
    comment: "",
  });

  const [imagestyle, setimagestyle] = useState({
    position: "",
    top: "",
  });

  const storeName = async () => {
    const { data } = await axios.get(`/api/storeName/${state1.vendor}`);
    setstorename(data.storename);
  };
  useEffect(() => {
    storeName();
    if (userInfo) {
      fetchAddresses();
      setcomment({
        user: userInfo.user._id,
        username: userInfo.user.name,
        productid: state1._id,
        comment: "",
      });
    }
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
      navigate("/cartpage");
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

  const handleBasket = () => {
    console.log(state1);
    setbuyNow({
      id: state1._id,
      title: state1.name,
      brand: state1.brand,
      price: state1.price,
      image: state1.image,
      quantity: quantity,
    });
    navigate("/checkout");
  };

  const postComment = async () => {
    try {
      let { data } = await axios.post("/api/addcomment", comment);
      allComment();
    } catch (error) {}
  };

  const allComment = async () => {
    try {
      let { data } = await axios.get(`/api/allcomment/${comment.productid}`);
      setallcomment(data.comments);
    } catch (error) {}
  };

  useEffect(() => {
    allComment();
  }, []);

  // useEffect(() => {
  //   console.log(hoverCoords);
  // }, [hoverCoords]);

  return (
    <Box sx={{ background: "#fbfbfb" }}>
      <NavBar1 />
      <Box sx={{ padding: { md: "0px 69px", xs: "0px 13px" } }}>
        <Grid
          container
          spacing={3}
          rowSpacing={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            background: "white",
            marginTop: "10px",
          }}
        >
          <Grid item md={4}>
            <Box>
              {/* <ReactImageZoom {...props} /> */}
              <Magnifier
                imageSrc={state1.image}
                width={400}
                height={400}
                zoomFactor={2}
              >
                <img src={state1.image} alt='Image1' />
              </Magnifier>

              {/* <div className='image-container'>
                <MagnifierDiv
                  className='magnifier'
                  style={{ left: hoverCoords.x, top: hoverCoords.y }}
                />
                <img
                  src={img}
                  // style={{
                  //   // marginLeft: "33px",
                  //   marginTop: "7px",
                  //   width: "100%",
                  //   ...imagestyle,
                  // }}
                  alt='Example'
                  className='zoom-in'
                  onMouseMove={handleMouseMove}
                />
              </div> */}
              {/* <img
                ref={imageRef}
                style={{
                  // marginLeft: "33px",
                  marginTop: "7px",
                  width: "100%",
                  ...imagestyle,
                }}
                src={img}
                alt='product_img'
              /> */}

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
                    width: { md: "90%", xs: "100%" },
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
                          <Typography
                            sx={{ fontSize: "12px", color: "#1a1a1a" }}
                          >
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
                            {DefaultAddress.address
                              ? `${DefaultAddress.address},${DefaultAddress.city},${DefaultAddress.province}`
                              : "No Address"}
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
                        {storename}
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
                      onClick={handleBasket}
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
                    onClick={() => {
                      setswitchbtn(0);
                      navigate(`/products?vendorid=${state1.vendor}`);
                    }}
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

          {/* <Box sx={{ width: "100%" }}>
          <ProductSlider />
        </Box> */}
        </Grid>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            background: "white",
            marginLeft: "-23px",
            padding: "20px",
            marginTop: "17px",
          }}
        >
          <Typography
            variant='h2'
            sx={{
              color: "#0F1111",
              marginBottom: "12px",
              fontWeight: 700,
              fontSize: "24px",
              lineHeight: "32px",
            }}
          >
            Custom Questions & Answers
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
            }}
          >
            <span style={{ width: "58%" }}>
              <input
                type='text'
                value={comment.comment}
                onChange={(event) => {
                  setcomment({ ...comment, comment: event.target.value });
                }}
                placeholder='Ask your Question'
                style={{
                  width: " 96%",
                  padding: "9px 0px 9px 14px",
                  outline: "none",
                  color: "#9e9e9e",
                  border: "1px solid #cdc6c6",
                }}
              />
            </span>
            <Button
              onClick={postComment}
              sx={{
                background: "#f0353b",
                transition: "0.3s ease-in",
                width: "146px",
                color: "white",
                "&:hover": {
                  background: "#d90429",
                },
              }}
            >
              Ask Question
            </Button>
          </Box>
          {allcomment.map((item, i) => (
            <QA
              key={i}
              {...item}
              productid={state1._id}
              fetchComments={allComment}
            />
          ))}
        </Box>
      </Box>
      <ShopItems />
      <Box sx={{ padding: { md: "60px 69px", xs: "40px 13px" } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            background: "white",
            marginLeft: "-23px",
            padding: "20px",
          }}
        >
          <Typography
            variant='h2'
            sx={{
              color: "#0F1111",
              // marginBottom: "12px",
              fontWeight: 700,
              fontSize: "24px",
              lineHeight: "32px",
            }}
          >
            Top Reviews
          </Typography>
          {reviews.map((item, i) => (
            <Reviews key={i} {...item} />
          ))}
        </Box>
      </Box>

      <Footer1 />
    </Box>
  );
};

export default ProductDetail;
