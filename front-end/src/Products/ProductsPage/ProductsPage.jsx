import {
  Box,
  Checkbox,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Pagination,
  Rating,
  Select,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import NavBar1 from "../../Components/NavBar1";
// import img1 from "../Assets/watch2.jpg";
import styled from "styled-components";
import Navbar2 from "../../Components/Navbar2";
import queryString from "query-string";
import Slider from "@mui/material/Slider";
import { pink } from "@mui/material/colors";
import shirt3 from "../../Assets/shirt3.jpg";
import chair1 from "../../Assets/chair1.jpg";
import AllProducts from "./Components/AllProducts";
import Footer1 from "../../Components/Footer1";
import RatingValue from "./Components/RatingValue";
import axios from "axios";
import LoadingBox from "../../Components/LoadingBox";
import { GlobalContext } from "../../Context";
import { useLocation } from "react-router-dom";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Title1 = styled.h4`
  color: #2b2d42;
  font-size: 20px;
  line-height: 20px;
  text-transform: capitalize;
  margin-bottom: 25px;
`;

const liststyle = {
  position: "relative",
  padding: "0.75rem 4px",
  borderRadius: "4px",
  border: "none",
  borderBottom: "1px solid rgba(0, 0, 0, 0.125)",
  // backgroundColor: "transparent",
  color: "#888",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  textDecoration: "none",
  listStyle: "none",
};

const Total = styled.span`
  display: flex;
  padding: 0.35em 0.65em;
  font-size: 0.75em;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  background-color: #3a3535;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
`;

const Discount = styled.label`
  position: relative;
  padding-left: 2px;
  margin-bottom: 16px;
  cursor: pointer;
  font-size: 17px;
  font-family: "Lato", sans-serif;
  line-height: 18px;
  color: #6b778d;
`;

const Title2 = styled.h4`
  font-size: 18px;
  text-transform: capitalize;
  color: #6b778d;
`;

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 10;

const ProductsPage = () => {
  let value = queryString.parse(window.location.search);

  const { setdashboardOpen, switchbtn, navlistitems, state } =
    useContext(GlobalContext);
  useEffect(() => {
    setdashboardOpen(false);
  });
  const [value1, setValue1] = React.useState([0, 6000]);
  const [sorting, setSorting] = React.useState("");
  const [products, setproducts] = useState([]);
  const [status, setstatus] = useState(false);
  const [error, seterror] = useState({
    message: "Something Went Wrong",
    check: false,
  });

  const [Objects, set3dobjects] = useState([
    {
      name: "chair",
      price: "200",
      image: chair1,
      _id: "11",
      brand: "nike",
      description: "no",
      vendor: "no",
      rating: "12",
    },
    {
      name: "",
      price: "",
      image: "",
      _id: "",
      brand: "",
      description: "",
      vendor: "",
      rating: "",
    },
    {
      name: "",
      price: "",
      image: "",
      _id: "",
      brand: "",
      description: "",
      vendor: "",
      rating: "",
    },
  ]);

  let value11 =
    typeof value.category === "string" && value.category.length < 20;
  const [categories, setcategories] = useState([
    {
      title: "3D Objects",
      qty: 14,
      active: value11 && value.category === "3D Objects" ? true : false,
    },
    {
      title: "Shirts",
      qty: 14,
      active: value11 && value.category === "Shirts" ? true : false,
    },
    {
      title: "Shoes",
      qty: 24,
      active: value11 && value.category === "Shoes" ? true : false,
    },
    {
      title: "Accessories",
      qty: 30,
      active: value11 && value.category === "Accessories" ? true : false,
    },
    {
      title: "Hats",
      qty: 20,
      active: value11 && value.category === "Hats" ? true : false,
    },
    {
      title: "Watches",
      qty: 34,
      active: value11 && value.category === "Watches" ? true : false,
    },
    {
      title: "Others",
      qty: 34,
      active: value11 && value.category === "Others" ? true : false,
    },
  ]);
  const [page, setPage] = React.useState(1);
  const [totalPages, settotalPages] = useState(1);

  const [filterQueries, setfilterQueries] = useState({
    sorting: sorting,
    stars: 0,
    minprice: value1[0],
    maxprice: value1[1],
    category:
      typeof value.category === "string" && value.category.length < 20
        ? value.category
        : "",
    limit: page,
    vendorid: value?.vendorid ? value?.vendorid : state?.userInfo?.user?._id,
  });

  const handleChange2 = (event) => {
    setSorting(event.target.value);
    setfilterQueries({ ...filterQueries, sorting: event.target.value });
  };
  const [checked, setChecked] = React.useState(false);
  const [ratingvalue, setRatingValue] = React.useState([
    { value: "5.0", active: false },
    { value: "4.0", active: false },
    { value: "3.0", active: false },
    { value: "2.0", active: false },
    { value: "1.0", active: false },
  ]);

  useEffect(() => {}, []);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
      setfilterQueries({
        ...filterQueries,
        minprice: Math.min(newValue[0], value1[1] - minDistance),
      });
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
      setfilterQueries({
        ...filterQueries,
        maxprice: Math.max(newValue[1], value1[0] + minDistance),
      });
    }
  };

  const fetchData = async () => {
    console.log("yess");
    console.log(state?.userInfo?.user?.status);
    setstatus(true);
    if (state?.userInfo?.user?.status === "vendor") {
      try {
        // setfilterQueries({ ...filterQueries, vendorid: vendorid });
        let { data } = await axios.post(
          "/api/filtervendorProducts",
          filterQueries
        );
        setproducts(data);
        setstatus(false);
        seterror({ ...error, check: false });
        let total_pages = Math.ceil(data.length / 9);
        console.log(total_pages);
        if (data.length === 9) {
          settotalPages(totalPages + 1);
        }
      } catch (error) {
        seterror({ ...error, check: true });
      }
    } else {
      if (switchbtn === 1 || value.vendorid === undefined) {
        try {
          let { data } = await axios.post("/api/filterproducts", filterQueries);
          setproducts(data);
          setstatus(false);
          seterror({ ...error, check: false });
          let total_pages = Math.ceil(data.length / 9);
          if (data.length === 9) {
            settotalPages(totalPages + 1);
          }
        } catch (error) {
          seterror({ ...error, check: true });
        }
      } else {
        try {
          // setfilterQueries({ ...filterQueries, vendorid: vendorid });
          let { data } = await axios.post(
            "/api/filtervendorProducts",
            filterQueries
          );
          setproducts(data);
          setstatus(false);
          seterror({ ...error, check: false });
          let total_pages = Math.ceil(data.length / 9);
          // settotalPages(totalPages + 1);
          if (data.length === 9) {
            settotalPages(totalPages + 1);
          }
          console.log(data);
        } catch (error) {
          seterror({ ...error, check: true });
        }
      }
    }
  };

  const updatelist = () => {
    let data1 = navlistitems;
    let data = data1.map(function (x) {
      x.active = false;
      return x;
    });
    console.log(data);
    // console.log(data);
    // setnavlistitems({})
    // setnavlistitems((prev) => {
    //   console.log(prev);
    // });

    let objIndex = navlistitems.findIndex((obj) => obj.title === "Products");
    navlistitems[objIndex].active = true;
  };
  useEffect(() => {
    updatelist();
  }, []);

  useEffect(() => {
    if (filterQueries.category === "3D Objects") {
      setproducts(Objects);
    } else {
      fetchData();
    }
  }, [filterQueries, switchbtn]);

  // useEffect(() => {
  //   chrome.storage.local.get(['myData'], (result) => {
  //     setMyData(result.myData);
  //   });
  // }, []);

  const ratingClick = (value) => {
    let data = ratingvalue.filter(function (x) {
      x.active = false;
      return x;
    });
    setRatingValue(data);
    let objIndex = ratingvalue.findIndex((obj) => obj.value === value);
    data[objIndex].active = true;
    setRatingValue(data);

    setfilterQueries({
      ...filterQueries,
      stars: value,
    });
  };

  const handlePage = (event, value) => {
    setPage(value);
    setfilterQueries({
      ...filterQueries,
      limit: value,
    });
  };

  return (
    <Box>
      <NavBar1 />
      {switchbtn === 1 ? (
        <Navbar2 title={"Products"} title1={"Home"} />
      ) : (
        <Navbar2 title={"Online Store"} title1={"Home"} />
      )}
      <Box
        sx={{
          padding: { md: "40px 60px", xs: "40px 13px" },
          width: { sm: "auto", xs: "91%" },
        }}
      >
        <Grid container spacing={4} rowSpacing={4} sx={{}}>
          <Grid
            item
            md={4}
            sx={{
              width: {
                md: "100%",
                xs: "100%",
                // paddingLeft: { sm: "32px", xs: "0px" },
                // paddingRight: { sm: "32px", xs: "0px" },
              },
            }}
          >
            <Box
              sx={{
                padding: { md: "30px", xs: "19px 19px" },
                paddingTop: "1px",
                background: "#f7f6f6",
                borderRadius: "4px",
              }}
            >
              {(state?.userInfo?.user?.status === "user" ||
                !state?.userInfo?.user?.status) && (
                <Box>
                  <Title1>Product Categories</Title1>
                  <ul style={{ margin: 0, padding: 0 }}>
                    {categories.map((item) => (
                      <li
                        onMouseEnter={(e) => {
                          if (!item.active) {
                            e.target.style.backgroundColor = "#e5e5e56b";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!item.active) {
                            e.target.style.backgroundColor = "transparent";
                          }
                        }}
                        style={{
                          ...liststyle,
                          cursor: "pointer",
                          background: item.active ? "#e5e5e56b" : "transparent",
                        }}
                        onClick={() => {
                          let data = categories.filter(function (x) {
                            x.active = false;
                            return x;
                          });
                          setcategories(data);
                          let objIndex = categories.findIndex(
                            (obj) => obj.title === item.title
                          );
                          data[objIndex].active = true;
                          setcategories(data);
                          setfilterQueries({
                            ...filterQueries,
                            category: item.title,
                          });
                        }}
                      >
                        {item.title}
                        <Total></Total>
                      </li>
                    ))}
                  </ul>
                </Box>
              )}

              <Title1>Filter By Price</Title1>
              <Typography
                sx={{
                  fontSize: "17px",
                  wordSpacing: "11px",
                  color: "#5a5a5a",
                  marginTop: "-10px",
                  marginBottom: "5px",
                }}
              >
                {value1[0]} - {value1[1]}
              </Typography>
              <Box sx={{ width: { md: 300, xs: "100%" } }}>
                <Slider
                  getAriaLabel={() => "Minimum distance"}
                  value={value1}
                  onChange={handleChange1}
                  valueLabelDisplay='auto'
                  getAriaValueText={valuetext}
                  disableSwap
                  min={0}
                  max={30000}
                />
              </Box>
              <Title1>Discount</Title1>
              <Box sx={{ marginTop: "-10px", marginLeft: "-11px" }}>
                <Box sx={{}}>
                  <Checkbox
                    {...label}
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                    sx={{
                      color: pink[800],
                      "&.Mui-checked": {
                        color: pink[600],
                      },
                    }}
                  />
                  <Discount>10% or More</Discount>
                </Box>
                <Box sx={{}}>
                  <Checkbox
                    {...label}
                    checked={checked}
                    onChange={handleChange}
                    name='first'
                    sx={{
                      color: pink[800],
                      "&.Mui-checked": {
                        color: pink[600],
                      },
                    }}
                  />
                  <Discount>20% or More</Discount>
                </Box>
                <Box sx={{}}>
                  <Checkbox
                    {...label}
                    checked={checked}
                    onChange={handleChange}
                    sx={{
                      color: pink[800],
                      "&.Mui-checked": {
                        color: pink[600],
                      },
                    }}
                  />
                  <Discount>30% or More</Discount>
                </Box>
                <Box sx={{}}>
                  <Checkbox
                    {...label}
                    checked={checked}
                    onChange={handleChange}
                    sx={{
                      color: pink[800],
                      "&.Mui-checked": {
                        color: pink[600],
                      },
                    }}
                  />
                  <Discount>40% or More</Discount>
                </Box>
              </Box>
              <Title1>Customer Ratings</Title1>
              {ratingvalue.map((item) => (
                <RatingValue
                  value={item.value}
                  active={item.active}
                  ratingClick={ratingClick}
                />
              ))}
            </Box>
          </Grid>
          <Grid item md={8} style={{ position: "relative" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Title2>Show All Results</Title2>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    sx={{
                      width: { md: "300px", xs: "auto" },
                      color: "#888",
                      background: "#f7f6f6",
                      cursor: "pointer",
                      height: "45px",
                      outline: "none",
                    }}
                    value={sorting}
                    onChange={handleChange2}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value=''>Default Sorting</MenuItem>

                    <MenuItem value={"lowtohigh"}>
                      Sort By Price: Low to High
                    </MenuItem>
                    <MenuItem value={"hightolow"}>
                      Sort By Price: High to Low
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {status ? (
                <LoadingBox />
              ) : error.check ? (
                <p>Something Went Wrong</p>
              ) : (
                <Box sx={{ marginTop: "2rem" }}>
                  <Grid
                    container
                    spacing={2}
                    rowSpacing={4}
                    columnSpacing={2}
                    sx={{ marginBottom: "20px" }}
                  >
                    {products.map((item) => (
                      <Grid
                        width='100%'
                        item
                        key={item._id}
                        xs={6}
                        md={4}
                        lg={4}
                      >
                        <AllProducts {...item} />
                      </Grid>
                    ))}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "100%",
                        marginTop: "50px",
                        position: "absolute",
                        bottom: "-27px",
                      }}
                    >
                      <Pagination
                        count={totalPages}
                        page={page}
                        // classes={{ ul: classes.ul }}
                        onChange={handlePage}
                        shape='rounded'
                        sx={{ color: "red" }}
                        color='secondary'
                      />
                    </Box>
                  </Grid>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer1 />
    </Box>
  );
};

export default ProductsPage;
