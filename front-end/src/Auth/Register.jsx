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

function SignupScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(GlobalContext);

  const [error, setError] = useState({});
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    name: "",
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
    // if (values.password !== values.confirmpassword) {
    //   console.log("Passwords do not match");
    //   setError({});
    //   return;
    // }
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
      setError(err.response.data.errors);
      console.log(err.response.data.errors);
      console.log("Sorry Not data send");
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
      </Container>
    </Box>
  );
}

export default SignupScreen;
