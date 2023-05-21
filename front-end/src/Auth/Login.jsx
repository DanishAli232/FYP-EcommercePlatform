import { Close } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
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
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context";
import styled from "styled-components";
import NavBar1 from "../Components/NavBar1";
import Navbar2 from "../Components/Navbar2";
import Footer1 from "../Components/Footer1";

function SigninScreen() {
  const navigate = useNavigate();

  const {
    state,
    dispatch: ctxDispatch,
    setdashboardOpen,
  } = useContext(GlobalContext);
  useEffect(() => {
    setdashboardOpen(false);
  });
  const [error, setError] = useState({});
  const [severity, setseverity] = useState("error");
  const [open, setOpen] = React.useState(false);
  const [message, setmessage] = useState("");
  const [status, setStatus] = useState(null);
  const [googledata, setgoogledata] = useState({});
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    name: "",
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
    setStatus("loading");

    e.preventDefault();

    try {
      let result = await axios.post("http://localhost:5000/api/login", values, {
        "Content-Type": "application/json",
      });

      if (result.status === 200) {
        ctxDispatch({ type: "USER_SIGNIN", payload: result.data });
        localStorage.setItem("userInfo", JSON.stringify(result.data));
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setStatus(false);
      setseverity("error");
      setOpen(true);
      setError(err.response.data.errors);
      setmessage("Invalid Input");
    }
  };

  const forgotpassword = async () => {
    try {
      let { data } = await axios.post("/api/forgotpassword", {
        email: values.email,
      });
      console.log(data);
      setmessage(data?.message);
      setStatus(true);
      setseverity("success");

      setOpen(true);
    } catch (error) {
      console.log(error.response.data.message);
      setmessage(error?.response?.data?.message);
      setStatus("loading");
      setseverity("error");
      setOpen(true);
    }
  };

  useEffect(() => {
    if (googledata) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googledata.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${googledata.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          setUser(res.data);
          let userdata = {
            email: res.data.email,
            password: res.data.password,
            name: res.data.name,
            platform: "FG",
          };
          try {
            let result = await axios.post(
              "http://localhost:5000/api/login",
              userdata,
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
            // setError(err.response.data.errors);
            console.log(err);
          }
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  }, [googledata]);

  const [user, setUser] = useState([]);

  const googlelogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      // console.log(codeResponse);
      setgoogledata(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const logOut = () => {
    googleLogout();
    // setProfile(null);
  };

  const responseFacebook = async (response) => {
    console.log(response);
    setUser(response);
    if (response.accessToken) {
      let userdata = {
        email: response.email,
        name: response.name,
        password: response.password,
        platform: "FG",
      };
      try {
        let result = await axios.post("/api/login", userdata, {
          "Content-Type": "application/json",
        });

        if (result.status === 200) {
          ctxDispatch({ type: "USER_SIGNIN", payload: result.data });
          localStorage.setItem("userInfo", JSON.stringify(result.data));
          navigate("/");
        }
      } catch (err) {
        // setError(err.response.data.errors);
        console.log(err);
      }
    } else {
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
                    onClick={() => forgotpassword()}
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
                  {status === "loading" && (
                    <CircularProgress
                      sx={{ ml: 1, color: "white" }}
                      size='16px'
                    />
                  )}
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: "0px",
                }}
              >
                <Title1>SignIn with:</Title1>
                <FacebookLogin
                  appId='504485341863215'
                  autoLoad={false}
                  fields='name,email,picture'
                  icon={
                    <FacebookIcon
                      sx={{
                        // color: "blue",
                        margin: "0px 2px -4px 5px",
                        cursor: "pointer",
                        fontSize: "40px",
                      }}
                    />
                  }
                  callback={responseFacebook}
                  textButton=''
                  cssClass='facebookBtn'
                />

                <Tooltip title='Login with Google' arrow>
                  <GoogleIcon
                    sx={{ cursor: "pointer", fontSize: "37px" }}
                    onClick={() => googlelogin()}
                  />
                </Tooltip>
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

export default SigninScreen;
