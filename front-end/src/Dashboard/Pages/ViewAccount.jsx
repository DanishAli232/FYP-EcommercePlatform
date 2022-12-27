import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Navbar } from "../Components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ViewAccount = () => {
  return (
    <Box sx={{ backgroundColor: "rgb(240,242,245)", minHeight: "100vh" }}>
      <Grid container>
        <Grid item md={2}></Grid>
        <Grid item md={10}>
          <Navbar />
          <Box sx={{ minHeight: "569px" }}>
            <Box
              sx={{
                backgroundColor: "white",
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    // paddingLeft: "10px",
                    alignItems: "center",
                  }}
                >
                  <AccountCircleIcon
                    sx={{
                      fontSize: "67px",
                      color: "rgb(175,175,175)",
                      paddingRight: "8px",
                    }}
                  />
                  {/* <Stack>
                    <Avatar sx={{ width: 56, height: 56 }}>O</Avatar>
                  </Stack> */}

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "rgb(52, 71, 103)",
                        fontWeight: 600,
                        fontSize: "1.25rem",
                      }}
                    >
                      Name Of Person
                    </Typography>
                    <Typography
                      sx={{ color: "rgb(123, 128, 154)", fontSize: "0.875rem" }}
                    >
                      Admin
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      color: "rgb(52, 71, 103)",
                      textTransform: "capitalize",
                      fontWeight: 600,
                      marginTop: "20px",
                    }}
                  >
                    Profile Information
                  </Typography>
                  <Typography
                    sx={{ color: "rgb(123, 128, 154)", fontWeight: 300 }}
                  >
                    Hi, I’m Alec Thompson, Decisions: If you can’t decide, the
                    answer is no. If two equally difficult paths, choose the one
                    more painful in the short term (pain avoidance is creating
                    an illusion of equality)
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "15px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "rgb(52, 71, 103)",
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        marginRight: "20px",
                        width: "100px",
                      }}
                    >
                      Full Name:
                    </Typography>{" "}
                    <Typography
                      sx={{
                        color: "rgb(123, 128, 154)",
                        fontSize: "0.875rem",
                        fontWeight: 400,
                        width: "150px",
                      }}
                    >
                      Name of Person
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "6px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "rgb(52, 71, 103)",
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        marginRight: "20px",
                        width: "100px",
                      }}
                    >
                      Email:
                    </Typography>{" "}
                    <Typography
                      sx={{
                        color: "rgb(123, 128, 154)",
                        fontSize: "0.875rem",
                        fontWeight: 400,
                        width: "150px",
                      }}
                    >
                      Email of Person
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "6px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "rgb(52, 71, 103)",
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        marginRight: "20px",
                        width: "100px",
                      }}
                    >
                      Phone No:
                    </Typography>{" "}
                    <Typography
                      sx={{
                        color: "rgb(123, 128, 154)",
                        fontSize: "0.875rem",
                        fontWeight: 400,
                        width: "150px",
                      }}
                    >
                      PhoneNo of Person
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "6px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "rgb(52, 71, 103)",
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        marginRight: "20px",
                        width: "100px",
                      }}
                    >
                      Location:
                    </Typography>{" "}
                    <Typography
                      sx={{
                        color: "rgb(123, 128, 154)",
                        fontSize: "0.875rem",
                        fontWeight: 400,
                        width: "150px",
                      }}
                    >
                      location of Person
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "6px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "rgb(52, 71, 103)",
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        marginRight: "20px",
                        width: "100px",
                      }}
                    >
                      No of Likes:
                    </Typography>{" "}
                    <Typography
                      sx={{
                        color: "rgb(123, 128, 154)",
                        fontSize: "0.875rem",
                        fontWeight: 400,
                        width: "150px",
                      }}
                    >
                      Likes of Person
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ marginTop: "30px" }}>
                  {/* <Typography
                    sx={{
                      color: "rgb(52, 71, 103)",
                      fontWeight: 600,
                      lineHeight: 1.625,
                    }}
                  >
                    All News
                  </Typography> */}
                  <Box>
                    {/* <Grid
                      container
                      spacing={2}
                      rowSpacing={1}
                      columnSpacing={1}
                    >
                      {data1.TrendingNews.map((item1) => (
                        <Grid
                          width='100%'
                          item
                          key={item1._id}
                          sm={6}
                          md={4}
                          lg={3}
                        >
                          <SecDes trending={item1} />
                        </Grid> 
                    ))}
                     </Grid> */}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewAccount;
