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

import React, { useContext, useEffect, useReducer, useState } from "react";
import { LoadingBox, Navbar } from "../Components";
import MuiAlert from "@mui/material/Alert";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../Context";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, news: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
const Addproducts = () => {
  const params = useParams();
  const { id } = params;
  const [open, setOpen] = React.useState(false);
  const [alertMsg, newalertMsg] = useState("");
  const [severity, newseverity] = useState("");
  const [status, setStatus] = useState(null);
  const [values, setValues] = useState({
    name: "",
    category: "",
    price: "",
    countinstock: "",
    brand: "",
    description: "",
    image: "",
  });
  const { setdashboardOpen } = useContext(GlobalContext);
  useEffect(() => {
    setdashboardOpen(true);
  }, []);

  const initialstate = {
    news: [],
    loading: true,
    error: "",
  };

  const [{ loading, error, news }, dispatch] = useReducer(
    reducer,
    initialstate
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          `http://localhost:5000/api/findOneproduct/${id}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        setValues({
          name: result.data.name,
          category: result.data.category,
          price: result.data.price,
          countinstock: result.data.countinstock,
          brand: result.data.brand,
          description: result.data.description,
        });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error });
      }
    };
    fetchData();
    console.log(news);
    // console.log(picture.name);
  }, []);

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

  const handlesubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      console.log(values);
      console.log(Object.entries(values));
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });
      await axios.patch("/api/updateproduct", formData, {});
      newalertMsg("Your Data Update SuccessFully");
      newseverity("success");
      setOpen(true);
    } catch (err) {
      console.log(err);
      setOpen(true);
      newalertMsg(`Sorry! Not Data Updated`);
      newseverity("error");
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
          {loading ? (
            <LoadingBox />
          ) : error ? (
            // <MessageBox variant='danger'>{error}</MessageBox>
            <h2>Error Occur</h2>
          ) : (
            <Box
              sx={{
                backgroundColor: "white",
                minHeight: "599px",
                marginTop: "89px",
                marginLeft: { md: "33px", xs: "0px" },
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
                      label='Product Name'
                      value={values.name}
                      onChange={handleChange}
                      name='name'
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
                      label='Price'
                      type='number'
                      placeholder='00'
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={values.price}
                      onChange={handleChange}
                      name='price'
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
                      label='CountInStock'
                      placeholder='00'
                      type='number'
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={values.countinstock}
                      onChange={handleChange}
                      name='countinstock'
                      sx={{ width: { md: "400px", xs: "100%" } }}
                    />
                  </Box>
                  <br></br>{" "}
                  <Box
                    className='create-2 a'
                    sx={{ marginBottom: { md: "-12px", xs: "0px" } }}
                  >
                    <TextField
                      id='outlined-required'
                      label='Category'
                      value={values.category}
                      defaultValue='Category Name'
                      onChange={handleChange}
                      name='category'
                      sx={{ width: { md: "400px", xs: "100%" } }}
                    />
                  </Box>
                  <br></br>{" "}
                  <Box
                    className='create-2 a'
                    sx={{ marginBottom: { md: "-12px", xs: "0px" } }}
                  >
                    <TextField
                      id='outlined-required'
                      label='Brand'
                      value={values.brand}
                      onChange={handleChange}
                      name='brand'
                      sx={{ width: { md: "400px", xs: "100%" } }}
                    />
                  </Box>
                  <br></br>{" "}
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
                  <br></br>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "rgb(2,2,2,0.65)",
                    }}
                  >
                    Description
                  </Typography>
                  <Box
                    className='create-2 a'
                    sx={{ marginBottom: { md: "-12px", xs: "0px" } }}
                  >
                    <TextareaAutosize
                      maxRows={4}
                      maxcolumns={4}
                      className='textArea'
                      label='description'
                      aria-label='maximum height'
                      value={values.description}
                      name='description'
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
                  <Box className='submit'>
                    <Button
                      type='submit'
                      variant='outlined'
                      color='secondary'
                      // sx={{ marginTop: "10px", marginBottom: "30px" }}
                    >
                      Update Product
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
          )}
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
