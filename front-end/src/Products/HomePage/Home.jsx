import { Box } from "@mui/system";
import React, { useContext, useEffect } from "react";
import Footer from "../../Components/Footer";
import Deals from "./Components/Deals";
import Navbar from "../../Components/Navbar";
import Slider from "./Components/Slider";
import Vendors from "./Components/Vendors";
import Newsletter from "./Components/NewsLetter";
import NavBar1 from "../../Components/NavBar1";
import { GlobalContext } from "../../Context";

const Home = () => {
  const { fetchcartItems } = useContext(GlobalContext);
  useEffect(() => {
    fetchcartItems();
  }, []);
  return (
    <Box>
      {" "}
      <NavBar1 />
      {/* <Navbar /> */}
      <Slider />
      <Vendors />
      <Deals />
      <Newsletter />
      <Footer />
    </Box>
  );
};

export default Home;
