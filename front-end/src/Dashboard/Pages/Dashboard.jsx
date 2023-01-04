import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Navbar } from "../Components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FeedIcon from "@mui/icons-material/Feed";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PeopleIcon from "@mui/icons-material/People";

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

const Dashboard = () => {
  // const [displaySideBar, newdisplaySideBar] = useState("none");
  // const [DazeIconDisplay, newDazeIconDisplay] = useState("flex");
  // const [MoveIconDisplay, newMoveIconDisplay] = useState("none");
  // const [users, newusers] = useState(0);
  // const [admins, newadmin] = useState(0);
  // const [likes, newlikes] = useState(0);
  // const [break1, newbreak1] = useState(true);

  // const [show, newshow] = useState(false);
  // const [IconShow, notShow] = useState(true);

  // const initialstate = {
  //   news: [],
  //   loading: true,
  //   error: "",
  // };
  // const [{ loading, error, news }, dispatch] = useReducer(
  //   reducer,
  //   initialstate
  // );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     dispatch({ type: "FETCH_REQUEST" });
  //     try {
  //       const result1 = await axios.get("http://localhost:5000/news/usercount");
  //       console.log(result1);
  //       newusers(result1.data.length);
  //       const result2 = await axios.get(
  //         "http://localhost:5000/news/admincount"
  //       );
  //       console.log(result2);
  //       newadmin(result2.data.length);
  //     } catch (error) {
  //       // dispatch({ type: "FETCH_FAIL", payload: error.message });
  //     }
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchdata = async () => {
  //     let result3 = "";
  //     if (break1 === true) {
  //       result3 = await axios.get("http://localhost:5000/news/getLikes");
  //       newbreak1(false);
  //     }
  //     console.log(result3);
  //     result3.data.map((value) => {
  //       return newlikes((prevdata) => {
  //         return prevdata + value.likes;
  //       });
  //     });
  //   };
  //   fetchdata();
  // }, []);

  // useEffect(() => {
  //   const fetchdata = async () => {
  //     dispatch({ type: "FETCH_REQUEST", loading: true });
  //     try {
  //       const result = await axios.get("http://localhost:5000/news/newscount");
  //       // console.log(result);
  //       dispatch({
  //         type: "FETCH_SUCCESS",
  //         payload: result.data,
  //         loading: false,
  //       });
  //       // newproducts(result.data);
  //     } catch (error) {
  //       dispatch({
  //         type: "FETCH_FAIL",
  //         payload: error.message,
  //         loading: false,
  //       });
  //     }
  //   };
  //   fetchdata();
  // }, []);
  return (
    <Box sx={{ backgroundColor: "rgb(240,242,245)", minHeight: "100vh" }}>
      <Grid container>
        <Grid item md={2}></Grid>
        <Grid item md={10}>
          <Navbar />
          <Box sx={{ marginTop: "89px" }}>
            <Grid
              container
              sx={{
                padding: "40px 0px",
                textAlign: "center",
                justifyContent: "space-around",
              }}
              spacing={9}
              rowSpacing={1}
              columnSpacing={1}
            >
              <Grid
                item
                md={2}
                sx={{
                  backgroundColor: "white",
                  width: "141px",
                  marginBottom: "20px",
                  borderRadius: "0.75rem",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
                  border: "0px solid rgba(0, 0, 0, 0.125)",
                }}
              >
                <Box
                  sx={{
                    // padding: "10px",

                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      // padding: "40px",
                      background:
                        "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))",
                      height: "3rem",
                      boxShadow:
                        "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(64 64 64 / 40%) 0rem 0.4375rem 0.625rem -0.3125rem",
                      width: "3rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "-16px",
                    }}
                  >
                    <FavoriteIcon sx={{ color: "white" }} />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      paddingRight: "8px",
                      alignItems: "flex-end",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "rgb(123, 128, 154)",
                        fontSize: "0.875rem",
                      }}
                    >
                      Vendors
                    </Typography>
                    <Typography
                      sx={{
                        marginBottom: "20px",
                        color: "rgb(52, 71, 103)",
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        lineHeight: "1.00735em",
                      }}
                    >
                      {/* {likes / 2} */}
                      23
                    </Typography>
                  </Box>
                </Box>
                <hr
                  style={{
                    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                    borderRight: "0px solid rgba(0, 0, 0, 0.12)",
                    borderLeft: "0px solid rgba(0, 0, 0, 0.12)",
                    backgroundColor: "transparent",
                    height: "0.0625rem",
                    margin: "1rem 0px",
                    borderBottom: "none",
                    opacity: "0.25",
                    backgroundImage:
                      "linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.4), rgba(52, 71, 103, 0)) !important",
                  }}
                />
                <Typography
                  sx={{
                    color: "rgb(123, 128, 154)",
                    fontSize: "0.875rem",
                    lineHeight: "1.5rem",
                    paddingLeft: "6px",
                    textAlign: "left",
                  }}
                >
                  Just Updated
                </Typography>
              </Grid>
              <Grid
                item
                md={2}
                sx={{
                  backgroundColor: "white",
                  width: "141px",
                  marginBottom: "20px",
                  borderRadius: "0.75rem",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
                  border: "0px solid rgba(0, 0, 0, 0.125)",
                }}
              >
                <Box
                  sx={{
                    // padding: "10px",

                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      // padding: "40px",
                      background:
                        "linear-gradient(195deg, rgb(102, 187, 106), rgb(67, 160, 71))",
                      height: "3rem",
                      boxShadow:
                        "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(64 64 64 / 40%) 0rem 0.4375rem 0.625rem -0.3125rem",
                      width: "3rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "-16px",
                    }}
                  >
                    <SupervisorAccountIcon sx={{ color: "white" }} />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      paddingRight: "8px",
                      alignItems: "flex-end",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "rgb(123, 128, 154)",
                        fontSize: "0.875rem",
                      }}
                    >
                      Admins
                    </Typography>
                    <Typography
                      sx={{
                        marginBottom: "20px",
                        color: "rgb(52, 71, 103)",
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        lineHeight: "1.00735em",
                      }}
                    >
                      3
                      {/* {loading2 ? <CircularProgress /> : totaladmins.length} */}
                    </Typography>
                  </Box>
                </Box>
                <hr
                  style={{
                    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                    borderRight: "0px solid rgba(0, 0, 0, 0.12)",
                    borderLeft: "0px solid rgba(0, 0, 0, 0.12)",
                    backgroundColor: "transparent",
                    height: "0.0625rem",
                    margin: "1rem 0px",
                    borderBottom: "none",
                    opacity: "0.25",
                    backgroundImage:
                      "linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.4), rgba(52, 71, 103, 0)) !important",
                  }}
                />
                <Typography
                  sx={{
                    color: "rgb(123, 128, 154)",
                    fontSize: "0.875rem",
                    lineHeight: "1.5rem",
                    paddingLeft: "6px",
                    textAlign: "left",
                  }}
                >
                  Just Updated
                </Typography>
              </Grid>

              <Grid
                item
                md={2}
                sx={{
                  backgroundColor: "white",
                  width: "141px",
                  marginBottom: "7px",
                  borderRadius: "0.75rem",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
                  border: "0px solid rgba(0, 0, 0, 0.125)",
                }}
              >
                <Box
                  sx={{
                    // padding: "10px",

                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      // padding: "40px",
                      background:
                        "linear-gradient(195deg, rgb(236, 64, 122), rgb(216, 27, 96))",
                      height: "3rem",
                      boxShadow:
                        "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(64 64 64 / 40%) 0rem 0.4375rem 0.625rem -0.3125rem",
                      width: "3rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "-16px",
                    }}
                  >
                    <FeedIcon sx={{ color: "white" }} />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      paddingRight: "8px",
                      alignItems: "flex-end",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "rgb(123, 128, 154)",
                        fontSize: "0.875rem",
                      }}
                    >
                      Stores
                    </Typography>
                    <Typography
                      sx={{
                        marginBottom: "20px",
                        color: "rgb(52, 71, 103)",
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        lineHeight: "1.00735em",
                      }}
                    >
                      21
                      {/* {loading ? (
                        <CircularProgress />
                      ) : error ? (
                        <Typography>0</Typography>
                      ) : (
                        news.length
                      )} */}
                    </Typography>
                  </Box>
                </Box>
                <hr
                  style={{
                    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                    borderRight: "0px solid rgba(0, 0, 0, 0.12)",
                    borderLeft: "0px solid rgba(0, 0, 0, 0.12)",
                    backgroundColor: "transparent",
                    height: "0.0625rem",
                    margin: "1rem 0px",
                    borderBottom: "none",
                    opacity: "0.25",
                    backgroundImage:
                      "linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.4), rgba(52, 71, 103, 0)) !important",
                  }}
                />
                <Typography
                  sx={{
                    color: "rgb(123, 128, 154)",
                    fontSize: "0.875rem",
                    lineHeight: "1.5rem",
                    paddingLeft: "6px",
                    textAlign: "left",
                  }}
                >
                  Just Updated
                </Typography>
              </Grid>
              <Grid
                item
                md={2}
                sx={{
                  backgroundColor: "white",
                  width: "141px",
                  marginBottom: "7px",
                  borderRadius: "0.75rem",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
                  border: "0px solid rgba(0, 0, 0, 0.125)",
                }}
              >
                <Box
                  sx={{
                    // padding: "10px",

                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      // padding: "40px",
                      background:
                        "linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))",
                      height: "3rem",
                      boxShadow:
                        "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(64 64 64 / 40%) 0rem 0.4375rem 0.625rem -0.3125rem",
                      width: "3rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "-16px",
                    }}
                  >
                    <PeopleIcon sx={{ color: "white" }} />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      paddingRight: "8px",
                      alignItems: "flex-end",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "rgb(123, 128, 154)",
                        fontSize: "0.875rem",
                      }}
                    >
                      Users
                    </Typography>
                    <Typography
                      sx={{
                        marginBottom: "20px",
                        color: "rgb(52, 71, 103)",
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        lineHeight: "1.00735em",
                      }}
                    >
                      {/* {users} */}
                      30
                    </Typography>
                  </Box>
                </Box>
                <hr
                  style={{
                    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                    borderRight: "0px solid rgba(0, 0, 0, 0.12)",
                    borderLeft: "0px solid rgba(0, 0, 0, 0.12)",
                    backgroundColor: "transparent",
                    height: "0.0625rem",
                    margin: "1rem 0px",
                    borderBottom: "none",
                    opacity: "0.25",
                    backgroundImage:
                      "linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.4), rgba(52, 71, 103, 0)) !important",
                  }}
                />
                <Typography
                  sx={{
                    color: "rgb(123, 128, 154)",
                    fontSize: "0.875rem",
                    lineHeight: "1.5rem",
                    paddingLeft: "6px",
                    textAlign: "left",
                  }}
                >
                  Just Updated
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
