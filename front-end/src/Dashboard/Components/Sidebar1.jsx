import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FeedIcon from "@mui/icons-material/Feed";
import PeopleIcon from "@mui/icons-material/People";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { DashboardGlobalContext } from "../Context/DashboardContext";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Person4Icon from "@mui/icons-material/Person4";
import LogoutIcon from "@mui/icons-material/Logout";
import Alerts from "./Alert";
import { GlobalContext } from "../../Context";

const Sidebar1 = () => {
  const {
    setnavcontent,
    statuscheck,
    setOpen,
    adminContent,
    setAdminContent,
    UserContent,
    setUserContent,
    sidebar,
    setVendorContent,
    VendorContent,
  } = useContext(DashboardGlobalContext);
  let AllStyle = {
    sidebar1: {
      height: "95vh",
      color: "white",
      position: "fixed",
      background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))",
      padding: "10px",
      margin: "10px",
      borderRadius: "0.75rem",
      boxShadow: "rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem",
      transition:
        "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      zIndex: "10",
      display: { sm: "block", xs: sidebar },
    },
  };
  const { setdashboardOpen } = useContext(GlobalContext);
  const { state, SignOut } = useContext(GlobalContext);

  const HandleClicker = (value) => {
    if (value === "Logout") {
      SignOut();
    }
  };

  return (
    <Box sx={AllStyle.sidebar1}>
      <nav aria-label='secondary mailbox folders'>
        {/* <Alerts /> */}
        <List>
          <Link
            to='/'
            style={{ textDecoration: "none", color: "white" }}
            onClick={() => {
              setdashboardOpen(false);
            }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  primary='ARSTORE'
                  sx={{ textAlign: "center", fontSize: "27px" }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </nav>
      <hr />
      {/* <Divider /> */}
      <nav aria-label='main mailbox folders'>
        <>
          {state?.userInfo?.user?.status === "admin" && (
            <List>
              {adminContent.map((item, i) => {
                return (
                  <Link
                    to={item.link}
                    style={{ textDecoration: "none", width: "88%" }}
                  >
                    <ListItem
                      disablePadding
                      sx={{
                        transition:
                          "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                      }}
                    >
                      <ListItemButton
                        sx={{
                          "&:hover": {
                            backgroundColor: item.active
                              ? "rgba(0, 0, 0, 0.315)"
                              : "rgba(255, 255, 255, 0.2)",
                          },
                          backgroundColor: item.active
                            ? "rgba(0, 0, 0, 0.315)"
                            : "",
                          borderRadius: "0.75rem",
                        }}
                        onClick={() => HandleClicker(item.title)}
                      >
                        <ListItemIcon sx={{ color: "white" }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.title}
                          sx={{ color: "white", textDecoration: "none" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                );
              })}
            </List>
          )}
          {state?.userInfo?.user?.status === "vendor" && (
            <List>
              {VendorContent.map((item, i) => {
                return (
                  <Link
                    to={item.link}
                    style={{ textDecoration: "none", width: "88%" }}
                  >
                    <ListItem
                      disablePadding
                      sx={{
                        transition:
                          "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                      }}
                    >
                      <ListItemButton
                        sx={{
                          "&:hover": {
                            backgroundColor: item.active
                              ? "rgba(0, 0, 0, 0.315)"
                              : "rgba(255, 255, 255, 0.2)",
                          },
                          backgroundColor: item.active
                            ? "rgba(0, 0, 0, 0.315)"
                            : "",
                          borderRadius: "0.75rem",
                        }}
                        onClick={() => HandleClicker(item.title)}
                      >
                        <ListItemIcon sx={{ color: "white" }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.title}
                          sx={{ color: "white", textDecoration: "none" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                );
              })}
            </List>
          )}
          {state?.userInfo?.user?.status === "user" && (
            <List>
              {UserContent.map((item, i) => {
                return (
                  <Link
                    to={item.link}
                    style={{ textDecoration: "none", width: "88%" }}
                  >
                    <ListItem
                      disablePadding
                      sx={{
                        transition:
                          "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                      }}
                    >
                      <ListItemButton
                        sx={{
                          "&:hover": {
                            backgroundColor: item.active
                              ? "rgba(0, 0, 0, 0.315)"
                              : "rgba(255, 255, 255, 0.2)",
                          },
                          backgroundColor: item.active
                            ? "rgba(0, 0, 0, 0.315)"
                            : "",
                          borderRadius: "0.75rem",
                        }}
                        onClick={() => HandleClicker(item.title)}
                      >
                        <ListItemIcon sx={{ color: "white" }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.title}
                          sx={{ color: "white", textDecoration: "none" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                );
              })}
            </List>
          )}
        </>
      </nav>
    </Box>
  );
};

export default Sidebar1;
