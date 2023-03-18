import { CircularProgress } from "@mui/material";
import React from "react";

const LoadingBox = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        // backgroundColor: "white",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default LoadingBox;
