import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Input,
  Snackbar,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { Navbar } from "../Components";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const Addproducts = () => {
  const [open, setOpen] = React.useState(false);
  const [alertMsg, newalertMsg] = useState("");
  const [severity, newseverity] = useState("");
  const [status, setStatus] = useState(null);
  const [values, setValues] = useState({
    title: "",
    description: "",
    extraDetail: "",
    website: "",
    image: "",
  });

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

  const onFileChange = (event) => {
    setValues({ ...values, image: event.target.files[0] });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("/getall");
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      // const formData = new FormData();
      // Object.entries(values).forEach(([key, value]) => {
      //   console.log("Key Is " + key + " Value Is " + value);
      //   formData.append(key, value);
      //   console.log(formData);
      // });
      // await axios.post(" /api/users/postdata", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      // newalertMsg("Your Data Send SuccessFully");
      // newseverity("success");
      // setOpen(true);
    } catch (err) {
      // setOpen(true);
      // newalertMsg(`Sorry! Not Data Send ${err}`);
      // newseverity("error");
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
              marginLeft: { md: "32px", xs: "0px" },
              marginRight: { md: "32px", xs: "0px" },
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
              <form
                action=''
                method='post'
                className='create-1'
                onSubmit={handlesubmit}
              >
                <Box
                  className='create-2 a'
                  sx={{ marginBottom: { md: "-12px", xs: "0px" } }}
                >
                  <TextField
                    id='outlined-required'
                    label='News Title'
                    value={values.title}
                    onChange={handleChange}
                    name='title'
                    sx={{ width: { md: "400px", xs: "100%" } }}
                  />
                </Box>
                <br></br>
                <Box
                  className='create-2 a'
                  sx={{ marginBottom: { md: "-12px", xs: "0px" } }}
                >
                  <TextField
                    id='outlined-required'
                    label='Website'
                    value={values.website}
                    onChange={handleChange}
                    name='website'
                    sx={{ width: { md: "400px", xs: "100%" } }}
                  />
                </Box>
                <br></br>

                {/* <Box className='create-2 a'>
                    <TextField
                      id='outlined-required'
                      label='Short Description'
                      value={values.description}
                      onChange={handleChange}
                      name='description'
                      sx={{ width: { md: "330px", xs: "auto" } }}
                    />
                  </Box>
                  <br></br> */}
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "rgb(2,2,2,0.65)",
                  }}
                >
                  Short Description
                </Typography>
                <Box
                  className='create-2 a'
                  sx={{ marginBottom: { md: "-12px", xs: "0px" } }}
                >
                  <TextareaAutosize
                    maxRows={4}
                    maxcolumns={4}
                    className='textArea'
                    label='Short Description'
                    aria-label='maximum height'
                    // placeholder='Start Here'
                    value={values.description}
                    name='description'
                    onChange={handleChange}
                    style={{
                      maxWidth: "100%",
                      width: "100%",
                      minHeight: "79px",
                      fontSize: "15px",
                    }}
                  />
                </Box>
                <br></br>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "rgb(2,2,2,0.65)",
                  }}
                >
                  Detailed Description
                </Typography>
                <Box
                  className='create-2 a'
                  sx={{ marginBottom: { md: "-12px", xs: "0px" } }}
                >
                  <TextareaAutosize
                    maxRows={4}
                    maxcolumns={4}
                    className='textArea'
                    label='Long Description'
                    aria-label='maximum height'
                    value={values.extraDetail}
                    name='extraDetail'
                    onChange={handleChange}
                    style={{
                      maxWidth: "100%",
                      width: "100%",
                      minHeight: "139px",
                      fontSize: "15px",
                    }}
                  />
                </Box>
                <br></br>

                <Box sx={{ marginBottom: "15px" }}>
                  <Input
                    sx={{ display: "none" }}
                    accept='image/*'
                    fullWidth={true}
                    id='contained-button-file'
                    onChange={onFileChange}
                    type='file'
                    name='image'
                  />

                  <label htmlFor='contained-button-file'>
                    <Button
                      variant='contained'
                      color='secondary'
                      component='span'
                    >
                      Upload Image
                    </Button>
                  </label>
                </Box>

                {values.image && (
                  <Grid item>
                    <Box>
                      <img
                        alt='not found'
                        width={"250px"}
                        src={URL.createObjectURL(values.image)}
                      />
                    </Box>
                  </Grid>
                )}

                <Box className='submit'>
                  <Button
                    type='submit'
                    variant='outlined'
                    color='secondary'
                    // sx={{ marginTop: "10px", marginBottom: "30px" }}
                  >
                    Add Product
                    {status === "loading" && (
                      <CircularProgress
                        sx={{ ml: 1 }}
                        size='16px'
                        color='secondary'
                      />
                    )}{" "}
                  </Button>
                </Box>
              </form>
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

export default Addproducts;
