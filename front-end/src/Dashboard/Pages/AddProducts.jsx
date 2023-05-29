import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  MenuItem,
  Select,
  Snackbar,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

import React, { useContext, useEffect, useRef, useState } from "react";
import { Navbar, Sidebar } from "../Components";
import MuiAlert from "@mui/material/Alert";
import { GlobalContext } from "../../Context";
import { DashboardGlobalContext } from "../Context/DashboardContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const Addproducts = () => {
  const {
    setnavcontent,
    statuscheck,
    adminContent,
    setAdminContent,
    UserContent,
    setUserContent,
    setVendorContent,
    VendorContent,
    setsidebar,
  } = useContext(DashboardGlobalContext);

  const { setdashboardOpen } = useContext(GlobalContext);
  const inputRef = useRef();
  const { state } = useContext(GlobalContext);
  const { userInfo } = state;
  const updatelist = () => {
    let data1;

    if (state?.userInfo?.user?.status === "vendor") {
      data1 = VendorContent;
    } else if (state?.userInfo?.user?.status === "admin") {
      data1 = adminContent;
    }
    let data = data1.map(function (x) {
      x.active = false;
      return x;
    });
    setVendorContent(data);

    let objIndex = data1.findIndex((obj) => obj.title === "Add Product");
    data1[objIndex].active = true;
  };

  useEffect(() => {
    setdashboardOpen(true);
    updatelist();
    setsidebar("none");
  }, []);
  const [open, setOpen] = React.useState(false);
  const [categoryOpen, setcategoryOpen] = useState(false);
  const [alertMsg, newalertMsg] = useState("");
  const [severity, newseverity] = useState("");
  const [category, setCategory] = React.useState("");
  const [newcategory, setnewCategory] = React.useState("");
  const [status, setStatus] = useState(null);
  const [error, seterror] = useState({});
  const [values, setValues] = useState({
    name: "",
    category: "",
    price: "",
    countinstock: "",
    brand: "",
    description: "",
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
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });
      await axios.post(
        `/api/addproduct/postdata/${userInfo.user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      newalertMsg("Your Data Send SuccessFully");
      newseverity("success");
      setOpen(true);
      setStatus(null);
      setValues({
        ...values,
        name: "",
        price: "",
        countinstock: "",
        brand: "",
        description: "",
        image: "",
      });
    } catch (err) {
      console.log(err);
      setStatus(null);
      setOpen(true);
      newalertMsg(`Invalid Input`);
      newseverity("error");
      seterror(err.response.data.errors);
    }
  };

  const handleChange2 = (event) => {
    setCategory(event.target.value);
    setValues({ ...values, category: event.target.value });
  };

  useEffect(() => {
    console.log(values);
    console.log(categoryOpen);
  }, [categoryOpen]);

  return (
    <Box sx={{ backgroundColor: "rgb(240,242,245)", minHeight: "100vh" }}>
      <Grid container>
        <Grid item md={2}></Grid>
        <Grid item md={10}>
          <Navbar />
          {state?.userInfo?.user?.billingPlan !== "" ? (
            <Box
              sx={{
                backgroundColor: "white",
                minHeight: "599px",

                marginTop: "89px",
                marginLeft: { md: "33px", xs: "4px" },
                width: { md: "auto", xs: "110%" },
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
                      className='title'
                      value={values.name}
                      onChange={handleChange}
                      name='name'
                      helperText={error.name}
                      error={!!error.name}
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
                      className='price'
                      label='Price'
                      type='number'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='start'>pkr</InputAdornment>
                        ),
                      }}
                      placeholder='00'
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={values.price}
                      onChange={handleChange}
                      name='price'
                      helperText={error.price}
                      error={!!error.price}
                      sx={{ width: { md: "400px", xs: "100%" } }}
                    />
                  </Box>
                  <br></br>
                  <Box
                    className='create-2 a'
                    sx={{ marginBottom: { md: "-12px", xs: "0px" } }}
                  >
                    <TextField
                      className='countinstock'
                      id='outlined-required'
                      label='CountInStock'
                      placeholder='00'
                      helperText={error.countinstock}
                      error={!!error.countinstock}
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
                    {categoryOpen === false ? (
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                          className='category'
                          name='category'
                          sx={{
                            width: { md: "399px", xs: "185%" },
                            color: "#888",
                            // background: "#f7f6f6",
                            cursor: "pointer",
                            height: "50px",
                            marginLeft: "-7px",
                            outline: "none",
                          }}
                          value={category}
                          onChange={handleChange2}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value=''>Select Category</MenuItem>

                          <MenuItem value={"Shoes"}>Shoes</MenuItem>
                          <MenuItem value={"Shirts"}>Shirts</MenuItem>
                          <MenuItem value={"Pictures"}>Hats</MenuItem>
                          <MenuItem value={"Accessories"}>Accessories</MenuItem>
                          <MenuItem value={"Watches"}>Watches</MenuItem>
                          <MenuItem value={"Others"}>Others</MenuItem>
                          <MenuItem
                            value={"add"}
                            onClick={() => {
                              console.log("okk");
                              setcategoryOpen(true);
                            }}
                          >
                            <Button
                              sx={{
                                margin: 0,
                                padding: 0,
                                background: "transparent",
                                color: "black",
                              }}
                            >
                              Add Category
                            </Button>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      <TextField
                        id='outlined-required'
                        className='category'
                        label='Enter new Category'
                        value={category}
                        onChange={handleChange2}
                        name='category'
                        // helperText={error.brand}
                        // error={!!error.brand}
                        sx={{ width: { md: "400px", xs: "100%" } }}
                      />
                    )}
                  </Box>
                  <br></br>{" "}
                  <Box
                    className='create-2 a'
                    sx={{ marginBottom: { md: "-12px", xs: "0px" } }}
                  >
                    <TextField
                      className='brand'
                      id='outlined-required'
                      label='Brand'
                      value={values.brand}
                      onChange={handleChange}
                      name='brand'
                      helperText={error.brand}
                      error={!!error.brand}
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
                    className='description'
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
                      helperText={error.description}
                      error={!!error.description}
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
                        sx={{
                          border: "1px solid #f0353b",
                          color: "#f0353b",
                          background: "white",
                          "&:hover": {
                            background: "white",
                          },
                        }}
                        variant='contained'
                        component='span'
                      >
                        Upload Image
                      </Button>
                    </label>
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        color: "#d32f2f",
                        marginLeft: "14px",
                        marginRight: "14px",
                        marginTop: "0px",
                      }}
                    >
                      {error.image}
                    </Typography>
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
                      // color='secondary'
                      sx={{
                        background: "#f0353b",
                        color: "white",
                        border: "1px solid #f0353b",
                        "&:hover": {
                          background: "#f0353b",
                          border: "1px solid #f0353b",
                        },
                      }}
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
          ) : (
            <Box sx={{ margin: "101px 42px" }}>
              <h4>No Billing PLan Yet</h4>
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
