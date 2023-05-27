import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { GlobalContext } from "../../Context";
import { Navbar } from "../Components";
import axios from "axios";
import QuestionDes from "./Questions/QuestionDes";
import {
  DashboardContext,
  DashboardGlobalContext,
} from "../Context/DashboardContext";
import Scrollbars from "react-custom-scrollbars-2";
import ReviewList from "./Reviews/index";

const Reviews = () => {
  const { setdashboardOpen, state } = useContext(GlobalContext);
  const [open, setOpen] = React.useState(false);
  const [message, setmessage] = useState("");
  const [product, setproduct] = useState([]);
  const [orders, setorders] = useState([]);
  const {
    VendorContent,
    adminContent,
    setUserContent,
    UserContent,
    setsidebar,
  } = useContext(DashboardGlobalContext);

  const updatelist = () => {
    let data1;

    if (state?.userInfo?.user?.status === "vendor") {
      data1 = VendorContent;
    } else if (state?.userInfo?.user?.status === "admin") {
      data1 = adminContent;
    } else if (state?.userInfo?.user?.status === "user") {
      data1 = UserContent;
    }
    let data = data1.map(function (x) {
      x.active = false;
      return x;
    });
    setUserContent(data);

    let objIndex = data1.findIndex((obj) => obj.title === "Reviews");
    data1[objIndex].active = true;
  };

  const fetchRecords = async () => {
    try {
      let { data } = await axios.get(
        `/api/fetchorderproducts?id=${state?.userInfo?.user?._id}`
      );
      let data0 = data.map((item) => {
        return item.orderItems;
      });

      const updatedOrders = [];
      for (let i = 0; i < data0.length; i++) {
        if (data0[i][0]) {
          for (let j = 0; j < data0[i].length; j++) {
            console.log(data0[i][j]);
            updatedOrders.push(data0[i][j]);
          }
        }
      }
      setorders([...orders, ...updatedOrders]);

      // console.log(data0);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  useEffect(() => {
    fetchRecords();
    setsidebar("none");
  }, []);

  useEffect(() => {
    setdashboardOpen(true);
    updatelist();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setmessage("");
  };

  return (
    <Box sx={{ backgroundColor: "rgb(240,242,245)", minHeight: "100vh" }}>
      <Grid container>
        <Grid item md={2}></Grid>
        <Grid
          item
          md={10}
          sx={{
            width: { sm: "auto", xs: "100%" },
            padding: { sm: "", xs: "5px" },
          }}
        >
          <Navbar />

          <Box sx={{ height: "500px" }}>
            <Box
              sx={{
                backgroundColor: "white",
                marginTop: "89px",
                marginLeft: { md: "32px", xs: "0px" },
                marginRight: { md: "32px", xs: "0px" },
                borderRadius: "0.75rem",
                boxShadow:
                  "rgba(255, 255, 255, 0.9) 0rem 0rem 0.0625rem 0.0625rem inset, rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem",
                border: "1px solid rgba(224,224, 224, 1)",
                // marginBottom: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  //   background: "white",
                  //   marginLeft: "-23px",
                  padding: "20px",
                  marginTop: "17px",
                }}
              >
                <Typography
                  variant='h2'
                  sx={{
                    color: "#0F1111",
                    // marginBottom: "12px",
                    fontWeight: 700,
                    fontSize: "24px",
                    lineHeight: "32px",
                  }}
                >
                  Reviews
                </Typography>
                <Scrollbars style={{ height: "500px" }}>
                  {orders.map((items) => (
                    <ReviewList
                      {...items}
                      setOpen={setOpen}
                      setmessage={setmessage}
                    />
                  ))}
                </Scrollbars>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Reviews;
