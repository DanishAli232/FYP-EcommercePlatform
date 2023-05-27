import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import DehazeIcon from "@mui/icons-material/Dehaze";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";

import logo2 from "../Assets/logo2.png";
import { GlobalContext } from "../Context";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { AnimatePresence, motion } from "framer-motion";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  listVariants,
  menudivVariants,
  staggerContainer,
} from "../FramerMotion/motion";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NavList from "./NavList";
import MenuOption from "./NavbarComp/MenuOption";
import axios from "axios";
import Scrollbars from "react-custom-scrollbars-2";

const Logo = styled.h1`
  color: #f0353b;
  font-family: Georgia, "Times New Roman", Times, serif;
  transition: 0.4s;
  @media (max-width: 641px) {
    font-size: 25px;
  }
  &:hover {
    transform: scale(1.2, 1.2);
  }
`;

const InputField = styled.input`
  font-size: 18px;
  color: white;
  border: none;
  background: transparent;
  padding: 18px 50px 18px 0px;
  width: 100%;
  border-radius: 0;
  border: none;
  border-bottom: 2px solid #fff;
  margin-bottom: 140px;
  outline: none;
  &:focus {
    border-bottom: 2px solid #ef233c;
  }
`;

const Label = styled.h3`
  font-size: 28px !important;
  line-height: 48px;
  font-weight: 600;
  text-align: left;
  color: #fff;
  margin-bottom: 1em;
`;

const NavBar1 = () => {
  const navigate = useNavigate();
  const [search, setsearch] = useState(false);
  const [show, setshow] = useState("none");
  const [searchvalue, setsearchvalue] = useState("");
  const [filterproducts, setfilterproducts] = useState([]);
  const {
    cartitems,
    state,
    SignOut,
    setdashboardOpen,
    fetchcartItems,
    navlistitems,
    setnavlistitems,
  } = useContext(GlobalContext);

  const listClick = (title) => {
    const data = navlistitems.map(function (x) {
      x.active = false;
      return x;
    });
    console.log(data);
    setnavlistitems(data);
    let objIndex = navlistitems.findIndex((obj) => obj.title === title);
    navlistitems[objIndex].active = true;
    setnavlistitems(navlistitems);
  };

  useEffect(() => {
    fetchcartItems();
  }, []);
  const settings = [
    { value: "Dashboard", nav: "/dashboard" },
    { value: "Logout", signout: SignOut },
  ];
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const productClicker = (item) => {
    navigate(`/productdetail/${item._id}`, { state: item });
  };

  const searchftn = async () => {
    try {
      let { data } = await axios.get(`/api/filterproducts/${searchvalue}`);
      console.log(data);
      if (data.length !== 0) {
        setshow("flex");
      }
      setfilterproducts(data);
    } catch (error) {}
  };
  useEffect(() => {
    searchftn();
  }, [searchvalue]);

  useEffect(() => {
    console.log(filterproducts);
  }, [filterproducts]);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsearchvalue(value);
  };
  return (
    <Box sx={{ height: { md: "80px", xs: "60px" }, position: "relative" }}>
      {" "}
      <motion.div
        style={{ height: { md: "80px", xs: "60px" } }}
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
              padding: { md: "0px 69px", xs: "0px 13px" },
              background: "#ffffff",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Link to='#'>
                <Logo>ARSTORE</Logo>
              </Link>
              <Box
                sx={{
                  display: { md: "flex", xs: "none" },
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
                  {navlistitems?.map((item, i) => (
                    <NavList key={i} {...item} listClick={listClick} />
                  ))}
                </ul>
                {state?.userInfo?.user?.status === "user" && (
                  <Box
                    onClick={() => {
                      console.log("yess");
                      setsearch(!search);
                    }}
                  >
                    <SearchIcon sx={{ color: "red" }} />
                  </Box>
                )}
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {!state.userInfo && (
                <Box>
                  <Button
                    onClick={() => {
                      navigate("/signin");
                    }}
                    sx={{
                      display: { md: "flex", xs: "none" },
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
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Link to='/signin'>
                      {" "}
                      <Button
                        sx={{
                          display: { sm: "none", xs: "flex" },
                          color: "#fff",
                          lineHeight: "34px",
                          minWidth: "0px",
                          margin: "0px",
                          padding: "0px",
                        }}
                      >
                        <PersonIcon
                          sx={{
                            fontSize: "23px",
                            background: "#ef233c",
                            padding: "5px",
                            borderRadius: "3px",
                          }}
                        />
                      </Button>{" "}
                    </Link>
                    <MenuOption navlistitems={navlistitems} />
                  </Box>
                </Box>
              )}
              {state?.userInfo?.user?.status === "user" &&
              cartitems.length === 0 ? (
                <PopupState variant='popover' popupId='demo-popup-popover'>
                  {(popupState) => (
                    <div>
                      <Button
                        {...bindTrigger(popupState)}
                        sx={{
                          backgroundColor: "#f0353b",
                          display: { md: "flex", xs: "none" },

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
                state?.userInfo?.user?.status === "user" && (
                  <Link to='/cartpage'>
                    <Button
                      sx={{
                        backgroundColor: "#f0353b",
                        display: { md: "flex", xs: "none" },
                        fontSize: "13px",
                        padding: "5px 20px 5px 20px",
                        borderRadius: "5px",
                        transition: "0.4s ease-in",
                        color: "white",
                        fontWeight: "bold",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#d90429",
                        },
                      }}
                    >
                      <ShoppingCartIcon sx={{ marginRight: "6px" }} />
                      Cart
                    </Button>
                  </Link>
                )
              )}

              {state.userInfo && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={() => {
                      navigate("/cartpage");
                    }}
                    sx={{
                      display: { sm: "none", xs: "flex" },
                      color: "#fff",
                      lineHeight: "34px",
                      minWidth: "0px",
                      margin: "0px",
                      padding: "0px",
                      paddingLeft: "5px",
                    }}
                  >
                    {/* <MoreVertIcon /> */}
                    <ShoppingBasketIcon
                      sx={{
                        fontSize: "23px",
                        background: "#ef233c",
                        padding: "5px",
                        borderRadius: "3px",
                      }}
                    />
                  </Button>{" "}
                  <Box
                    sx={{ flexGrow: 0, display: { md: "flex", xs: "none" } }}
                  >
                    <Tooltip title='Open settings'>
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <AccountCircleIcon
                          // onClick={() => {
                          //   setdashboardOpen(true);
                          //   navigate("/dashboard");
                          // }}
                          sx={{
                            fontSize: "37px",
                            color: "#262222b0",
                            cursor: "pointer",
                            paddingLeft: "7px",
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id='menu-appbar'
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem
                          key={setting.value}
                          onClick={handleCloseUserMenu}
                        >
                          <Typography
                            textAlign='center'
                            onClick={() => {
                              if (state?.userInfo?.user?.status === "user") {
                                if (setting.value === "Dashboard") {
                                  navigate("/viewaccount");
                                } else {
                                  SignOut();
                                }
                              } else {
                                if (setting.nav) {
                                  navigate(setting.nav);
                                } else {
                                  SignOut();
                                }
                              }
                            }}
                          >
                            {setting.value}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                  <MenuOption />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </motion.div>
      {search && (
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "26px",
            position: "fixed",
            background: "#000000d9",
            zIndex: "200",
          }}
        >
          <Box
            sx={{
              width: "80%",
              display: "flex",
              // height: "100%",
              flexDirection: "column",
              color: "white",
            }}
          >
            <Box
              onClick={() => {
                setsearch(!search);
                setshow("none");
                setfilterproducts([]);
              }}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {" "}
              <CloseIcon
                sx={{
                  color: "white",
                  cursor: "pointer",
                  fontSize: "42px",
                  "&:hover": {
                    color: "red",
                  },
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "80vh",
                // alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Label>Search Here</Label>
              <Box
                sx={{
                  display: " flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <InputField
                  value={searchvalue}
                  onChange={(event) => {
                    setsearchvalue(event.target.value);
                  }}
                  type='search'
                  name='search'
                  id='search'
                  placeholder='Enter Keyword Here'
                />
                <SearchIcon
                  sx={{
                    position: "relative",
                    top: "-70px",
                    left: "-26px",
                    cursor: "pointer",
                  }}
                />
              </Box>

              <Box
                sx={{
                  width: "95%",
                  display: show,
                  flexDirection: "column",
                  position: "relative",
                  top: "-101px",
                  padding: "20px 17px",
                  border: "1px solid #ffffff57",
                  borderRadius: "6px",
                  background: "#16171882",
                }}
              >
                <Scrollbars style={{ width: "100%", minHeight: "200px" }}>
                  {" "}
                  {filterproducts.map((item, i) => (
                    <Box
                      onClick={() => {
                        productClicker(item);
                      }}
                      key={i}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: "14px",
                        cursor: "pointer",
                        borderRadius: "6px",
                        "&:hover": {
                          background: "#0000005e",
                        },
                      }}
                    >
                      <img
                        src={item.image}
                        alt=''
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                      <Typography
                        sx={{
                          color: "white",
                          marginLeft: "16px",
                          letterSpacing: "3px",
                          fontSize: "23px",
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                  ))}
                </Scrollbars>
              </Box>
            </Box>
            {/* <TextField
            sx={{ width: "100%", color: "white", outline: "white" }}
            label='Search'
            onChange={handleChange}
            value={searchvalue}
            name='search'
            // helperText={search}
            // error={!!error.search}
            variant='standard'
          /> */}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default NavBar1;
