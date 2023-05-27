import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DehazeIcon from "@mui/icons-material/Dehaze";
import CloseIcon from "@mui/icons-material/Close";

import { menudivVariants } from "../../FramerMotion/motion";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../Context";
import Scrollbars from "react-custom-scrollbars-2";

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

const MenuOption = () => {
  const { state, SignOut, navlistitems } = useContext(GlobalContext);
  const [menuOpen, setmenuOpen] = useState(false);
  const navigate = useNavigate();
  const settings = [
    { value: "Dashboard", nav: "/dashboard" },
    { value: "Logout", signout: SignOut },
  ];
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box>
      <Button
        onClick={() => {
          setmenuOpen(true);
        }}
        sx={{
          display: { md: "none", xs: "flex" },
          color: "#fff",
          lineHeight: "34px",
          minWidth: "0px",
          margin: "0px",
          padding: "0px",
          paddingLeft: "5px",
        }}
      >
        {/* <MoreVertIcon /> */}
        <DehazeIcon
          sx={{
            fontSize: "23px",
            background: "#ef233c",
            padding: "5px",
            borderRadius: "3px",
          }}
        />
      </Button>
      <AnimatePresence initial={true}>
        {menuOpen && (
          <motion.div
            variants={menudivVariants()}
            exit={{
              height: "0px",
              opacity: 0,
              transition: { duration: 0.5, type: "spring" },
            }}
            style={{
              width: "93%",
              height: "auto",
              paddingBottom: "30px",
              background: "white",
              // transition: "2s ease-in",
              position: "absolute",
              top: "67px",
              right: "10px",
              borderRadius: "5px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "3px 11px",
                color: "black",
              }}
              onClick={() => {
                setmenuOpen(false);
              }}
            >
              <CloseIcon />
            </Box>
            <Box sx={{ padding: "10px" }}>
              {navlistitems?.map((item, i) => (
                <Box key={i}>
                  <Link to={item.link}>
                    {" "}
                    <Typography sx={{ color: "black", padding: "8px 0px" }}>
                      {item.title}
                    </Typography>
                  </Link>
                </Box>
              ))}
              {state.userInfo && (
                <Box sx={{ flexGrow: 0, display: { md: "flex" } }}>
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
                            if (setting.nav) {
                              navigate(setting.nav);
                            } else {
                              SignOut();
                            }
                          }}
                        >
                          {setting.value}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              )}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
      {/* {title === "Categories" && categoryOpen && (
        <Box
          sx={{
            width: "200px",
            height: "200px",
            background: "#fdfdfd",
            border: "1px solid",
            position: "fixed",
            top: "55px",
          }}
        >
          <Scrollbars>
            <ul
              style={{ listStyleType: "none", margin: "0px", padding: "0px" }}
            >
              {catlist.map((item) => (
                <List style={{}} onClick={() => handleCategory(item)}>
                  {item}
                </List>
              ))}
            </ul>
          </Scrollbars>
        </Box>
      )} */}
    </Box>
  );
};

export default MenuOption;
