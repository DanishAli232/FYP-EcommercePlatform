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
import { useTheme, useMediaQuery } from "@mui/material";

import PropTypes from "prop-types";

import {
  DataGrid,
  GridToolbar,
  GridCellEditStopReasons,
} from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import MuiAlert from "@mui/material/Alert";
import { GlobalContext } from "../../Context";
import {
  DashboardContext,
  DashboardGlobalContext,
} from "../Context/DashboardContext";

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

const Orders = () => {
  const [CheckVal, newCheckVal] = React.useState([]);

  const [status, setStatus] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [searchVal, newSearchVal] = useState("");
  const { setdashboardOpen, state } = useContext(GlobalContext);

  const { VendorContent, UserContent, setVendorContent, setsidebar } =
    useContext(DashboardGlobalContext);

  const updatelist = () => {
    let data1;

    if (state?.userInfo?.user?.status === "vendor") {
      data1 = VendorContent;
    } else if (state?.userInfo?.user?.status === "user") {
      data1 = UserContent;
    }
    let data = data1.map(function (x) {
      x.active = false;
      return x;
    });
    console.log(data);
    setVendorContent(data);

    let objIndex = data1.findIndex((obj) => obj.title === "Orders");
    data1[objIndex].active = true;
  };
  useEffect(() => {
    setdashboardOpen(true);
    updatelist();
  }, []);

  useEffect(() => {
    setsidebar("none");
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
  let status0 = state?.userInfo?.user?.status;
  const columns = [
    {
      field: status0 === "vendor" ? "shippingAddress.fullName" : "user.name",
      headerName: "Name",
      minWidth: 150,
      disableReorder: true,
      valueGetter: (value) => {
        return status0 === "vendor"
          ? value?.row?.shippingAddress?.fullName
          : value?.row?.user?.name;
      },
    },
    {
      field:
        status0 === "vendor" ? "paymentResult.email_address" : "user.email",
      headerName: "Email",
      width: 200,
      valueGetter: (value) => {
        return status0 === "vendor"
          ? value?.row?.paymentResult?.email_address
          : value?.row?.user?.email;
      },
      // renderCell: (params) => <ExpandableCell {...params} />,
    },
    {
      field: "orderItems",
      headerName: "orderItems",
      width: 100,
      valueGetter: (value) => {
        return value?.row?.orderItems?.length;
      },
      // renderCell: (params) => <ExpandableCell {...params} />,
    },
    {
      field: "shippingaddress",
      headerName: "shippingAddress",
      width: 200,
      valueGetter: (value) => {
        return value?.row?.shippingAddress?.city;
      },
      // renderCell: (params) => <ExpandableCell {...params} />,
    },
    {
      field: "itemsPrice",
      headerName: "itemsPrice",
      width: 100,
      // renderCell: (params) => <ExpandableCell {...params} />,
    },
    {
      field: "shippingPrice",
      headerName: "shippingPrice",
      width: 100,
      // renderCell: (params) => <ExpandableCell {...params} />,
    },
    {
      field: "totalPrice",
      headerName: "totalPrice",
      width: 100,
      // renderCell: (params) => <ExpandableCell {...params} />,
    },
    {
      field: "isPaid",
      headerName: "isPaid",
      width: 100,
      // renderCell: (params) => <ExpandableCell {...params} />,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      width: 100,
      // renderCell: (params) => <ExpandableCell {...params} />,
    },
    {
      field: "isDelivered",
      headerName: "isDelivered",
      width: 100,
      // renderCell: (params) => <ExpandableCell {...params} />,
    },
    {
      field: "paymentMethod",
      headerName: "paymentMethod",
      width: 100,
      // renderCell: (params) => <ExpandableCell {...params} />,
    },
    {
      field: "createdAt",
      headerName: " Created At",
      width: 100,
      valueFormatter: ({ value }) => value.slice(0, 10),
      cellClassName: "font-tabular-nums",
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

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        let result;
        if (state?.userInfo?.user?.status === "user") {
          result = await axios.get(
            `/api/getorders?uid=${state.userInfo.user._id}&&sval=${searchVal}`
          );
        } else if (state?.userInfo?.user?.status === "vendor") {
          result = await axios.get(
            `/api/getvendororders?uid=${state.userInfo.user._id}&&sval=${searchVal}`
          );
        }
        console.log(result.data);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };
    fetchData();
  }, [searchVal]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
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
                columns={columns.map((column) => ({
                  ...column,
                  disableColumnFilter: isSmallScreen, // Disable filter for small screens
                }))}
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
          'Your Data Delete SuccessFully'
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Orders;
