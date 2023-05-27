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
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingBox, Navbar } from "../Components";
import DeleteIcon from "@mui/icons-material/Delete";
import { default as NewLink } from "@mui/material/Link";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";

import {
  DataGrid,
  GridToolbar,
  GridCellEditStopReasons,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { GlobalContext } from "../../Context";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true }; //keep the previous value and only update loading to true
    case "FETCH_SUCCESS":
      return { ...state, news: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const label = { inputProps: { "aria-label": "Checkbox demo" } };

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
// });

const Stores = () => {
  const navigate = useNavigate();
  const [CheckVal, newCheckVal] = React.useState([]);
  const [show, newshow] = useState(false);
  const [IconShow, notShow] = useState(true);
  const [status, setStatus] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [searchVal, newSearchVal] = useState("");
  const { setdashboardOpen } = useContext(GlobalContext);
  useEffect(() => {
    setdashboardOpen(true);
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
    // {
    //   field: "user",
    //   headerName: "Image",
    //   width: 180,

    //   minHeight: 300,
    //   renderCell: (params) => {
    //     return (
    //       <div>
    //         <img
    //           style={{ width: "140px", height: "80px" }}
    //           src={params.value.image}
    //           alt=''
    //         />
    //       </div>
    //     );
    //   },
    // },

    {
      field: "title",
      headerName: "Title",
      minWidth: 150,
      disableReorder: true,
      editable: true,
      valueGetter: (value) => {
        // console.log(value.id);
        return value.value;
      },
    },
    {
      field: "extraDetail",
      headerName: "Description",
      width: 300,
      renderCell: (params) => <ExpandableCell {...params} />,
    },
    {
      field: "createdAt",
      headerName: " Created At",
      width: 100,
      valueFormatter: ({ value }) => value.slice(0, 10),
      cellClassName: "font-tabular-nums",
    },

    // {
    //   field: "updatedAt",
    //   headerName: "Updated At",
    //   width: 100,
    //   valueFormatter: ({ value }) => value.slice(0, 10),
    // },
    {
      field: "updatedAt",
      headerName: "",
      width: 50,
      renderCell: (cellValues) => {
        const handleClick = (cellvalues) => {
          console.log(cellvalues);
          navigate(`/updatedata/${cellvalues.id}`);
        };
        return (
          <EditIcon
            onClick={(event) => {
              handleClick(cellValues);
            }}
            color='primary'
            sx={{ cursor: "pointer" }}
          />
        );
      },
    },
    {
      field: "delete",
      headerName: "",
      width: 50,
      renderCell: (cellValues) => {
        const DeleteRow = async (cellvalues) => {
          window.location.reload();
          try {
            setOpen(true);
            setStatus("loading");
            return axios.delete(`/api/news/data/${cellvalues.id}`);
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
    news: [],
    loading: true,
    error: "",
  };
  const [{ loading, error, news }, dispatch] = useReducer(
    reducer,
    initialstate
  );
  // const [news, newproducts] = useState([]);

  const DeleteRow = async () => {
    window.location.reload();

    try {
      setOpen(true);
      setStatus("loading");
      // JSON.stringify(CheckVal);
      // axios.delete(`/api/news/data/id?=$()`)
      CheckVal.map((value) => {
        return axios.delete(`/api/news/data/${value}`);
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
    // const fetchData = async () => {
    //   dispatch({ type: "FETCH_REQUEST" });
    //   try {
    //     const result = await axios.get(`/api/news/newsData?q=${searchVal}`);
    //     console.log(result);
    //     dispatch({ type: "FETCH_SUCCESS", payload: result.data });
    //     // newproducts(result.data);
    //   } catch (error) {
    //     dispatch({ type: "FETCH_FAIL", payload: error.message });
    //   }
    // };
    // fetchData();
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
                  fontSize: "17px",
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
                  fontSize: "17px",
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
            {/* {loading ? (
              <LoadingBox />
            ) : error ? (
              // <MessageBox variant='danger'>{error}</MessageBox>
              <h1>Error Occur</h1>
            ) : ( */}
            <DataGrid
              rows={news}
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
                  headerCheckboxSelectionFilteredOnly: true,
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
            {/* )} */}
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

export default Stores;
