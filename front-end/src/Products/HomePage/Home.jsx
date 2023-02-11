import { Box } from "@mui/system";
import React from "react";
import Footer from "../../Components/Footer";
import Deals from "./Components/Deals";
import Navbar from "../../Components/Navbar";
import Slider from "./Components/Slider";
import Vendors from "./Components/Vendors";
import Newsletter from "./Components/NewsLetter";
import NavBar1 from "../../Components/NavBar1";

const Home = () => {
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
