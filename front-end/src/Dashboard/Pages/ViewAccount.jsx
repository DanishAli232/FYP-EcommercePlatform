import { Box, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "../Components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { GlobalContext } from "../../Context";
import axios from "axios";
import {
  DashboardContext,
  DashboardGlobalContext,
} from "../Context/DashboardContext";

const ViewAccount = () => {
  const { setdashboardOpen, state } = useContext(GlobalContext);

  const {
    VendorContent,
    adminContent,
    UserContent,
    setVendorContent,
    AccountDetails,
    account,
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
    setVendorContent(data);

    let objIndex = data1.findIndex((obj) => obj.title === "View Account");
    data1[objIndex].active = true;
  };

  useEffect(() => {
    setdashboardOpen(true);
    updatelist();
    AccountDetails();
    setsidebar("none");
  }, []);

  useEffect(() => {
    console.log(account);
  }, [account]);
  return (
    <Box sx={{ backgroundColor: "rgb(240,242,245)", minHeight: "100vh" }}>
      <Grid container>
        <Grid item md={2}></Grid>
        <Grid item md={10}>
          <Navbar />
          <Box sx={{ minHeight: "569px", padding: { sm: "", xs: "0px 8px" } }}>
            <Box
              sx={{
                backgroundColor: "white",
                marginTop: "89px",
                width: { md: "auto", xs: "303px" },
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
                  paddingLeft: { md: "17px", xs: "9px" },
                  paddingTop: "20px",
                  paddingRight: { md: "17px", xs: "9px" },
                  paddingBottom: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    // paddingLeft: "10px",
                    alignItems: "center",
                  }}
                >
                  <AccountCircleIcon
                    sx={{
                      fontSize: "67px",
                      color: "rgb(175,175,175)",
                      paddingRight: "8px",
                    }}
                  />
                  {/* <Stack>
                    <Avatar sx={{ width: 56, height: 56 }}>O</Avatar>
                  </Stack> */}

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "rgb(52, 71, 103)",
                        fontWeight: 600,
                        fontSize: "1.25rem",
                        textTransform: "capitalize",
                      }}
                    >
                      {account.length !== 0 && state?.userInfo?.user?.name}
                    </Typography>
                    <Typography
                      sx={{ color: "rgb(123, 128, 154)", fontSize: "0.875rem" }}
                    >
                      {account.length !== 0 && state?.userInfo?.user?.status}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      color: "rgb(52, 71, 103)",
                      textTransform: "capitalize",
                      fontWeight: 600,
                      marginTop: "20px",
                    }}
                  >
                    Profile Information
                  </Typography>
                  <Typography
                    sx={{ color: "rgb(123, 128, 154)", fontWeight: 300 }}
                  ></Typography>
                  {state?.userInfo?.user?.status === "vendor" &&
                    account?.map((item, i) => (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: "15px",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "rgb(52, 71, 103)",
                            fontSize: "0.875rem",
                            fontWeight: 700,
                            marginRight: "20px",
                            width: { sm: "200px", xs: "auto" },
                            textTransform: "uppercase",
                          }}
                        >
                          {item[0]}:
                        </Typography>{" "}
                        <Typography
                          sx={{
                            color: "rgb(123, 128, 154)",
                            fontSize: "0.875rem",
                            fontWeight: 400,
                            width: "150px",
                          }}
                        >
                          {item[1] ? item[1] : "null"}
                        </Typography>
                      </Box>
                    ))}
                  {account.length !== 0 &&
                    (state?.userInfo?.user?.status === "admin" ||
                      state?.userInfo?.user?.status === "user") &&
                    account?.map((item, i) => (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: "15px",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "rgb(52, 71, 103)",
                            fontSize: "0.875rem",
                            fontWeight: 700,
                            marginRight: "20px",
                            width: { sm: "200px", xs: "auto" },
                            textTransform: "uppercase",
                          }}
                        >
                          {item[0]}:
                        </Typography>{" "}
                        <Typography
                          sx={{
                            color: "rgb(123, 128, 154)",
                            fontSize: "0.875rem",
                            fontWeight: 400,
                            width: "150px",
                          }}
                        >
                          {item[1] ? item[1] : "null"}
                          {/* {item[0] === "verified"
                            ? item[1] === true
                              ? "true"
                              : "false"
                            : null} */}
                        </Typography>
                      </Box>
                    ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewAccount;
