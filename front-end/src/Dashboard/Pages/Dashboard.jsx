import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Navbar, Sidebar } from "../Components";
import FeedIcon from "@mui/icons-material/Feed";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import PeopleIcon from "@mui/icons-material/People";
import Person4Icon from "@mui/icons-material/Person4";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import moment from "moment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PaymentIcon from "@mui/icons-material/Payment";
import axios from "axios";
import {
  DashboardContext,
  DashboardGlobalContext,
} from "../Context/DashboardContext";
import Alerts from "../Components/Alert";
import { GlobalContext } from "../../Context";
import { LineChart } from "../Components/ChartLine";
import BillingPlan from "./DashboardContent/BillingPlan";
import { VerticalBars } from "../Components/VerticalBars";
import { useNavigate } from "react-router-dom";
import Stripe1 from "./Stripe";

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    statuscheck,
    open1,
    VendorContent,
    adminContent,
    setVendorContent,
    setAdminContent,
    setsidebar,
  } = useContext(DashboardGlobalContext);

  // const [displaySideBar, newdisplaySideBar] = useState("none");
  // const [DazeIconDisplay, newDazeIconDisplay] = useState("flex");
  // const [MoveIconDisplay, newMoveIconDisplay] = useState("none");
  const [users, newusers] = useState(0);
  const [vendorData, setvendorData] = useState([]);
  const [admins, newadmin] = useState(0);
  const [vendors, newvendors] = useState(0);
  const [products, newproducts] = useState(0);
  const { setdashboardOpen, state } = useContext(GlobalContext);

  const updatelist = () => {
    let data1;

    if (state?.userInfo?.user?.status === "vendor") {
      data1 = VendorContent;
      let data = data1?.map(function (x) {
        x.active = false;
        return x;
      });
      setVendorContent(data);
    } else if (state?.userInfo?.user?.status === "admin") {
      data1 = adminContent;
      let data = data1?.map(function (x) {
        x.active = false;
        return x;
      });
      setAdminContent(data);
    }

    // setVendorContent((item) => {
    // let objIndex = data1?.findIndex((obj) => obj?.title === "Dashboard");
    // data1[objIndex].active = true;
    // console.log(objIndex);
    // });

    // setVendorContent(objIndex);
  };
  useEffect(() => {
    setdashboardOpen(true);
    updatelist();
    setsidebar("none");
  }, []);

  // const [break1, newbreak1] = useState(true);

  // const [show, newshow] = useState(false);
  // const [IconShow, notShow] = useState(true);

  const DateChange = (date1) => {
    const dateStr = date1;
    const date = moment(dateStr);

    const formattedDate = date.format("MMMM DD, YYYY");
    return formattedDate;
  };

  useEffect(() => {
    console.log(state);
    const fetchdata = async () => {
      let result1;

      result1 = await axios.get("/api/allvendor");
      let result2 = await axios.get("/api/alluser");
      let result3 = await axios.get("/api/allproduct");
      let result4 = await axios.get("/api/alladmins");
      if (state?.userInfo?.user?.status === "vendor") {
        let vendorData = await axios.get(
          `/api//getvendorsData?f=${state?.userInfo?.user?._id}`
        );
        setvendorData(vendorData.data);
      }

      const lengthadmins =
        result4.data.useradmins.length + result4.data.vendoradmins.length;

      newvendors(result1.data.length);
      newusers(result2.data.length);
      newproducts(result3.data.length);
      newadmin(lengthadmins);
    };
    fetchdata();
  }, []);

  return (
    <Box sx={{ backgroundColor: "rgb(240,242,245)", minHeight: "100vh" }}>
      {open1 && <Alerts />}
      {/* <Alerts /> */}
      <Grid container>
        <Grid item md={2}>
          {" "}
        </Grid>
        <Grid item md={10} sx={{}}>
          <Navbar />
          <Box sx={{ marginTop: "89px" }}>
            <Grid
              container
              sx={{
                padding: "40px 0px",
                textAlign: "center",
                justifyContent: "space-around",
              }}
              spacing={9}
              rowSpacing={1}
              columnSpacing={1}
            >
              <Grid
                item
                md={2}
                sx={{
                  backgroundColor: "white",
                  width: "141px",
                  marginBottom: "20px",
                  borderRadius: "0.75rem",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
                  border: "0px solid rgba(0, 0, 0, 0.125)",
                }}
              >
                <Box
                  sx={{
                    // padding: "10px",

                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      // padding: "40px",
                      background:
                        "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))",
                      height: "3rem",
                      boxShadow:
                        "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(64 64 64 / 40%) 0rem 0.4375rem 0.625rem -0.3125rem",
                      width: "3rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "-16px",
                    }}
                  >
                    <Person4Icon sx={{ color: "white" }} />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      paddingRight: "8px",
                      alignItems: "flex-end",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "rgb(123, 128, 154)",
                        fontSize: "0.875rem",
                      }}
                    >
                      {statuscheck === "vendor" ? (
                        <>Sold Products</>
                      ) : (
                        <>Vendors</>
                      )}
                    </Typography>
                    <Typography
                      sx={{
                        marginBottom: "20px",
                        color: "rgb(52, 71, 103)",
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        lineHeight: "1.00735em",
                      }}
                    >
                      {/* {likes / 2} */}
                      {statuscheck === "vendor" ? <>0</> : vendors}
                    </Typography>
                  </Box>
                </Box>
                <hr
                  style={{
                    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                    borderRight: "0px solid rgba(0, 0, 0, 0.12)",
                    borderLeft: "0px solid rgba(0, 0, 0, 0.12)",
                    backgroundColor: "transparent",
                    height: "0.0625rem",
                    margin: "1rem 0px",
                    borderBottom: "none",
                    opacity: "0.25",
                    backgroundImage:
                      "linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.4), rgba(52, 71, 103, 0)) !important",
                  }}
                />
                <Typography
                  sx={{
                    color: "rgb(123, 128, 154)",
                    fontSize: "0.875rem",
                    lineHeight: "1.5rem",
                    paddingLeft: "6px",
                    textAlign: "left",
                  }}
                >
                  Just Updated
                </Typography>
              </Grid>
              <Grid
                item
                md={2}
                sx={{
                  backgroundColor: "white",
                  width: "141px",
                  marginBottom: "20px",
                  borderRadius: "0.75rem",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
                  border: "0px solid rgba(0, 0, 0, 0.125)",
                }}
              >
                <Box
                  sx={{
                    // padding: "10px",

                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      // padding: "40px",
                      background:
                        "linear-gradient(195deg, rgb(102, 187, 106), rgb(67, 160, 71))",
                      height: "3rem",
                      boxShadow:
                        "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(64 64 64 / 40%) 0rem 0.4375rem 0.625rem -0.3125rem",
                      width: "3rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "-16px",
                    }}
                  >
                    <SupervisorAccountIcon sx={{ color: "white" }} />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      paddingRight: "8px",
                      alignItems: "flex-end",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "rgb(123, 128, 154)",
                        fontSize: "0.875rem",
                      }}
                    >
                      {statuscheck === "vendor" ? <>Remaining</> : <>Admins</>}
                    </Typography>
                    <Typography
                      sx={{
                        marginBottom: "20px",
                        color: "rgb(52, 71, 103)",
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        lineHeight: "1.00735em",
                      }}
                    >
                      {statuscheck === "vendor" ? <>0</> : admins}
                      {/* {loading2 ? <CircularProgress /> : totaladmins.length} */}
                    </Typography>
                  </Box>
                </Box>
                <hr
                  style={{
                    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                    borderRight: "0px solid rgba(0, 0, 0, 0.12)",
                    borderLeft: "0px solid rgba(0, 0, 0, 0.12)",
                    backgroundColor: "transparent",
                    height: "0.0625rem",
                    margin: "1rem 0px",
                    borderBottom: "none",
                    opacity: "0.25",
                    backgroundImage:
                      "linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.4), rgba(52, 71, 103, 0)) !important",
                  }}
                />
                <Typography
                  sx={{
                    color: "rgb(123, 128, 154)",
                    fontSize: "0.875rem",
                    lineHeight: "1.5rem",
                    paddingLeft: "6px",
                    textAlign: "left",
                  }}
                >
                  Just Updated
                </Typography>
              </Grid>

              <Grid
                item
                md={2}
                sx={{
                  backgroundColor: "white",
                  width: "141px",
                  marginBottom: "20px",
                  borderRadius: "0.75rem",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
                  border: "0px solid rgba(0, 0, 0, 0.125)",
                }}
              >
                <Box
                  sx={{
                    // padding: "10px",

                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      // padding: "40px",
                      background:
                        "linear-gradient(195deg, rgb(236, 64, 122), rgb(216, 27, 96))",
                      height: "3rem",
                      boxShadow:
                        "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(64 64 64 / 40%) 0rem 0.4375rem 0.625rem -0.3125rem",
                      width: "3rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "-16px",
                    }}
                  >
                    <FeedIcon sx={{ color: "white" }} />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      paddingRight: "8px",
                      alignItems: "flex-end",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "rgb(123, 128, 154)",
                        fontSize: "0.875rem",
                      }}
                    >
                      Products
                    </Typography>
                    <Typography
                      sx={{
                        marginBottom: "20px",
                        color: "rgb(52, 71, 103)",
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        lineHeight: "1.00735em",
                      }}
                    >
                      {statuscheck === "vendor" ? <>1</> : products}
                      {/* {loading ? (
                        <CircularProgress />
                      ) : error ? (
                        <Typography>0</Typography>
                      ) : (
                        news.length
                      )} */}
                    </Typography>
                  </Box>
                </Box>
                <hr
                  style={{
                    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                    borderRight: "0px solid rgba(0, 0, 0, 0.12)",
                    borderLeft: "0px solid rgba(0, 0, 0, 0.12)",
                    backgroundColor: "transparent",
                    height: "0.0625rem",
                    margin: "1rem 0px",
                    borderBottom: "none",
                    opacity: "0.25",
                    backgroundImage:
                      "linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.4), rgba(52, 71, 103, 0)) !important",
                  }}
                />
                <Typography
                  sx={{
                    color: "rgb(123, 128, 154)",
                    fontSize: "0.875rem",
                    lineHeight: "1.5rem",
                    paddingLeft: "6px",
                    textAlign: "left",
                  }}
                >
                  Just Updated
                </Typography>
              </Grid>
              <Grid
                item
                md={2}
                sx={{
                  backgroundColor: "white",
                  width: "141px",
                  marginBottom: "20px",
                  borderRadius: "0.75rem",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
                  border: "0px solid rgba(0, 0, 0, 0.125)",
                }}
              >
                <Box
                  sx={{
                    // padding: "10px",

                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      // padding: "40px",
                      background:
                        "linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))",
                      height: "3rem",
                      boxShadow:
                        "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(64 64 64 / 40%) 0rem 0.4375rem 0.625rem -0.3125rem",
                      width: "3rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "-16px",
                    }}
                  >
                    <PeopleIcon sx={{ color: "white" }} />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      paddingRight: "8px",
                      alignItems: "flex-end",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "rgb(123, 128, 154)",
                        fontSize: "0.875rem",
                      }}
                    >
                      {statuscheck === "vendor" ? (
                        <>Collected Amount</>
                      ) : (
                        <>Users</>
                      )}
                    </Typography>
                    <Typography
                      sx={{
                        marginBottom: "20px",
                        color: "rgb(52, 71, 103)",
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        lineHeight: "1.00735em",
                      }}
                    >
                      {statuscheck === "vendor" ? <>0</> : users}
                    </Typography>
                  </Box>
                </Box>
                <hr
                  style={{
                    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                    borderRight: "0px solid rgba(0, 0, 0, 0.12)",
                    borderLeft: "0px solid rgba(0, 0, 0, 0.12)",
                    backgroundColor: "transparent",
                    height: "0.0625rem",
                    margin: "1rem 0px",
                    borderBottom: "none",
                    opacity: "0.25",
                    backgroundImage:
                      "linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.4), rgba(52, 71, 103, 0)) !important",
                  }}
                />
                <Typography
                  sx={{
                    color: "rgb(123, 128, 154)",
                    fontSize: "0.875rem",
                    lineHeight: "1.5rem",
                    paddingLeft: "6px",
                    textAlign: "left",
                  }}
                >
                  Just Updated
                </Typography>
              </Grid>
            </Grid>
          </Box>
          {state?.userInfo?.user?.status === "admin" && <LineChart />}
          {state?.userInfo?.user?.status === "vendor" && (
            <>
              {state?.userInfo?.user?.billingPlan !== "" && (
                <Box sx={{ margin: "0px 40px", marginBottom: "55px" }}>
                  <Typography
                    sx={{
                      color: "rgb(52,71,103)",
                      fontWeight: 600,
                      fontSize: "1.25rem",
                    }}
                  >
                    Billing Details
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      margin: "20px 0px",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { md: "row", xs: "column" },
                        // justifyContent: "space-between",
                        // width: "100%",
                      }}
                    >
                      {" "}
                      <Box
                        sx={{
                          width: "300px",
                          height: "114px",
                          // background: "white",
                          borderRadius: "7px",
                          padding: "20px",
                          color: "white",
                          background:
                            "linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))",
                          boxShadow:
                            "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(64 64 64 / 40%) 0rem 0.4375rem 0.625rem -0.3125rem",
                        }}
                      >
                        <Box>
                          <Typography sx={{ fontSize: "15px" }}>
                            {vendorData.billingPlan}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            // width: "400px",
                          }}
                        >
                          <Typography
                            sx={{ fontSize: "32px", letterSpacing: "2px" }}
                          >
                            {vendorData.currentpayment}
                          </Typography>
                          <Box
                            sx={{
                              width: "40px",
                              height: "40px",
                              background: "#ffffff4a",
                              borderRadius: "360px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <StarOutlineIcon
                              sx={{
                                fontSize: "35px",
                              }}
                            />
                          </Box>
                        </Box>

                        <Typography sx={{ fontSize: "15px" }}>
                          Due Date: {DateChange(vendorData.currentpaymentDate)}
                        </Typography>
                        {/* <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: "14px",
                          }}
                        >
                          <Button
                            sx={{
                              color: "rgb(73, 163, 241)",
                              background: "white",
                              marginRight: "10px",
                              "&:hover": {
                                background: "white",
                              },
                            }}
                          >
                            Change Plan
                          </Button>
                          <Button
                            sx={{
                              color: "rgb(73, 163, 241)",
                              background: "white",
                              "&:hover": {
                                background: "white",
                              },
                            }}
                          >
                            Pay Now
                          </Button>
                        </Box> */}
                      </Box>
                      <Box
                        sx={{
                          width: "300px",
                          height: "114px",
                          // background: "white",
                          borderRadius: "7px",
                          padding: "20px",
                          marginLeft: "20px",
                          color: "rgb(52,71,103)",
                          background: "white",
                          // background:
                          //   "linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))",
                          boxShadow:
                            "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(64 64 64 / 40%) 0rem 0.4375rem 0.625rem -0.3125rem",
                        }}
                      >
                        <Box sx={{ fontSize: "15px" }}>
                          <Typography>Next Payment</Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            sx={{ fontSize: "32px", letterSpacing: "2px" }}
                          >
                            {vendorData.currentpayment}
                          </Typography>
                          <Box
                            sx={{
                              width: "40px",
                              height: "40px",
                              background: "#0043ff14",
                              borderRadius: "360px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <PaymentIcon
                              sx={{
                                fontSize: "30px",
                                color: "rgb(73, 163, 241)",
                              }}
                            />
                          </Box>
                        </Box>
                        <Typography sx={{ fontSize: "15px" }}>
                          On {DateChange(vendorData.nextpayment)}
                        </Typography>
                        {/* <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: "14px",
                          }}
                        >
                          <Button
                            sx={{
                              color: "white",
                              background:
                                "linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))",
                              marginRight: "10px",
                              "&:hover": {
                                background:
                                  "linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))",
                              },
                            }}
                          >
                            Manage Payment
                          </Button>
                        </Box> */}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
              <Box
                sx={{
                  // width: "86%",
                  // // height: "200px",
                  // padding: "31px",
                  // background: "white",
                  margin: { md: "25px 40px", xs: "25px 19px" },
                  marginBottom: "55px",
                  // borderRadius: "5px",
                }}
              >
                <Typography
                  sx={{
                    color: "rgb(52,71,103)",
                    fontWeight: 600,
                    fontSize: "1.25rem",
                  }}
                >
                  Billing Plan
                </Typography>
                <BillingPlan />
              </Box>
              <Box
                sx={{
                  // width: "86%",
                  // // height: "200px",
                  // padding: "31px",
                  // background: "white",
                  display: { md: "block", xs: "none" },
                  margin: { md: "25px 40px", xs: "25px 19px" },
                  // borderRadius: "5px",
                }}
              >
                <Typography
                  sx={{
                    color: "rgb(52,71,103)",
                    fontWeight: 600,
                    fontSize: "1.25rem",
                  }}
                >
                  Payment History
                </Typography>
                <Box sx={{ marginTop: "20px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      // justifyContent: "space-between",
                      alignItems: "center",
                      background: "#b19c9c12",
                      padding: "12px 17px",
                      borderRadius: "5px",
                      color: "rgb(52,71,103)",
                      fontWeight: 600,
                      fontSize: "1.25rem",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "200px",
                      }}
                    >
                      Amount
                    </Typography>
                    <Typography
                      sx={{
                        width: "150px",
                      }}
                    >
                      Status
                    </Typography>
                    <Typography
                      sx={{
                        width: "240px",
                      }}
                    >
                      Recepient
                    </Typography>
                    <Typography
                      sx={{
                        width: "200px",
                      }}
                    >
                      Date
                    </Typography>
                    <Typography
                      sx={{
                        width: "200px",
                      }}
                    >
                      Payment Method
                    </Typography>
                  </Box>
                  {vendorData?.payments?.map((item, i) => (
                    <Box
                      sx={{
                        marginTop: "15px",
                        display: "flex",
                        flexDirection: "row",
                        // justifyContent: "space-between",
                        background: "white",
                        padding: "23px 17px",
                        alignItems: "center",
                        borderRadius: "5px",
                        color: "rgb(52,71,103)",
                        fontWeight: 600,
                        fontSize: "1.25rem",
                      }}
                    >
                      <Typography
                        sx={{
                          width: "200px",
                        }}
                      >
                        {item?.Amount}
                      </Typography>
                      <Box
                        sx={{
                          width: "150px",
                        }}
                      >
                        {" "}
                        <span
                          style={{
                            color: "#ffd24c",
                            background: "#fff5d6",
                            fontSize: "15px",
                            padding: "1px 8px",
                          }}
                        >
                          {item?.status}
                        </span>
                      </Box>

                      <Typography
                        sx={{
                          width: "240px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <AccountCircleIcon sx={{ marginRight: "10px" }} />
                        {item?.Recepient}
                      </Typography>
                      <Typography
                        sx={{
                          width: "200px",
                        }}
                      >
                        {DateChange(item?.Date)}
                      </Typography>
                      <Typography
                        sx={{
                          width: "200px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {item?.paymentMethod}{" "}
                        <PaymentIcon sx={{ marginLeft: "10px" }} />
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </>
          )}

          {/* <Stripe1 />

          <a href='https://buy.stripe.com/test_4gwaHj9FYfckb4YbII'>Checkout</a> */}
          {/* <Box
            sx={{
              width: "86%",
              // height: "200px",
              padding: "31px",
              background: "white",
              margin: "0px -37px 10px 41px",
              borderRadius: "5px",
            }}
          >
            <Typography
              sx={{
                color: "rgb(52,71,103)",
                fontWeight: 600,
                fontSize: "1.25rem",
              }}
            >
              Monthly Sale
            </Typography>{" "}
            <LineChart />
          </Box> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
