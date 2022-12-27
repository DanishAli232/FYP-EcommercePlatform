import { Box, Grid } from "@mui/material";
import React from "react";
import { Navbar } from "../Components";

const Dashboard = () => {
  return (
    <Box sx={{ backgroundColor: "rgb(240,242,245)", minHeight: "100vh" }}>
      <Grid container>
        <Grid item md={2}></Grid>
        <Grid item md={10}>
          <Navbar />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
