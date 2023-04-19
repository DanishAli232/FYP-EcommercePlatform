import { Close } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import laptop from "../Assets/laptop.jpg";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../Context";
import styled from "styled-components";
import NavBar1 from "../Components/NavBar1";
import Navbar2 from "../Components/Navbar2";
import Footer1 from "../Components/Footer1";

function ChangePassword() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { state, dispatch: ctxDispatch } = useContext(GlobalContext);

  const [error, setError] = useState({});
  const [severity, setseverity] = useState("error");
  const [open, setOpen] = React.useState(false);
  const [message, setmessage] = useState("");
  const [status, setStatus] = useState(null);
  const [values, setValues] = useState({
    email: id,
    password: "",
    confirmpassword: "",
    name: "",
  });

  useEffect(() => {
    const verify1 = () => {
      try {
      } catch (error) {}
    };
    verify1();
  }, []);

  useEffect(() => {
    console.log(error);
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let result = await axios.post(
        "http://localhost:5000/api/changepassword",
        values,
        {
          "Content-Type": "application/json",
        }
      );
      console.log(result);
      setStatus(true);
      setseverity("success");
      setOpen(true);
      setError({});
      setmessage("Your Password Successfully Updated");
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
      //   if (result.status === 200) {
      //     ctxDispatch({ type: "USER_SIGNIN", payload: result.data });
      //     localStorage.setItem("userInfo", JSON.stringify(result.data));
      //     navigate("/");
      //   }
    } catch (err) {
      console.log(err.response.data);

      setStatus(true);
      setseverity("error");
      setOpen(true);
      setError(err.response.data);
      setmessage("Invalid Input");
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStatus(null);
    setOpen(false);
  };

  return (
    <Box>
      <NavBar1 />
      <Navbar2 title={"Change Password"} title1={"Home"} />

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
        <Title>Change Password</Title>
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
                  Change
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
                <Link to='/signup'>
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Footer1 />
    </Box>
  );
}

export default ChangePassword;
