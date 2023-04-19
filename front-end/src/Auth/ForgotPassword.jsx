import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import emaillogo from "../Assets/emaillogo.png";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../Context";

const ForgotPassword = () => {
  const { state, dispatch: ctxDispatch } = useContext(GlobalContext);
  let { id, token } = useParams();
  const [verify, setverify] = useState(false);
  const navigate = useNavigate();
  const [message, setmessage] = useState("");
  useEffect(() => {
    console.log({ id, token });
    const updateData = async () => {
      try {
        let { data } = await axios.get(`/api/${id}/verify2/${token}`);
        console.log(data);
        setverify(true);
        setmessage("Now you can change your password");
      } catch (error) {
        setverify(false);
        setmessage("Invalid Link");
      }
    };
    updateData();
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
          {message}
        </Typography>
        <Typography
          sx={{ textAlign: "center", fontSize: "17px", paddingBottom: "10px" }}
        >
          {verify
            ? "Follow this link to go to Change Password Page"
            : "Go to Home Page"}
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
          {verify ? (
            <Button
              sx={{ fontSize: "13px", fontWeight: 700, color: "#32bf87" }}
              onClick={() => {
                navigate(`/changepassword/${id}`);
              }}
            >
              Change Password
            </Button>
          ) : (
            <Button
              sx={{ fontSize: "13px", fontWeight: 700, color: "#32bf87" }}
              onClick={() => {
                navigate("/");
              }}
            >
              Home Page
            </Button>
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
