import { Box, Typography } from "@mui/material";
import React from "react";
import emaillogo from "../Assets/emaillogo.png";
import { useLocation } from "react-router-dom";

const EmailConfirmation = () => {
  const { state } = useLocation();

  return (
    <Box
      sx={{
        backgroundColor: "#444444",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          backgroundColor: "white",
          padding: "53px 40px",
          borderRadius: "10px",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          width: "50%",
          color: "#898989",
        }}
      >
        <img src={emaillogo} alt='emaillogo' />
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "27px",
            color: "#3e3e3e",
            padding: "11px 0px",
          }}
        >
          Email Confirmation
        </Typography>
        <Typography
          sx={{ textAlign: "center", fontSize: "17px", paddingBottom: "20px" }}
        >
          We have sent email to{" "}
          <span style={{ color: "#32bf87" }}>{state}</span> to confirm the
          validity of email address. After receiving the email follow the link
          provided to complete your registration.
        </Typography>
        <Box sx={{ backgroundColor: "black", height: "2px" }}></Box>
        {/* <Typography
          sx={{ textAlign: "center", display: "flex", flexDirection: "row" }}
        >
          If you not got any mail&nbsp;
          <span style={{ color: "#138dea", cursor: "pointer" }}>
            Resend Confirmation mail
          </span>
        </Typography> */}
      </Box>
    </Box>
  );
};

export default EmailConfirmation;
