import { Alert, Box, Button, Grid, Snackbar, Typography } from "@mui/material";
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

const AllQuestions = () => {
  const { setdashboardOpen, state } = useContext(GlobalContext);
  const [status, setstatus] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [message, setmessage] = useState("");
  const [product, setproduct] = useState([]);
  const { VendorContent, setVendorContent, adminContent, setsidebar } =
    useContext(DashboardGlobalContext);

  const updatelist = () => {
    let data1;

    if (state?.userInfo?.user?.status === "vendor") {
      data1 = VendorContent;
    } else if (state?.userInfo?.user?.status === "admin") {
      data1 = adminContent;
    }
    let data = data1.map(function (x) {
      x.active = false;
      return x;
    });
    setVendorContent(data);

    let objIndex = data1.findIndex((obj) => obj.title === "All Questions");
    data1[objIndex].active = true;
  };

  useEffect(() => {
    setdashboardOpen(true);
    updatelist();
    setsidebar("none");
  }, []);

  const fetchQuestions = async () => {
    const { data } = await axios.get(
      `/api/fetchcomments/${state.userInfo.user._id}`
    );
    console.log(data);
    setproduct(data);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setstatus(false);
    setOpen(false);
    setmessage("");
  };

  useEffect(() => {
    fetchQuestions();
  }, []);
  return (
    <Box sx={{ backgroundColor: "rgb(240,242,245)", minHeight: "100vh" }}>
      <Grid container>
        <Grid item md={2}></Grid>
        <Grid item md={10}>
          <Navbar />
          <Box sx={{ minHeight: "569px" }}>
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
                  Custom Questions & Answers
                </Typography>
                {state?.userInfo?.user?.status === "vendor" ? (
                  product.map((item, i) => (
                    <QuestionDes
                      {...item}
                      key={i}
                      status={status}
                      setstatus={setstatus}
                      setopen={setOpen}
                      setmessage={setmessage}
                      fetchQuestions={fetchQuestions}
                    />
                  ))
                ) : (
                  <></>
                )}
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

export default AllQuestions;
