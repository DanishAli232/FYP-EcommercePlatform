import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import shirt3 from "../../../Assets/shirt3.jpg";

import { motion } from "framer-motion";
import {
  fadeIn,
  imgVariants,
  staggerContainer,
} from "../../../FramerMotion/motion";
import ShopItemsDes from "./ShopItemsDes";
import axios from "axios";

const productitems = [
  {
    image: shirt3,
    price: "899.99",
    title: "Checkered Casual Shirt",
  },
  {
    image: shirt3,
    price: "899.99",
    title: "Checkered Casual Shirt",
  },
  {
    image: shirt3,
    price: "899.99",
    title: "Checkered Casual Shirt",
  },
  {
    image: shirt3,
    price: "899.99",
    title: "Checkered Casual Shirt",
  },
];
const ShopItems = () => {
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
  return (
    <motion.div
      variants={staggerContainer}
      initial='hidden'
      whileHover='hover'
      whileInView='show'
      viewport={{ once: false, amount: 0.25 }}
    >
      <Box
        sx={{
          background: "#fbfbfb",
          padding: { md: "60px 69px", xs: "40px 13px" },
        }}
      >
        <motion.div variants={fadeIn("up", "tween", 0.2, 1)}>
          <Typography
            variant='h3'
            sx={{
              fontSize: "32px",
              lineHeight: "46px",
              fontWeight: 700,
              color: "#3c3c40",
            }}
          >
            Shop With Us
          </Typography>
          <Typography
            vatiant='p'
            sx={{ fontSize: "18px", lineHeight: "28px", color: "#888" }}
          >
            Handpicked Favourites just for you
          </Typography>
        </motion.div>

        <Box sx={{ marginTop: "2rem" }}>
          <Grid
            container
            spacing={2}
            rowSpacing={4}
            columnSpacing={2}
            sx={{ marginBottom: "20px" }}
          >
            {product.map((item) => (
              <Grid width='100%' item key={item._id} xs={6} md={3} lg={3}>
                <ShopItemsDes {...item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </motion.div>
  );
};

export default ShopItems;
