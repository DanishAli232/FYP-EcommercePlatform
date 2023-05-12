import { Box } from "@mui/material";
import React, { createContext, useContext, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FeedIcon from "@mui/icons-material/Feed";
import PeopleIcon from "@mui/icons-material/People";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import Person4Icon from "@mui/icons-material/Person4";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect } from "react";
import { GlobalContext } from "../../Context";

export const DashboardGlobalContext = React.createContext();

export const DashboardContext = ({ children }) => {
  const { state } = useContext(GlobalContext);
  console.log(state);
  const [navcontent, setnavcontent] = useState("Dashboard");
  console.log(state?.userInfo?.user?.status);
  const [statuscheck, setstatus] = useState(state?.userInfo?.user?.status);
  // const [statuscheck, setstatus] = useState("user");
  const [VendorContent, setVendorContent] = useState([
    {
      link: "/dashboard",
      title: "Dashboard",
      active: true,
      icon: <DashboardIcon />,
    },
    {
      link: "/viewaccount",
      title: "View Account",
      active: false,
      icon: <AccountCircleIcon />,
    },
    {
      link: "/allproducts",
      title: "All Products",
      active: false,
      icon: <FeedIcon />,
    },
    {
      link: "/allquestions",
      title: "All Questions",
      active: false,
      icon: <QuestionAnswerIcon />,
    },
    {
      link: "/chatvendor",
      title: "Chat",
      active: true,
      icon: <ChatIcon />,
    },
    {
      link: "/addproduct",
      title: "Add Product",
      active: false,
      icon: <UploadFileIcon />,
    },
    {
      link: "/dashboard",
      title: "Logout",
      active: false,
      icon: <LogoutIcon />,
    },
    {
      link: "/orders",
      title: "Orders",
      active: true,
      icon: <ViewStreamIcon />,
    },
    {
      link: "/wishlist",
      title: "Wishlist",
      active: true,
      icon: <FavoriteBorderIcon />,
    },
    {
      link: "/allvendors",
      title: "All Vendors",
      active: false,
      icon: <Person4Icon />,
    },
    {
      link: "/allusers",
      title: "All Users",
      active: false,
      icon: <PeopleIcon />,
    },
  ]);
  const [UserContent, setUserContent] = useState([
    {
      link: "/dashboard",
      title: "Dashboard",
      active: true,
      icon: <DashboardIcon />,
    },
    {
      link: "/viewaccount",
      title: "View Account",
      active: false,
      icon: <AccountCircleIcon />,
    },
    {
      link: "/allproducts",
      title: "All Products",
      active: false,
      icon: <FeedIcon />,
    },
    {
      link: "/allquestions",
      title: "All Questions",
      active: false,
      icon: <QuestionAnswerIcon />,
    },
    {
      link: "/chatvendor",
      title: "Chat",
      active: true,
      icon: <ChatIcon />,
    },
    {
      link: "/addproduct",
      title: "Add Product",
      active: false,
      icon: <UploadFileIcon />,
    },
    {
      link: "/dashboard",
      title: "Logout",
      active: false,
      icon: <LogoutIcon />,
    },
    {
      link: "/orders",
      title: "Orders",
      active: true,
      icon: <ViewStreamIcon />,
    },
    {
      link: "/wishlist",
      title: "Wishlist",
      active: true,
      icon: <FavoriteBorderIcon />,
    },
    {
      link: "/allvendors",
      title: "All Vendors",
      active: false,
      icon: <Person4Icon />,
    },
    {
      link: "/allusers",
      title: "All Users",
      active: false,
      icon: <PeopleIcon />,
    },
  ]);

  const [adminContent, setAdminContent] = useState([
    {
      link: "/dashboard",
      title: "Dashboard",
      active: true,
      icon: <DashboardIcon />,
    },
    {
      link: "/viewaccount",
      title: "View Account",
      active: false,
      icon: <AccountCircleIcon />,
    },
    {
      link: "/allproducts",
      title: "All Products",
      active: false,
      icon: <FeedIcon />,
    },
    {
      link: "/allquestions",
      title: "All Questions",
      active: false,
      icon: <QuestionAnswerIcon />,
    },
    {
      link: "/chatvendor",
      title: "Chat",
      active: true,
      icon: <ChatIcon />,
    },
    {
      link: "/addproduct",
      title: "Add Product",
      active: false,
      icon: <UploadFileIcon />,
    },
    {
      link: "/dashboard",
      title: "Logout",
      active: false,
      icon: <LogoutIcon />,
    },
    {
      link: "/orders",
      title: "Orders",
      active: true,
      icon: <ViewStreamIcon />,
    },
    {
      link: "/wishlist",
      title: "Wishlist",
      active: true,
      icon: <FavoriteBorderIcon />,
    },
    {
      link: "/allvendors",
      title: "All Vendors",
      active: false,
      icon: <Person4Icon />,
    },
    {
      link: "/allusers",
      title: "All Users",
      active: false,
      icon: <PeopleIcon />,
    },
  ]);

  const [open1, setOpen] = React.useState(false);

  return (
    <DashboardGlobalContext.Provider
      value={{
        navcontent,
        setVendorContent,
        VendorContent,
        setnavcontent,
        statuscheck,
        setstatus,
        setOpen,
        open1,
      }}
    >
      {children}
    </DashboardGlobalContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardGlobalContext);
