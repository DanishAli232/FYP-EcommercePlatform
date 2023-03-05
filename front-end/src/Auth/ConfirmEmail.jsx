import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import emaillogo from "../Assets/emaillogo.png";
import { useNavigate, useParams } from "react-router-dom";

const ConfirmEmail = () => {
  let { id, token } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    console.log({ id, token });
    const updateData = async () => {
      let data = await axios.get(`/api/${id}/verify/${token}`);
      console.log(data);
    };
    // updateData();
  }, []);

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
            // color: "#3e3e3e",
            padding: "11px 0px",
            color: "#32bf87",
          }}
        >
          Your Registration is Complete
        </Typography>
        <Typography
          sx={{ textAlign: "center", fontSize: "17px", paddingBottom: "10px" }}
        >
          Follow this link to go to Shopping Page
        </Typography>
        <Box sx={{ backgroundColor: "black", height: "2px" }}></Box>
        <Typography
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "row",
            color: "#138dea",
          }}
        >
          <Button
            sx={{ fontSize: "13px", fontWeight: 700, color: "#32bf87" }}
            onClick={() => {
              navigate("/");
            }}
          >
            Home Screen
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default ConfirmEmail;
