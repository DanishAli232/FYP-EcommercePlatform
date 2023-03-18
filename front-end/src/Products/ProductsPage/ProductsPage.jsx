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
import React, { useContext, useEffect, useState } from "react";
import NavBar1 from "../../Components/NavBar1";
// import img1 from "../Assets/watch2.jpg";
import styled from "styled-components";
import Navbar2 from "../../Components/Navbar2";
import Slider from "@mui/material/Slider";
import { pink } from "@mui/material/colors";
import shirt3 from "../../Assets/shirt3.jpg";
import AllProducts from "./Components/AllProducts";
import Footer1 from "../../Components/Footer1";
import RatingValue from "./Components/RatingValue";
import axios from "axios";
import LoadingBox from "../../Components/LoadingBox";
import { GlobalContext } from "../../Context";

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
  const { setdashboardOpen } = useContext(GlobalContext);
  useEffect(() => {
    setdashboardOpen(false);
  });
  const [value1, setValue1] = React.useState([1500, 6000]);
  const [sorting, setSorting] = React.useState("");
  const [status, setstatus] = useState(false);
  const [error, seterror] = useState({
    message: "Something Went Wrong",
    check: false,
  });
  const [categories, setcategories] = useState([
    { title: "Shirts", qty: 14, active: true },
    { title: "Shoes", qty: 24, active: false },
    { title: "Accessories", qty: 30, active: false },
    { title: "Hats", qty: 20, active: false },
    { title: "Watches", qty: 34, active: false },
  ]);
  const [page, setPage] = React.useState(1);

  const [filterQueries, setfilterQueries] = useState({
    sorting: sorting,
    stars: "",
    minprice: value1[0],
    maxprice: value1[1],
    category: "shirts",
    limit: page,
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

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange1 = (event, newValue, activeThumb) => {
    console.log(newValue);
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
  const productitems = [
    {
      img: shirt3,
      price: "899.99",
      title: "Checkered Casual Shirt",
    },
    {
      img: shirt3,
      price: "899.99",
      title: "Checkered Casual Shirt",
    },
    {
      img: shirt3,
      price: "899.99",
      title: "Checkered Casual Shirt",
    },
    {
      img: shirt3,
      price: "899.99",
      title: "Checkered Casual Shirt",
    },
    {
      img: shirt3,
      price: "899.99",
      title: "Checkered Casual Shirt",
    },
    {
      img: shirt3,
      price: "899.99",
      title: "Checkered Casual Shirt",
    },
    {
      img: shirt3,
      price: "899.99",
      title: "Checkered Casual Shirt",
    },
    {
      img: shirt3,
      price: "899.99",
      title: "Checkered Casual Shirt",
    },
    {
      img: shirt3,
      price: "899.99",
      title: "Checkered Casual Shirt",
    },
  ];

  const fetchData = async () => {
    console.log("yess");
    setstatus(true);
    try {
      let { data } = await axios.post("/api/filterproducts", filterQueries);
      setstatus(false);
      seterror({ ...error, check: false });
      console.log(data);
    } catch (error) {
      seterror({ ...error, check: true });
    }
  };
  useEffect(() => {
    fetchData();
    console.log(filterQueries);
  }, [filterQueries]);

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
      <Navbar2 title={"Products"} title1={"Home"} />
      <Box sx={{ padding: "40px 13px" }}>
        <Grid container spacing={4} rowSpacing={4}>
          <Grid item md={4} sx={{ width: { md: "auto", xs: "100%" } }}>
            <Box
              sx={{
                padding: { md: "30px", xs: "19px 19px" },
                paddingTop: "1px",
                background: "#f7f6f6",
                borderRadius: "4px",
              }}
            >
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
                    <Total>{item.qty}</Total>
                  </li>
                ))}
              </ul>
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
              <Box sx={{ width: 300 }}>
                <Slider
                  getAriaLabel={() => "Minimum distance"}
                  value={value1}
                  onChange={handleChange1}
                  valueLabelDisplay='auto'
                  getAriaValueText={valuetext}
                  disableSwap
                  min={500}
                  max={20000}
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
          <Grid item md={8}>
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
                    {productitems.map((item) => (
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
                      }}
                    >
                      <Pagination
                        count={4}
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
