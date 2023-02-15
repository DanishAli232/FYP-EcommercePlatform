import { Box, Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import { GlobalContext } from "../../../Context";

const Address = () => {
  const { setAddressBoxOpen, setAddressFormOpen } = useContext(GlobalContext);
  const openAdressBox = () => {
    setAddressBoxOpen(true);
  };
  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        marginTop: "15px",
        padding: "13px",
      }}
    >
      <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#1a1a1a" }}>
        Deliver to: Muhammad Danish
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {" "}
        <Typography
          sx={{
            fontSize: "12px",
            color: "#007787",
            padding: "2px 6px",
            background: "rgba(0,119,135,.08)",
          }}
        >
          Home
        </Typography>
        <span
          style={{
            height: "19px",
            margin: "0px 8px",
            backgroundColor: "#e5e5e5",
            width: ".5px",
          }}
        ></span>
        <Typography sx={{ fontSize: "12px", color: "#1a1a1a" }}>
          +923420285429
        </Typography>
        <span
          style={{
            height: "19px",
            margin: "0px 8px",
            backgroundColor: "#e5e5e5",
            width: ".5px",
          }}
        ></span>
        <Typography
          sx={{
            fontSize: "12px",
            color: "#1a1a1a",
          }}
        >
          Gulshan luqman town 49 tails sargodha, PAF Road, Sargodha, Punjab
        </Typography>
        <Button
          onClick={() => {
            setAddressFormOpen(true);
          }}
          sx={{ fontSize: "12px" }}
        >
          Change
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "12px" }}>Bill To Same Address</Typography>
        <Button sx={{ fontSize: "12px" }} onClick={openAdressBox}>
          Edit
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "12px" }}>
          Email To: baclohdanish2020@gmail.com
        </Typography>
        <Button sx={{ fontSize: "12px" }}>Edit</Button>
      </Box>
    </Box>
  );
};

export default Address;