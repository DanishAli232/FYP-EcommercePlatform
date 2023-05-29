import { Box } from "@mui/material";
import React, { createContext, useContext, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FeedIcon from "@mui/icons-material/Feed";
import ReviewsIcon from "@mui/icons-material/Reviews";
import PeopleIcon from "@mui/icons-material/People";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import Person4Icon from "@mui/icons-material/Person4";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect } from "react";
import { GlobalContext } from "../../Context";
import axios from "axios";

export const DashboardGlobalContext = React.createContext();

export const DashboardContext = ({ children }) => {
  const { state } = useContext(GlobalContext);
  const [sidebar, setsidebar] = useState("none");
  const [navcontent, setnavcontent] = useState("Dashboard");
  const [statuscheck, setstatus] = useState(state?.userInfo?.user?.status);
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
      link: "/addproduct",
      title: "Add Product",
      active: false,
      icon: <UploadFileIcon />,
    },
    {
      link: "/coupons",
      title: "Coupons",
      active: false,
      icon: <UploadFileIcon />,
    },
    {
      link: "/chatvendor",
      title: "Chat",
      active: false,
      icon: <ChatIcon />,
    },

    {
      link: "/orders",
      title: "Orders",
      active: false,
      icon: <ViewStreamIcon />,
    },
    {
      link: "/signin",
      title: "Logout",
      active: false,
      icon: <LogoutIcon />,
    },
  ]);
  const [UserContent, setUserContent] = useState([
    {
      link: "/viewaccount",
      title: "View Account",
      active: true,
      icon: <AccountCircleIcon />,
    },

    {
      link: "/orders",
      title: "Orders",
      active: false,
      icon: <ViewStreamIcon />,
    },
    {
      link: "/wishlist",
      title: "Wishlist",
      active: false,
      icon: <FavoriteBorderIcon />,
    },
    {
      link: "/reviews",
      title: "Reviews",
      active: false,
      icon: <ReviewsIcon />,
    },
    {
      link: "/signin",
      title: "Logout",
      active: false,
      icon: <LogoutIcon />,
    },
  ]);

  const [account, setaccount] = useState([]);

  const AccountDetails = async () => {
    try {
      if (state?.userInfo?.user?.status === "vendor") {
        let vendorData = await axios.get(
          `/api//getvendorsData?f=${state?.userInfo?.user?._id}`
        );
        let data1 = await Object.entries(vendorData.data).filter(
          (item, arr) => {
            if (
              item[0] === "products" ||
              item[0] === "payments" ||
              item[0] === "__v" ||
              item[0] === "updatedAt" ||
              item[0] === "password"
            ) {
              let data = item[0];
              return item[0] !== data;
            } else {
              return item;
            }
          }
        );
        setaccount(data1);
      } else if (
        state?.userInfo?.user?.status === "user" ||
        state?.userInfo?.user?.status === "admin"
      ) {
        let { data } = await axios.get(
          `/api/accountdetail/${state.userInfo.user._id}`
        );
        let data1 = await Object.entries(data).filter((item, arr) => {
          if (
            item[0] === "__v" ||
            item[0] === "updatedAt" ||
            item[0] === "password" ||
            item[0] === "couponcode"
          ) {
            let data = item[0];
            return item[0] !== data;
          } else {
            return item;
          }
        });
        setaccount(data1);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      link: "/addproduct",
      title: "Add Product",
      active: false,
      icon: <UploadFileIcon />,
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
    {
      link: "/signin",
      title: "Logout",
      active: false,
      icon: <LogoutIcon />,
    },
  ]);

  const [open1, setOpen] = React.useState(false);

  return (
    <DashboardGlobalContext.Provider
      value={{
        navcontent,
        AccountDetails,
        account,
        adminContent,
        setAdminContent,
        UserContent,
        setUserContent,
        setVendorContent,
        VendorContent,
        setnavcontent,
        statuscheck,
        setstatus,
        sidebar,
        setsidebar,
        setOpen,
        open1,
      }}
    >
      {children}
    </DashboardGlobalContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardGlobalContext);
