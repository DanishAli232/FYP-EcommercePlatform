import RemoveIcon from "@mui/icons-material/Remove";
import React, { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { GlobalContext } from "../Context";

const Quantity = ({ qty, setqty, id, cartid, fetchData }) => {
  const [getdata, setdata] = useState({});
  const HandleClick = async (value) => {
    setqty(value);
    const { data } = await axios.patch(
      `/api/updatequantity?i=${id}&c=${cartid}`,
      {
        quantity: value,
      }
    );
    if (data) {
      fetchData();
    }
    console.log(data);
    setdata(getdata);
  };

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
            HandleClick(qty - 1);
            // setqty(qty - 1);
          }}
        />
      )}
      {qty}
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
          HandleClick(qty + 1);
          // setqty(qty + 1);
        }}
      />
    </Box>
  );
};

export default Quantity;
