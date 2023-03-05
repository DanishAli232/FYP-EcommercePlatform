import { Box, Button, Container, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import logo2 from "../Assets/logo2.png";
import { GlobalContext } from "../Context";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const NavBar1 = () => {
  const navigate = useNavigate();
  const { cartitems, state, SignOut, setdashboardOpen } =
    useContext(GlobalContext);

  const Logo = styled.h1`
    color: #f0353b;
    font-family: Georgia, "Times New Roman", Times, serif;
  `;
  return (
    <Box sx={{ height: "80px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 41px",
          zIndex: 200,
          position: "fixed",
          background: "#ffffff",
          width: "94%",
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
          <Typography sx={{ fontWeight: 500 }}>ABOUT</Typography>
          <Typography sx={{ fontWeight: 500 }}>CATEGORIES</Typography>
          <Typography sx={{ fontWeight: 500 }}>CONTACT</Typography>
          <SearchIcon sx={{ color: "red" }} />
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
                    <Typography sx={{ p: 2 }}>Your Cart is Empty.</Typography>
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
  );
};

export default NavBar1;
