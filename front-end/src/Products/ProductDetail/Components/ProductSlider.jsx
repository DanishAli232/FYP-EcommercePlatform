import Slider from "react-slick";

import React from "react";
import { Box, Typography } from "@mui/material";
import img1 from "../../../Assets/img.jpg";
import img2 from "../../../Assets/img1.jpg";
import img3 from "../../../Assets/img2.jpg";
import img4 from "../../../Assets/img3.jpg";
import img5 from "../../../Assets/img4.jpg";

const ProductSlider = () => {
  const data = [
    { image: img1, name: "Product_Name" },
    { image: img2, name: "Product_Name" },
    { image: img3, name: "Product_Name" },
    { image: img4, name: "Product_Name" },
    { image: img5, name: "Product_Name" },
  ];
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div style={{ marginBottom: "40px", padding: "20px", width: "96%" }}>
      <h1
        style={{
          textAlign: "start",
          marginBottom: "20px",
          fontSize: "30px",
          fontWeight: 600,
        }}
      >
        Related Products
      </h1>
      <Slider {...settings}>
        {data.map((item, i) => (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <img
                style={{
                  height: "233px",
                  width: "283px",
                  position: "relative",
                }}
                src={item.image}
                alt={item.name}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: "0",
                  marginY: "20px",

                  backgroundColor: "#00000017",
                  paddingLeft: "75px",
                  paddingRight: "75px",
                  color: "white",
                }}
              >
                {" "}
                <Typography>{item.name}</Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
