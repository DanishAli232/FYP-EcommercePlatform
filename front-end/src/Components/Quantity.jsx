import RemoveIcon from "@mui/icons-material/Remove";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";

const Quantity = ({ qty, setqty }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "20px",
      }}
    >
      {qty === 1 ? (
        <RemoveIcon
          disabled
          sx={{
            marginRight: "10px",
            cursor: "pointer",
            backgroundColor: "#e1dede7a",
            "&:hover": {
              backgroundColor: "#b7a5a582",
            },
            fontSize: "20px",
          }}
        />
      ) : (
        <RemoveIcon
          sx={{
            marginRight: "10px",
            cursor: "pointer",
            backgroundColor: "#e1dede7a",
            "&:hover": {
              backgroundColor: "#b7a5a582",
            },
            fontSize: "20px",
          }}
          onClick={() => {
            setqty(qty - 1);
          }}
        />
      )}{" "}
      {qty}{" "}
      <AddIcon
        sx={{
          marginLeft: "10px",
          cursor: "pointer",
          backgroundColor: "#e1dede7a",
          "&:hover": {
            backgroundColor: "#b7a5a582",
          },
          fontSize: "20px",
        }}
        onClick={() => {
          setqty(qty + 1);
        }}
      />
    </Box>
  );
};

export default Quantity;
