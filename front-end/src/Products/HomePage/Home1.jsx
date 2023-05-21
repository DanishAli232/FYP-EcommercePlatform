import { Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
// import Footer from "../../Components/Footer";
import Footer1 from "../../Components/Footer1";
import NavBar1 from "../../Components/NavBar1";
import { GlobalContext } from "../../Context";
// import Deals from "./Components/Deals";
import DealsProducts from "./Components/DealsProducts";
import DiscountsProducts from "./Components/DiscountsProduct";
import NewsEmail from "./Components/NewsEmail";
// import Newsletter from "./Components/NewsLetter";
import OffersProduct from "./Components/OffersProduct";
import ShopItems from "./Components/ShopItems";
import Slider from "./Components/Slider";
import Vendors from "./Components/Vendors";

const Home1 = () => {
  const { setdashboardOpen, navlistitems } = useContext(GlobalContext);

  const updatelist = () => {
    let data1 = navlistitems;
    let data = data1.map(function (x) {
      x.active = false;
      return x;
    });
    console.log(data);

    let objIndex = navlistitems.findIndex((obj) => obj.title === "Home");
    if (objIndex) {
      navlistitems[objIndex].active = true;
      console.log(navlistitems);
    }
  };
  useEffect(() => {
    updatelist();
  }, []);
  useEffect(() => {
    setdashboardOpen(false);
  });
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
      <Footer1 />
    </Box>
  );
};

export default Home1;
