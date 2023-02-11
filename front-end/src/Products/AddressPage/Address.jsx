import { Box, Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { GlobalContext } from "../../Context";
import { Scrollbars } from "react-custom-scrollbars-2";

const AddressForm = () => {
  const { setAddressBoxOpen, setAddressFormOpen } = useContext(GlobalContext);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        // position: "absolute",
        top: 0,
        position: "fixed",
      }}
    >
      <Scrollbars style={{ width: "730px", height: "90%" }}>
        <Box
          sx={{
            // width: "730px",
            // height: "90%",
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
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                border: "0.5px solid #007787",
                width: "400px",
                padding: "10px",
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
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
                <Typography sx={{ fontSize: "15px" }}>
                  Muhammad Danish
                </Typography>
                <Button sx={{ fontSize: "13px" }}>Edit</Button>
              </Box>
              <Typography sx={{ fontSize: "13px" }}>
                (+92) 3420285429
              </Typography>
              <Typography sx={{ fontSize: "13px", marginTop: "5px" }}>
                Punjab,Sargodha,PAF Road, Gulshan Luqman Town 49 Tails Sargodha
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
                Home
              </Typography>
            </Box>
          </Box>
          <Box sx={{ position: "relative", height: "380px" }}>
            {" "}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
                position: "absolute",
                bottom: 0,
                width: "100%",
              }}
            >
              <Box
                onClick={() => {
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

              <Button
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
              </Button>
            </Box>
          </Box>
        </Box>
      </Scrollbars>
    </Box>
  );
};

export default AddressForm;
