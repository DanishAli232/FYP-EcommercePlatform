import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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

const Screen = () => {
  const imageRef = useRef(null);
  const [imagestyle, setimagestyle] = useState({
    position: "",
    top: "",
  });
  const [topPosition, settopPosition] = useState(0);

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
  const {} = useContext(GlobalContext);
  const [quantity, setquantity] = useState(1);

  return (
    <Box sx={{}}>
      <Navbar />
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
              src={img}
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
                Replacement Game Mic for Steelseries Arctis 1 Headphones | TNE
                Detachable Microphone Boom for Steelseries Arctis 1 PS4 Pro PS5
                Xbox One X Computer PC Gaming Headsets 3.5mm Jack Noise
                Cancelling
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
                  sx={{ cursor: "pointer", marginRight: "15px" }}
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
                Rs. 4000
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
                  <Quantity />
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
                      Sindh, Karachi - Gulshan-e-Iqbal, Block 15
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: "#1a9cb7",
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    Change
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

export default Screen;
