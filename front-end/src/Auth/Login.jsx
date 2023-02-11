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
import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
