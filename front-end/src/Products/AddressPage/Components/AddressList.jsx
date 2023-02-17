import { Box, Button, Typography } from "@mui/material";
import React from "react";

const AddressList = ({
  fullname,
  address,
  mobilenumber,
  landmark,
  province,
  city,
  labelselect,
  area,
  isDefault,
}) => {
  return (
    <Box
      sx={{
        border: "0.5px solid #007787",
        width: "400px",
        padding: "10px",
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        boxShadow: isDefault ? "2px 1px 5px 0px #007787" : "",
        "&:hover": {
          boxShadow: "2px 1px 5px 0px #007787",
        },
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: "15px" }}>{fullname}</Typography>
        <Button sx={{ fontSize: "13px" }}>Edit</Button>
      </Box>
      <Typography sx={{ fontSize: "13px" }}>{mobilenumber}</Typography>
      <Typography sx={{ fontSize: "13px", marginTop: "5px" }}>
        {`${province},${city},${landmark},${address}`}
      </Typography>
      <Typography
        sx={{
          fontSize: "12px",
          color: "#007787",
          padding: "2px 6px",
          width: "35px",
          background: "rgba(0,119,135,.08)",
          marginTop: "10px",
        }}
      >
        {labelselect}
      </Typography>
    </Box>
  );
};

export default AddressList;
