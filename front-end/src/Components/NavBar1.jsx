import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import logo2 from "../Assets/logo2.png";

const NavBar1 = () => {
  const Logo = styled.h1`
    color: #f0353b;
    font-family: Georgia, "Times New Roman", Times, serif;
  `;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0px 41px",
      }}
    >
      <Box>
        <Link to='/'>
          <Logo>ARSTORE</Logo>
        </Link>
      </Box>
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
        <Typography>ABOUT</Typography>
        <Typography>CATEGORIES</Typography>
        <Typography>CONTACT</Typography>
        <SearchIcon sx={{ color: "red" }} />
      </Box>
      <Box>
        <Button
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
      </Box>
    </Box>
  );
};

export default NavBar1;
