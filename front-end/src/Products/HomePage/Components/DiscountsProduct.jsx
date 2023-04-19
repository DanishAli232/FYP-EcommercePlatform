import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import img1 from "../../../Assets/img4.jpg";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../../../FramerMotion/motion";
import styled from "styled-components";

const Image = styled.img`
  width: 100%;
  cursor: pointer;
  border-radius: 5px;
  object-fit: cover;
  object-position: center;
  transition: 0.3s ease-in-out;
  height: 200px;
  &:hover {
    transform: scale(1.1);
  }
`;

const DiscountsProducts = () => {
  const [loading, setloading] = useState(false);
  const [product, setproduct] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      setloading(true);
      const { data } = await axios.get("/api/getproducts");
      setloading(false);
      setproduct(data);
    };
    fetchdata();
  }, []);
  const navigate = useNavigate();
  const handleClicker = (item) => {
    navigate(`/productdetail/${item._id}`, { state: item });
  };
  return (
    <motion.div
      variants={staggerContainer}
      initial='hidden'
      whileHover='hover'
      whileInView='show'
      viewport={{ once: true, amount: 0.25 }}
    >
      <Box
        sx={{
          padding: { md: "0px 69px", xs: "0px 13px" },
          backgroundColor: "#f7f6f6",
          paddingTop: "20px",
        }}
      >
        <motion.div variants={fadeIn("up", "tween", 0.2, 1)}>
          <Typography
            sx={{
              fontSize: { sm: "32px", xs: "24px" },
              lineHeight: { sm: "46px", xs: "34px" },
              fontWeight: 700,
              color: "#3c3c40",
            }}
          >
            Best Discounts For You
          </Typography>
        </motion.div>
        <Box sx={{ padding: "20px 0px" }}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Grid
              container
              spacing={2}
              rowSpacing={3}
              columnSpacing={2}
              sx={{ marginBottom: "20px" }}
            >
              {product.map((item) => (
                <Grid width='100%' item key={item._id} xs={6} sm={3} lg={2}>
                  <Image
                    onClick={() => handleClicker(item)}
                    src={img1}
                    alt=''
                  />
                  <Typography
                    sx={{
                      fontSize: { md: "18px", xs: "16px" },
                      fontWeight: 600,
                      lineHeight: { md: "26px", xs: "24px" },
                      color: "#2b2d42",
                      cursor: "pointer",
                      paddingTop: "10px",
                      "&:hover": {
                        color: "#ef233c",
                      },
                    }}
                  >
                    Min 40% Off On Formal Wear
                  </Typography>
                  {/* <SecDes trending={item1} /> */}
                  {/* <Wrapper key={item._id}>
                  <Image src={item.image} onClick={() => handleClicker(item)} />
                  <Info>{item.name}</Info>
                </Wrapper> */}
                </Grid>
              ))}
            </Grid>
          )}
          {/* {product.map((item) => (
      
      ))} */}
        </Box>
      </Box>
    </motion.div>
  );
};

export default DiscountsProducts;
