import { Box } from "@mui/material";
import React from "react";
import NavBar1 from "../../Components/NavBar1";
import Deals from "./Components/Deals";
import DealsProducts from "./Components/DealsProducts";
import DiscountsProducts from "./Components/DiscountsProduct";
import NewsEmail from "./Components/NewsEmail";
import Newsletter from "./Components/NewsLetter";
import OffersProduct from "./Components/OffersProduct";
import ShopItems from "./Components/ShopItems";
import Slider from "./Components/Slider";
import Vendors from "./Components/Vendors";

const Home1 = () => {
  return (
    <Box>
      <NavBar1 />
      <Slider />
      <Vendors />
      <DealsProducts />
      <DiscountsProducts />
      <OffersProduct />
      <NewsEmail />
      <ShopItems />
    </Box>
  );
};

export default Home1;
