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
} from "@mui/material";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import { GlobalContext } from "../Context";

function SigninInScreen() {
  const navigate = useNavigate();
  const { dispatch: ctxDispatch } = useContext(GlobalContext);
  const [error, setError] = useState({});
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

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
      let result = await axios.post("http://localhost:5000/api/login", values, {
        "Content-Type": "application/json",
      });

      if (result.status === 200) {
        ctxDispatch({ type: "USER_SIGNIN", payload: result.data });
        localStorage.setItem("userInfo", JSON.stringify(result.data));
        navigate("/");
      }
    } catch (err) {
      setError(err.response.data.errors);
    }
  };

  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      setUser(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  const [login1, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState("");

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
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

  return (
    <Box height='100%'>
      <Container
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
            <Button type='submit' variant='outlined'>
              Login
            </Button>
          </Grid>
        </Grid>

        <h2>React Google Login</h2>
        <br />
        <br />
        {profile ? (
          <div>
            {/* <img src={profile.picture} alt='user image' /> */}
            <h3>User Logged in</h3>
            <p>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <br />
            <br />
            <button onClick={logOut}>Log out</button>
          </div>
        ) : (
          <button onClick={() => login()}>Sign in with Google 🚀 </button>
        )}

        <h2>Facebook Login</h2>
        {!login1 && (
          <FacebookLogin
            sx={{ width: "100px" }}
            appId='504485341863215'
            autoLoad={true}
            fields='name,email,picture'
            // scope='public_profile,user_friends'
            callback={responseFacebook}
            icon='fa-facebook'
            cssClass='facebookBtn'
          />
        )}
        {login1 && <img src={picture} alt='' />}

        {login1 && (
          <div>
            <p>{data.name}</p>
            <p>{data.email}</p>
          </div>
        )}

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
      </Container>
    </Box>
  );
}

export default SigninInScreen;
