import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  Grid,
  Input,
  Snackbar,
  Switch,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingBox, Navbar, Sidebar } from "../Components";
import DeleteIcon from "@mui/icons-material/Delete";
import { default as NewLink } from "@mui/material/Link";
import PropTypes from "prop-types";

import {
  DataGrid,
  GridToolbar,
  GridCellEditStopReasons,
} from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import MuiAlert from "@mui/material/Alert";
import { GlobalContext } from "../../Context";
import { DashboardGlobalContext } from "../Context/DashboardContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, orders: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Wishlist = () => {
  const [CheckVal, newCheckVal] = React.useState([]);

  const [status, setStatus] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [message, setmessage] = useState("");
  const [searchVal, newSearchVal] = useState("");
  const { setdashboardOpen, state } = useContext(GlobalContext);

  const {
    VendorContent,
    adminContent,
    UserContent,
    setUserContent,
    setsidebar,
  } = useContext(DashboardGlobalContext);
  useEffect(() => {
    setsidebar("none");
  }, []);
  const updatelist = () => {
    let data1;

    if (state?.userInfo?.user?.status === "vendor") {
      data1 = VendorContent;
    } else if (state?.userInfo?.user?.status === "admin") {
      data1 = adminContent;
    } else if (state?.userInfo?.user?.status === "user") {
      data1 = UserContent;
    }
    let data = data1.map(function (x) {
      x.active = false;
      return x;
    });
    setUserContent(data);

    let objIndex = data1.findIndex((obj) => obj.title === "Wishlist");
    data1[objIndex].active = true;
  };

  useEffect(() => {
    setdashboardOpen(true);
    updatelist();
  }, []);

  const ExpandableCell = ({ value }) => {
    const [expanded, setExpanded] = React.useState(false);

    return (
      <Box>
        {expanded ? value : value.slice(0, 100)}&nbsp;
        {value.length > 100 && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <NewLink
            type='button'
            component='button'
            sx={{ fontSize: "inherit" }}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "view less" : "view more"}
          </NewLink>
        )}
      </Box>
    );
  };

  ExpandableCell.propTypes = {
    value: PropTypes.any,
  };

  const columns = [
    {
      field: "checkout",
      headerName: "",
      width: 60,
      minHeight: 300,
      renderCell: (cellValues) => {
        const handleClick = (cellValues) => {
          console.log(cellValues);

          let position = CheckVal.indexOf(cellValues.id) + 1;
          if (position === 0) {
            newCheckVal([...CheckVal, cellValues.id]);
          } else {
            newCheckVal((prevdata) => {
              return prevdata.filter((filterval) => {
                return filterval !== cellValues.id;
              });
            });
          }
        };
        return (
          <Box>
            <Checkbox
              {...label}
              onClick={(event) => {
                handleClick(cellValues);
              }}
            />
          </Box>
        );
      },
    },

    {
      field: "product.name",
      headerName: "ProductName",
      minWidth: 150,
      // disableReorder: true,
      valueGetter: (value) => {
        return value?.row?.product?.name;
      },
    },
    {
      field: "product.price",
      headerName: "Price",
      width: 150,
      valueGetter: (value) => {
        return value?.row?.product?.price;
      },
      // renderCell: (params) => <ExpandableCell {...params} />,
    },
    {
      field: "product.brand",
      headerName: "Brand",
      width: 150,
      valueGetter: (value) => {
        return value?.row?.product?.brand;
      },
      // renderCell: (params) => <ExpandableCell {...params} />,
    },
    {
      field: "product.category",
      headerName: "Category",
      width: 150,
      valueGetter: (value) => {
        return value?.row?.product?.category;
      },
      // renderCell: (params) => <ExpandableCell {...params} />,
    },
    {
      field: "product.rating",
      headerName: "Rating",
      width: 150,
      valueGetter: (value) => {
        return value?.row?.product?.rating;
      },
      // renderCell: (params) => <ExpandableCell {...params} />,
    },

    {
      field: "delete",
      headerName: "",
      width: 50,
      renderCell: (cellValues) => {
        const DeleteRow = async (cellvalues) => {
          // window.location.reload();
          console.log(state?.cart?.wishid?.wishId);
          console.log(cellvalues);
          try {
            await axios.patch(
              `/api/deletewishitem?i=${cellvalues?.row?.product?._id}&c=${state?.cart?.wishid?.wishId}`
            );

            setOpen(true);
            setStatus("loading");
            setmessage("Item Removed");
            fetchData();
          } catch (error) {
            setOpen(true);
            setStatus("loading");
            setmessage("Not Removed");
            console.log(error);
          }
        };

        return (
          <DeleteIcon
            onClick={(event) => {
              DeleteRow(cellValues);
            }}
            sx={{ cursor: "pointer", color: "red" }}
          />
        );
      },
    },
  ];

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStatus(null);
    setOpen(false);
  };
  const initialstate = {
    orders: [],
    loading: true,
    error: "",
  };
  const [{ loading, error, orders }, dispatch] = useReducer(
    reducer,
    initialstate
  );
  // const [orders, newproducts] = useState([]);

  const filterResult = (event) => {
    newSearchVal(event.target.value);
  };

  const [filterModel, setFilterModel] = React.useState({
    items: [
      {
        columnField: "title",
        operatorValue: "contains",
        value: "",
      },
    ],
  });
  const fetchData = async () => {
    var vl;

    dispatch({ type: "FETCH_REQUEST" });
    try {
      const result = await axios.get(
        `/api/getwishitems?id=${state?.userInfo?.user?._id}&&sval=${searchVal}`
      );
      if (result?.data.length === 0) {
        vl = [];
      } else {
        vl = result?.data[0]?.products;
      }
      dispatch({ type: "FETCH_SUCCESS", payload: vl });
    } catch (error) {
      dispatch({ type: "FETCH_FAIL", payload: error.message });
    }
  };
  useEffect(() => {
    fetchData();
  }, [searchVal]);

  return (
    <Box sx={{ backgroundColor: "rgb(240,242,245)", minHeight: "100vh" }}>
      <Grid container>
        <Grid item md={2}>
          {" "}
        </Grid>
        <Grid item md={10}>
          <Navbar />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0px",
              width: { sm: "91%", xs: "73%" },
              marginTop: "89px",
              paddingLeft: { md: "45px", xs: "10px" },
              paddingRight: { md: "45px", xs: "10px" },
            }}
          >
            <Box></Box>
            <Box sx={{ marginBottom: "10px" }}>
              {/* <TextField
                    onChange={filterResult}
                    value={searchVal}
                    id='standard-basic'
                    label='Search'
                    variant='standard'
                    type='search'
                  /> */}
              <FormControl fullWidth sx={{ m: 1 }} variant='standard'>
                {/* <InputLabel htmlFor='standard-adornment-amount'>
                      Search
                    </InputLabel> */}
                <Input
                  id='standard-adornment-amount'
                  value={searchVal}
                  onChange={filterResult}
                  startAdornment={<SearchIcon />}
                  placeholder='Search'
                />
              </FormControl>
            </Box>
          </Box>
          <Box
            sx={{
              height: 538,
              width: { sm: "92%", xs: "96%" },
              padding: { md: "42px", xs: "5px" },
              paddingTop: "0px !important",
            }}
          >
            {loading ? (
              <LoadingBox />
            ) : error ? (
              // <MessageBox variant='danger'>{error}</MessageBox>
              <h1>Error Occur</h1>
            ) : (
              <DataGrid
                rows={orders}
                columns={columns}
                pageSize={6}
                getRowId={(row) => row._id}
                getRowHeight={() => "auto"}
                getEstimatedRowHeight={() => 100}
                onSortModelChange={(value) => {
                  console.log(value);
                }}
                experimentalFeatures={{ newEditingApi: true }}
                onCellEditStop={(params, event) => {
                  if (params.reason === GridCellEditStopReasons.cellFocusOut) {
                    event.defaultMuiPrevented = true;
                    console.log(params.id + "id Value");
                  }
                }}
                components={{
                  Toolbar: GridToolbar,
                }}
                filterModel={filterModel}
                onFilterModelChange={(newFilterModel) =>
                  setFilterModel(newFilterModel)
                }
                componentsProps={{
                  toolbar: {
                    // showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                    headercheckboxselectionfilteredonly: "true",
                  },
                }}
                sx={{
                  backgroundColor: "white",
                  height: "100%",
                  "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
                    py: 1,
                  },
                  "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
                    py: "15px",
                  },
                  "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
                    py: "22px",
                  },
                }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Wishlist;
