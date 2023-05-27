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
import { LoadingBox, Navbar } from "../Components";
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
import {
  DashboardContext,
  DashboardGlobalContext,
} from "../Context/DashboardContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, user: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const label1 = { inputProps: { "aria-label": "Switch demo" } };

const AllUsers = () => {
  // const Alert = React.forwardRef(function Alert(props, ref) {
  //   return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  // });
  const { adminContent, setVendorContent, setsidebar } = useContext(
    DashboardGlobalContext
  );
  const navigate = useNavigate();
  const [CheckVal, newCheckVal] = React.useState([]);
  const [show, newshow] = useState(false);
  const [IconShow, notShow] = useState(true);
  const [status, setStatus] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [searchVal, newSearchVal] = useState("");
  const { setdashboardOpen, state } = useContext(GlobalContext);
  const updatelist = () => {
    let data1;

    if (state?.userInfo?.user?.status === "admin") {
      data1 = adminContent;
    }
    let data = data1.map(function (x) {
      x.active = false;
      return x;
    });
    setVendorContent(data);
    let objIndex = data1.findIndex((obj) => obj.title === "All Users");
    data1[objIndex].active = true;
  };

  useEffect(() => {
    setdashboardOpen(true);
    updatelist();
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
      field: "name",
      headerName: "Name",
      minWidth: 150,
      disableReorder: true,
      // valueGetter: (value) => {
      //   // console.log(value.id);
      //   return value.value;
      // },
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      // renderCell: (params) => <ExpandableCell {...params} />,
    },

    {
      field: "status",
      headerName: "Status",
      width: 150,
      // renderCell: (params) => <ExpandableCell {...params} />,
    },
    {
      field: "createdAt",
      headerName: " Created At",
      width: 150,
      valueFormatter: ({ value }) => value.slice(0, 10),
      cellClassName: "font-tabular-nums",
    },

    {
      field: "switch",
      headerName: "switch",
      width: 150,
      renderCell: (cellValues) => {
        const handleClick = (cellvalues) => {
          if (cellvalues.row.status === "admin") {
            try {
              axios.patch(`/api/statususerupdate/${cellvalues.id}`, {
                status: "user",
              });
            } catch (error) {
              console.log(error);
            }
            cellvalues.row.status = "user";
          } else if (cellvalues.row.status === "user") {
            try {
              axios.patch(`/api/statususerupdate/${cellvalues.id}`, {
                status: "admin",
              });
            } catch (error) {
              console.log(error);
            }
            cellvalues.row.status = "admin";
          }
        };

        // console.log(cellvalues);

        return (
          <Switch
            {...label1}
            onClick={(event) => {
              handleClick(cellValues);
            }}
          />
        );
      },
    },
    {
      field: "delete",
      headerName: "",
      width: 150,
      renderCell: (cellValues) => {
        const DeleteRow = async (cellvalues) => {
          window.location.reload();
          try {
            setOpen(true);
            setStatus("loading");
            axios.delete(`/api/deleteuser/${cellValues.id}`);
          } catch (error) {
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
    user: [],
    loading: true,
    error: "",
  };
  const [{ loading, error, user }, dispatch] = useReducer(
    reducer,
    initialstate
  );
  // const [user, newproducts] = useState([]);

  const DeleteRow = async () => {
    window.location.reload();
    try {
      setOpen(true);
      setStatus("loading");
      CheckVal.map((value) => {
        return axios.delete(`/api/deleteuser/${value}`);
      });
    } catch (error) {
      console.log(error);
    }
  };

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
        const result = await axios.get(`/api/getallusers?q=${searchVal}`);
        console.log(result);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };
    fetchData();
  }, [searchVal]);

  return (
    <Box sx={{ backgroundColor: "rgb(240,242,245)", minHeight: "100vh" }}>
      <Grid container>
        <Grid item md={2}></Grid>
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
            {CheckVal.length === 0 ? (
              <Button
                disabled
                sx={{
                  paddingLeft: { md: "0px", xs: "0px" },
                  fontSize: { md: "17px", xs: "12px" },
                  color: "red",
                  cursor: "pointer",
                }}
              >
                Delete
              </Button>
            ) : (
              <Button
                sx={{
                  paddingLeft: { md: "0px", xs: "0px" },
                  fontSize: { md: "17px", xs: "12px" },
                  color: "red",
                  cursor: "pointer",
                }}
                onClick={DeleteRow}
              >
                Delete
                {status === "loading" && (
                  <CircularProgress sx={{ ml: 1 }} size='16px' />
                )}{" "}
              </Button>
            )}
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
                rows={user}
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
          'Your Data Delete SuccessFully'
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AllUsers;
