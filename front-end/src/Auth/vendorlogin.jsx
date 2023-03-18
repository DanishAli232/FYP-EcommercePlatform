import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import axios from "axios";

import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context";
import styled from "styled-components";
import NavBar1 from "../Components/NavBar1";
import Navbar2 from "../Components/Navbar2";
import Footer1 from "../Components/Footer1";

function VendorLogin() {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(GlobalContext);
  const [error, setError] = useState({});
  const [values, setValues] = useState({
    email: "",
    password: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let result = await axios.post(
        "http://localhost:5000/api/vendorlogin",
        values,
        {
          "Content-Type": "application/json",
        }
      );

      if (result.status === 200) {
        ctxDispatch({ type: "USER_SIGNIN", payload: result.data });
        localStorage.setItem("userInfo", JSON.stringify(result.data));
        navigate("/");
      }
    } catch (err) {
      setError(err.response.data.errors);
    }
  };

  const action = (
    <React.Fragment>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={clearError}
      >
        <Close fontSize='small' />
      </IconButton>
    </React.Fragment>
  );
  const Logo = styled.h1`
    color: #f0353b;
    font-family: Georgia, "Times New Roman", Times, serif;
  `;

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
      <Navbar2 title={"Login"} title1={"Home"} />

      <Box
        sx={{
          // backgroundColor: "#ededed",
          // backgroundImage: `url(${laptop})`,
          height: "auto",
          padding: "61px 40px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Title>Login To Your Account</Title>
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
                  flexDirection: "row",
                  alignItems: "baseline",
                  marginTop: "-16px",
                }}
              >
                <Title1>Forgot Password?</Title1>
                <Link>
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

              <Box sx={{ textAlign: "center" }}>
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
                  Login Now
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                  marginTop: "-9px",
                }}
              >
                <Title1> Have No Account?</Title1>
                <Link to='/sell'>
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
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer1 />
    </Box>
  );
}

export default VendorLogin;
