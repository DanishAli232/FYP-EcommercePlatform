import { Box, Button, Container, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import logo2 from "../Assets/logo2.png";
import { GlobalContext } from "../Context";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { AnimatePresence, motion } from "framer-motion";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { listVariants, staggerContainer } from "../FramerMotion/motion";
import NavList from "./NavList";

const listitems = [
  {
    title: "Home",
    link: "/",
    width: "38px",
    active: true,
  },
  {
    title: "About",
    link: "/",
    width: "42px",
    active: false,
  },
  {
    title: "Products",
    link: "/products",
    width: "65px",
    active: false,
  },
  {
    title: "Categories",
    link: "/",
    width: "73px",
    active: false,
  },
  {
    title: "Contact",
    link: "/",
    width: "56px",
    active: false,
  },
];

const NavBar1 = () => {
  const navigate = useNavigate();
  const { cartitems, state, SignOut, setdashboardOpen, fetchcartItems } =
    useContext(GlobalContext);
  console.log(cartitems);
  const Logo = styled.h1`
    color: #f0353b;
    font-family: Georgia, "Times New Roman", Times, serif;
  `;

  const listClick = (title) => {
    listitems.map(function (x) {
      x.active = false;
      return x;
    });
    console.log(listitems);
    let objIndex = listitems.findIndex((obj) => obj.title === title);
    listitems[objIndex].active = true;
    console.log(listitems);
  };

  useEffect(() => {
    fetchcartItems();
  }, []);

  return (
    <motion.div
      style={{ height: "80px" }}
      variants={staggerContainer}
      initial='hidden'
      animate='show'
      whileHover='hover'
      viewport={{ once: false, amount: 0.25 }}
    >
      <Box sx={{ zIndex: 200, position: "fixed", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0px 69px",
            background: "#ffffff",
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Link to='/'>
              <Logo>ARSTORE</Logo>
            </Link>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "317px",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <ul
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "42px",
                }}
              >
                {listitems.map((item, i) => (
                  <NavList key={i} {...item} listClick={listClick} />
                ))}
              </ul>

              <SearchIcon sx={{ color: "red" }} />
            </Box>
          </Box>

          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            {state.userInfo ? (
              <Button
                onClick={SignOut}
                sx={{
                  backgroundColor: "#f0353b",
                  fontSize: "13px",
                  padding: "5px 20px 5px 20px",
                  borderRadius: "5px",
                  color: "white",
                  fontWeight: "bold",
                  marginRight: "10px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f0353b",
                  },
                }}
              >
                Logout <PersonIcon />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  navigate("/signin");
                }}
                sx={{
                  backgroundColor: "#f0353b",
                  fontSize: "13px",
                  padding: "5px 20px 5px 20px",
                  borderRadius: "5px",
                  color: "white",
                  fontWeight: "bold",
                  marginRight: "10px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f0353b",
                  },
                }}
              >
                Login <PersonIcon />
              </Button>
            )}

            {cartitems.length === 0 ? (
              <PopupState variant='popover' popupId='demo-popup-popover'>
                {(popupState) => (
                  <div>
                    <Button
                      {...bindTrigger(popupState)}
                      sx={{
                        backgroundColor: "#f0353b",
                        fontSize: "13px",
                        padding: "5px 20px 5px 20px",
                        borderRadius: "5px",
                        color: "white",
                        fontWeight: "bold",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#f0353b",
                        },
                      }}
                    >
                      Cart
                      <ShoppingCartIcon />
                    </Button>
                    {/* <Button variant='contained' {...bindTrigger(popupState)}>
                  Open Popover
                </Button> */}
                    <Popover
                      {...bindPopover(popupState)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <Typography
                        sx={{ p: 2, color: "#f44336", fontWeight: 500 }}
                      >
                        Your Shopping Cart is Empty.
                      </Typography>
                    </Popover>
                  </div>
                )}
              </PopupState>
            ) : (
              <Link to='/cartpage'>
                <Button
                  sx={{
                    backgroundColor: "#f0353b",
                    fontSize: "13px",
                    padding: "5px 20px 5px 20px",
                    borderRadius: "5px",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f0353b",
                    },
                  }}
                >
                  Cart
                  <ShoppingCartIcon />
                </Button>
              </Link>
            )}
            <AccountCircleIcon
              onClick={() => {
                setdashboardOpen(true);
                navigate("/dashboard");
              }}
              sx={{
                fontSize: "37px",
                color: "#262222b0",
                cursor: "pointer",
                paddingLeft: "7px",
              }}
            />
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default NavBar1;
