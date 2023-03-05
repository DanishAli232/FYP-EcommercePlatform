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
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context";
import styled from "styled-components";

function SignupScreen() {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(GlobalContext);

  const [error, setError] = useState({});
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

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post("/api/register", {
        values,
      });
      if (data) {
        ctxDispatch({ type: "USER_SIGNIN", payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/");
      }
    } catch (err) {
      if (err.response.data.errors) {
        setError(err.response.data.errors);
      }
      console.log(err.response.data.errors);
      console.log("Sorry Not data send");
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

  return (
    <Box minHeight='100%'>
      <Box sx={{ padding: "0px 41px" }}>
        <Link to='/'>
          <Logo>ARSTORE</Logo>
        </Link>
      </Box>
      <Box
        sx={{
          backgroundColor: "#ededed",
          backgroundImage: `url(${laptop})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "auto",
          padding: "61px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            height: "auto",
            width: "400px",
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
                {/* <label
                  htmlFor='name'
                  style={{
                    fontSize: "15px",
                    color: "#424242",
                    paddingBottom: "6px",
                  }}
                >
                  Full Name:
                </label>
                <input
                  style={{
                    border: "1px solid #e5e5e5",
                    borderRadius: "4px",
                    width: "100%",
                    height: "40px",
                    padding: "0 35px 0 10px",
                    outline: "none",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                  value={values.name}
                  placeholder='Input Full Name'
                  type='text'
                  name='name'
                  id='name'
                  onChange={(event) => {
                    handleChange(event);
                  }}
                /> */}
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
                {/* <label
                  htmlFor='email'
                  style={{
                    fontSize: "15px",
                    color: "#424242",
                    paddingBottom: "6px",
                  }}
                >
                  Email:
                </label>
                <input
                  style={{
                    border: "1px solid #e5e5e5",
                    borderRadius: "4px",
                    width: "100%",
                    height: "40px",
                    padding: "0 35px 0 10px",
                    outline: "none",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                  value={values.email}
                  placeholder='Input Email'
                  type='text'
                  name='email'
                  id='email'
                  onChange={(event) => {
                    handleChange(event);
                  }}
                /> */}
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
                {/* <label
                  htmlFor='password'
                  style={{
                    fontSize: "15px",
                    color: "#424242",
                    paddingBottom: "6px",
                  }}
                >
                  Password:
                </label>
                <input
                  style={{
                    border: "1px solid #e5e5e5",
                    borderRadius: "4px",
                    width: "100%",
                    height: "40px",
                    padding: "0 35px 0 10px",
                    outline: "none",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                  value={values.password}
                  placeholder='Input Password'
                  type='text'
                  name='password'
                  id='password'
                  onChange={(event) => {
                    handleChange(event);
                  }}
                /> */}
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
                {/* <label
                  htmlFor='ConfrimPassword'
                  style={{
                    fontSize: "15px",
                    color: "#424242",
                    paddingBottom: "6px",
                  }}
                >
                  Confirm Password:
                </label>
                <input
                  style={{
                    border: "1px solid #e5e5e5",
                    borderRadius: "4px",
                    width: "100%",
                    height: "40px",
                    padding: "0 35px 0 10px",
                    outline: "none",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                  value={values.confirmpassword}
                  placeholder='Input Confirm Password'
                  type='text'
                  name='confirmpassword'
                  id='ConfrimPassword'
                  onChange={(event) => {
                    handleChange(event);
                  }}
                /> */}
              </Box>

              <Button
                onClick={handleSubmit}
                sx={{
                  fontSize: "14px",
                  background: "#f85606",
                  color: "white",
                  width: "100%",
                  "&:hover": {
                    background: "#f85606",
                  },
                }}
              >
                Register
              </Button>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: "16px",
                }}
              >
                <Typography sx={{ fontSize: "14px" }}>SignIn with:</Typography>
                <FacebookLogin
                  appId='504485341863215'
                  autoLoad={true}
                  fields='name,email,picture'
                  icon={
                    <FacebookIcon
                      sx={{
                        color: "blue",
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
      {/* <Container
        component='form'
        onSubmit={handleSubmit}
        sx={{ height: "100%" }}
      >
        <Grid
          container
          height='100%'
          justifyContent='center'
          alignItems='center'
          direction='column'
          spacing={3}
        >
          <Grid item>
            <TextField
              label='Name'
              onChange={handleChange}
              value={values.name}
              name='name'
              helperText={error.name}
              error={!!error.name}
              variant='filled'
            />
          </Grid>

          <Grid item>
            <TextField
              label='Email'
              onChange={handleChange}
              value={values.email}
              name='email'
              helperText={error.email}
              error={!!error.email}
              variant='filled'
            />
          </Grid>

          <Grid item>
            <TextField
              label='Password'
              onChange={handleChange}
              value={values.password}
              helperText={error.password}
              error={!!error.password}
              name='password'
              variant='filled'
            />
          </Grid>

          <Grid item>
            <TextField
              label='ConfirmPassword'
              onChange={handleChange}
              value={values.confirmpassword}
              helperText={error.confirmpassword}
              error={!!error.confirmpassword}
              name='confirmpassword'
              variant='filled'
            />
          </Grid>

          <Grid item>
            <Button type='submit' variant='outlined'>
              Register
            </Button>
          </Grid>
        </Grid>

        <Snackbar
          open={!!error.message}
          message={error.message}
          autoHideDuration={5000}
          onClose={clearError}
          action={action}
        >
          <Alert
            onClose={clearError}
            severity='error'
            sx={{
              width: "100%",
              backgroundColor: "#f8d7da",
              color: "#842029",
            }}
          >
            {error.message}
          </Alert>
        </Snackbar>
      </Container> */}
    </Box>
  );
}

export default SignupScreen;
