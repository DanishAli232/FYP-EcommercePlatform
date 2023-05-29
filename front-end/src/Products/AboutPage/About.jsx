import { Box, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Footer1 from "../../Components/Footer1";
import NavBar1 from "../../Components/NavBar1";
import GroupsIcon from "@mui/icons-material/Groups";
import Navbar2 from "../../Components/Navbar2";
import { GlobalContext } from "../../Context";
const Div = styled.div`
  padding: 30px 30px 25px 30px;
  position: relative;
  text-align: center;
  box-shadow: 0px 2px 35px rgb(0 0 0 / 6%);
  border-radius: 4px;
  background: #fff;
  border: 1px solid #e4e6e5;
`;

const Div1 = styled.div`
  position: absolute;
  width: 54px;
  height: 54px;
  top: -27px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  background: #ef233c;
  color: #fff;
  border-radius: 50px;
  border: 2px solid #fff;
  box-shadow: 0px 2px 25px rgb(0 0 0 / 10%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Para = styled.p`
  font-size: 36px;
  display: block;
  font-weight: 700;
  color: #2b2d42;
  margin: 15px 0 14px 0;
`;

const Para1 = styled.p`
  margin: 0;
  padding: 0;
  font-size: 14px;
  line-height: 13px;
  color: #888;
  font-family: "Kumbh Sans", sans-serif;
`;
const About = () => {
  const { navlistitems, setdashboardOpen } = useContext(GlobalContext);
  useEffect(() => {
    setdashboardOpen(false);
  });
  const [number, newNumber] = useState(0);
  const [number1, newNumber1] = useState(0);
  const [number2, newNumber2] = useState(0);
  const [number3, newNumber3] = useState(0);

  const limiter1 = 960;
  React.useEffect(() => {
    const incrementer = setInterval(() => {
      newNumber1((c) => {
        if (c < limiter1) return c + 1;
        clearInterval(incrementer);
        return c;
      });
    }, 5);
  }, []);

  const updatelist = () => {
    let data1 = navlistitems;
    let data = data1.map(function (x) {
      x.active = false;
      return x;
    });
    console.log(data);
    // console.log(data);
    // setnavlistitems({})
    // setnavlistitems((prev) => {
    //   console.log(prev);
    // });

    let objIndex = navlistitems.findIndex((obj) => obj.title === "About");
    navlistitems[objIndex].active = true;
    console.log(navlistitems);
  };
  useEffect(() => {
    updatelist();
  }, []);

  const limiter2 = 1560;
  React.useEffect(() => {
    const incrementer = setInterval(() => {
      newNumber2((c) => {
        if (c < limiter2) return c + 1;
        clearInterval(incrementer);
        return c;
      });
    }, 5);
  }, []);

  const limiter3 = 860;
  React.useEffect(() => {
    const incrementer = setInterval(() => {
      newNumber3((c) => {
        if (c < limiter3) return c + 1;
        clearInterval(incrementer);
        return c;
      });
    }, 5);
  }, []);

  const limiter = 1024;
  React.useEffect(() => {
    const incrementer = setInterval(() => {
      newNumber((c) => {
        if (c < limiter) return c + 1;
        clearInterval(incrementer);
        return c;
      });
    }, 5);
  }, []);
  return (
    <Box>
      <NavBar1 />
      <Navbar2 title={"About"} title1={"Home"} />
      <Box
        sx={{
          backgroundColor: "#fbfbfb",
          padding: { sm: "60px 69px", xs: "40px 13px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
            background: "#fff",
            backgroundColor: "#fbfbfb",
            padding: "60px 13px",
            maxWidth: "730px",
            margin: "0 auto",
            // width: "100%",
          }}
        >
          <Typography
            variant='h6'
            sx={{
              color: "#ef233c",
              fontSize: "15px",
              fontWeight: 700,
              lineHeight: "24px",
            }}
          >
            OUR INFO
          </Typography>
          <Typography
            variant='h3'
            sx={{
              fontSize: { md: "36px", xs: "34px" },
              lineHeight: { md: "63px", xs: "34px" },
              fontWeight: 700,
              marginTop: { md: "0px", xs: "7px" },

              color: "#3c3c40",
              marginBottom: "5px",
            }}
          >
            About Our <span style={{ color: "#ef233c" }}>ARSTORE</span>
          </Typography>
          <Typography
            variant='p'
            sx={{
              fontSize: { md: "18px", xs: "16px" },
              lineHeight: { md: "28px", xs: "26px" },
              textAlign: { md: "center", xs: "justify" },
              color: "#888",
              marginTop: { md: "0px", xs: "7px" },

              fontFamily: '"Kumbh Sans", sans-serif',
            }}
          >
            The AR based multivendor ecommerce platform enables multiple vendors
            to sell their products on the platform. Users can create accounts,
            browse product listings, and make purchases. The AR functionality
            allows users to visualize and experience products virtually before
            buying. Vendors have access to inventory management tools and order
            fulfillment features. The website includes secure payment options
            and provides customer support for inquiries. Overall, the project
            combines ecommerce, AR, and multivendor capabilities to enhance the
            online shopping experience.
          </Typography>
        </Box>
        <Box sx={{ margin: "60px 0px" }}>
          <Grid container spacing={3} rowSpacing={3} columnSpacing={3}>
            <Grid
              item
              md={3}
              sx={{
                width: { md: "auto", xs: "100%" },
                marginBottom: { md: "auto", xs: "12px" },
              }}
            >
              <Div>
                <Div1>
                  <GroupsIcon sx={{ fontSize: "37px" }} />
                </Div1>
                {/* <Para> {number}</Para> */}
                <Para>0</Para>
                <Para1>Happy Clients</Para1>
              </Div>
            </Grid>
            <Grid
              item
              md={3}
              sx={{
                width: { md: "auto", xs: "100%" },
                marginBottom: { md: "auto", xs: "12px" },
              }}
            >
              <Div>
                <Div1>
                  <GroupsIcon sx={{ fontSize: "37px" }} />
                </Div1>
                {/* <Para>{number1}</Para> */}
                <Para>0</Para>
                <Para1>Hard Workers</Para1>
              </Div>
            </Grid>
            <Grid
              item
              md={3}
              sx={{
                width: { md: "auto", xs: "100%" },
                marginBottom: { md: "auto", xs: "12px" },
              }}
            >
              <Div>
                <Div1>
                  <GroupsIcon sx={{ fontSize: "37px" }} />
                </Div1>
                {/* <Para>{number2}</Para> */}
                <Para>0</Para>
                <Para1>Sold Products</Para1>
              </Div>
            </Grid>
            <Grid
              item
              md={3}
              sx={{
                width: { md: "auto", xs: "100%" },
                marginBottom: { md: "auto", xs: "12px" },
              }}
            >
              <Div>
                <Div1>
                  <GroupsIcon sx={{ fontSize: "37px" }} />
                </Div1>
                {/* <Para>{number3}</Para> */}
                <Para>0</Para>

                <Para1>Hours Of Support</Para1>
              </Div>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer1 />
    </Box>
  );
};

export default About;
