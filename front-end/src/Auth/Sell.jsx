import { Close } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context";
import styled from "styled-components";
import NavBar1 from "../Components/NavBar1";
import Navbar2 from "../Components/Navbar2";
import Footer1 from "../Components/Footer1";

const Sell = () => {
  const navigate = useNavigate();

  const {
    state,
    dispatch: ctxDispatch,
    SignOut,
    navlistitems,
    setdashboardOpen,
  } = useContext(GlobalContext);
  useEffect(() => {
    setdashboardOpen(false);
  });
  const updatelist = () => {
    let data1 = navlistitems;
    let data = data1.map(function (x) {
      x.active = false;
      return x;
    });
    console.log(data);
    // console.log(data);
    // setnavlistitems({})
    // setnavlistitems((prev) => {
    //   console.log(prev);
    // });

    let objIndex = navlistitems.findIndex((obj) => obj.title === "Sell");
    navlistitems[objIndex].active = true;
  };
  useEffect(() => {
    updatelist();
  }, []);

  useEffect(() => {
    console.log(state.userInfo);
    if (state.userInfo) {
      if (state.userInfo.user.status === "vendor") {
        navigate("/dashboard");
      }
    }
  }, []);
  const [severity, setseverity] = useState("error");
  const [open, setOpen] = React.useState(false);
  const [message, setmessage] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState({});
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    name: "",
    storename: "",
    phoneno: "",
  });
  useEffect(() => {
    console.log(error);
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  const clearError = () => {
    setError({});
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStatus(null);
    setOpen(false);
  };

  const handleSubmit = async () => {
    setStatus("loading");
    try {
      const { data } = await axios.post("/api/postvendor", {
        values,
      });
      if (data) {
        await SignOut("sell");
        ctxDispatch({ type: "USER_SIGNIN", payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/emailconfirmation", { state: values.email });
      }
    } catch (err) {
      if (err.response.data.errors) {
        setError(err.response.data.errors);
        setStatus(false);
        setseverity("error");
        setOpen(true);
        setmessage(err.response.data.errors.message);
      }
    }
  };

  const Title = styled.h2`
    color: #2b2d42;
    font-size: 25px;
    font-weight: 700;
    text-align: center;
    letter-spacing: 2px;
  `;

  const Title1 = styled.p`
  font-size: 15px;
    color: #888;    
    text-transform: none;
    letter-spacing: 1px;
  }
  `;
  return (
    <Box>
      <NavBar1 />
      <Navbar2 title={"Sell"} title1={"Home"} />

      <Box
        sx={{
          height: "auto",
          padding: "61px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Title>Register Your Account</Title>

        <Box
          sx={{
            height: "auto",
            width: { md: "400px", xs: "100%" },
            backgroundColor: "white",
            padding: "20px",
          }}
        >
          <Box sx={{}}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
                // justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginBottom: "20px",
                }}
              >
                <TextField
                  label='Name'
                  onChange={handleChange}
                  value={values.name}
                  name='name'
                  helperText={error.name}
                  error={!!error.name}
                  variant='standard'
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginBottom: "20px",
                }}
              >
                <TextField
                  label='Email'
                  onChange={handleChange}
                  value={values.email}
                  name='email'
                  helperText={error.email}
                  error={!!error.email}
                  variant='standard'
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginBottom: "20px",
                }}
              >
                <TextField
                  label='PhoneNo'
                  type='number'
                  onChange={handleChange}
                  value={values.phoneno}
                  helperText={error.phoneno}
                  error={!!error.phoneno}
                  name='phoneno'
                  variant='standard'
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginBottom: "20px",
                }}
              >
                <TextField
                  label='StoreName'
                  onChange={handleChange}
                  value={values.storename}
                  name='storename'
                  helperText={error.storename}
                  error={!!error.storename}
                  variant='standard'
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginBottom: "20px",
                }}
              >
                <TextField
                  label='Password'
                  onChange={handleChange}
                  value={values.password}
                  helperText={error.password}
                  error={!!error.password}
                  name='password'
                  variant='standard'
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginBottom: "20px",
                }}
              >
                <TextField
                  label='ConfirmPassword'
                  onChange={handleChange}
                  value={values.confirmpassword}
                  helperText={error.confirmpassword}
                  error={!!error.confirmpassword}
                  name='confirmpassword'
                  variant='standard'
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                  marginTop: "-16px",
                }}
              >
                <Title1> Have You Account?</Title1>
                <Link to='/vendorlogin'>
                  <Typography
                    sx={{
                      color: "#2b2d42",
                      fontWeight: 600,
                      fontSize: "15px",
                      marginLeft: "5px",
                      textDecoration: "none",
                      "&:hover": {
                        color: "#d90429",
                      },
                    }}
                  >
                    {" "}
                    Click Here
                  </Typography>
                </Link>
              </Box>

              <Button
                onClick={handleSubmit}
                sx={{
                  fontSize: "16px",
                  padding: { sm: "13px", xs: "14px 28px" },
                  lineHeight: "16px",
                  fontWeight: 600,
                  transition: "0.3s ease-in",
                  textTransform: "capitalize",
                  marginTop: "13px",
                  background: "#ef233c",
                  color: "white",
                  width: { sm: "100%", xs: "auto" },
                  borderRadius: "4px",
                  border: "1px solid transparent",
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: "#d90429",
                    borderColor: "#d90429",
                  },
                }}
              >
                Register Now{" "}
                {status === "loading" && (
                  <CircularProgress
                    sx={{ ml: 1, color: "white" }}
                    size='16px'
                  />
                )}
              </Button>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: "16px",
                }}
              ></Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Footer1 />
    </Box>
  );
};

export default Sell;
