import { Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context";

const CheckAuth = ({ children }) => {
  const navigate = useNavigate();
  const { state } = useContext(GlobalContext);
  // console.log(state);
  // useEffect(() => {
  //   if (state.userInfo !== null) {
  //     navigate("/");
  //   } else {
  //     navigate("/signin");
  //   }
  // }, []);

  return <>{children}</>;
};

export default CheckAuth;
