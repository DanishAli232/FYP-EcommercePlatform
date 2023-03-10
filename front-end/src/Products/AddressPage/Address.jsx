import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { GlobalContext } from "../../Context";
import { Scrollbars } from "react-custom-scrollbars-2";
import AddressList from "./Components/AddressList";

const AddressForm = (props) => {
  const {
    setAddressBoxOpen,
    setAddressFormOpen,
    addresslist,
    newAddress,
    setnewAddress,
  } = useContext(GlobalContext);
  console.log(addresslist);

  return (
    <Box>
      {/* <Box sx={{ height: "80px" }}></Box> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "88%",
          // position: "absolute",
          top: 0,
          marginTop: "80px",
          position: "fixed",
        }}
      >
        <Scrollbars style={{ width: "730px", height: "90%" }}>
          <Box
            sx={{
              // width: "730px",
              minHeight: "95%",
              backgroundColor: "white",
              border: "1px solid black",
              padding: "10px",
              overflowY: "auto",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "13px",
                boxShadow: "0 4px 16px rgb(0 0 0 / 4%)",
              }}
            >
              <Typography sx={{ fontSize: "15px", color: "#1a1a1a" }}>
                My Delivery Adress
              </Typography>
              <CloseIcon
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setAddressBoxOpen(false);
                }}
              />
            </Box>
            {/* <div
          style={{
            width: "99%",
            border: "1px solid #b3afaf29",
            marginTop: "10px",
            marginBottom: "5px",
          }}
        ></div> */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {addresslist.map((list, i) => (
                <AddressList {...list} key={i} {...props} />
              ))}
            </Box>
            <Box sx={{ marginTop: "80px" }}>
              {" "}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  position: "absolute",
                  bottom: 0,
                  width: "95%",
                  paddingBottom: "20px",
                  marginTop: "30px",
                }}
              >
                <Box
                  onClick={() => {
                    setnewAddress(true);
                    setAddressFormOpen(true);
                    setAddressBoxOpen(false);
                  }}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  {" "}
                  <AddIcon
                    sx={{
                      fontSize: "15px",
                      marginRight: "6px",
                      color: "#f85606",
                    }}
                  />
                  <Typography sx={{ fontSize: "12px", color: "#1a1a1a" }}>
                    Add New Address
                  </Typography>
                </Box>

                {/* <Button
                sx={{
                  fontSize: "12px",
                  background: "#f85606",
                  color: "white",
                  width: "100px",
                  "&:hover": {
                    background: "#f85606",
                  },
                }}
              >
                Confirm
              </Button> */}
              </Box>
            </Box>
          </Box>
        </Scrollbars>
      </Box>
    </Box>
  );
};

export default AddressForm;
