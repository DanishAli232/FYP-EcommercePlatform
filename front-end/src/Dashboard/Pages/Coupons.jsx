import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  MenuItem,
  Select,
  Snackbar,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

import React, { useContext, useEffect, useRef, useState } from "react";
import { Navbar, Sidebar } from "../Components";
import MuiAlert from "@mui/material/Alert";
import { GlobalContext } from "../../Context";
import { DashboardGlobalContext } from "../Context/DashboardContext";
import CouponFields from "./CouponContent/CouponFields";
import CouponList from "./CouponContent/CouponList";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const Coupons = () => {
  const {
    setnavcontent,
    statuscheck,
    adminContent,
    setAdminContent,
    UserContent,
    setUserContent,
    setVendorContent,
    VendorContent,
    setsidebar,
  } = useContext(DashboardGlobalContext);

  const { setdashboardOpen } = useContext(GlobalContext);
  const inputRef = useRef();
  const { state } = useContext(GlobalContext);
  const { userInfo } = state;
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

    let objIndex = data1.findIndex((obj) => obj.title === "Coupons");
    data1[objIndex].active = true;
  };

  useEffect(() => {
    setdashboardOpen(true);
    updatelist();
    setsidebar("none");
  }, []);
  const [open, setOpen] = React.useState(false);
  const [categoryOpen, setcategoryOpen] = useState(false);
  const [alertMsg, newalertMsg] = useState("");
  const [severity, newseverity] = useState("");
  const [category, setCategory] = React.useState("");
  const [newcategory, setnewCategory] = React.useState("");
  const [status, setStatus] = useState(null);
  const [error, seterror] = useState({});
  const [values, setValues] = useState({
    couponname: "",
    discountper: "",
    maxprice: 0,
    description: "",
    expire: "",
    noofused: 0,
    couponcode: "",
    vendor: state?.userInfo?.user?._id,
  });
  const [list, setlist] = useState([
    { title: "Add Coupon", active: true },
    { title: "Your Coupons", active: false },
  ]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStatus(null);
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    console.log(values);
  }, [values]);

  const handleSubmit = async () => {
    setStatus(true);
    try {
      let data = await axios.post("/api/addcoupon", values);
      console.log(data);
      seterror({});
      setStatus(false);
      setOpen(true);
      newseverity("success");
      newalertMsg("Coupon Added Successfully");
      setValues({
        couponname: "",
        discountper: "",
        maxprice: 0,
        description: "",
        expire: "",
        noofused: 0,
        couponcode: "",
        vendor: state?.userInfo?.user?._id,
      });
    } catch (error) {
      console.log(error);
      setOpen(true);
      setStatus(false);
      newseverity("error");
      seterror(error?.response?.data?.errors);
      newalertMsg(error?.response?.data?.errors?.discountper);
    }
  };

  useEffect(() => {
    console.log(values);
  }, [values]);
  return (
    <Box sx={{ backgroundColor: "rgb(240,242,245)", minHeight: "100vh" }}>
      <Grid container>
        <Grid item md={2}></Grid>
        <Grid item md={10}>
          <Navbar />
          <Box
            sx={{
              backgroundColor: "white",
              minHeight: "599px",
              marginTop: "89px",
              marginLeft: { md: "33px", xs: "8px" },
              marginRight: { md: "35px", xs: "0px" },
              marginBottom: "10px",
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
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                {list.map((item, i) => (
                  <Typography
                    sx={{
                      cursor: "pointer",
                      color: item.active ? "red" : "#00000085",
                      textTransform: "uppercase",
                      padding: "10px",
                      borderRight: "1px solid #00000029",
                    }}
                    onClick={() => {
                      let data = list.map(function (x) {
                        x.active = false;
                        return x;
                      });
                      setlist(data);

                      let objIndex = list.findIndex(
                        (obj) => obj.title === item?.title
                      );

                      list[objIndex].active = true;
                    }}
                  >
                    {item?.title}
                  </Typography>
                ))}
              </Box>

              {list[0].active === true && (
                <CouponFields
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  error={error}
                  values={values}
                  status={status}
                />
              )}

              {list[1].active === true && (
                <CouponList
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  error={error}
                  values={values}
                  status={status}
                />
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {alertMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Coupons;
