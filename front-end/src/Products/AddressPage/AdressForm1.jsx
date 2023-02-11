import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { GlobalContext } from "../../Context";

const AddressForm1 = () => {
  const { setAddressBoxOpen, setAddressFormOpen } = useContext(GlobalContext);
  const [AddressForm, setAddressForm] = useState({
    fullname: "",
    address: "",
    number: "",
    landmark: "",
    province: "",
    city: "",
    labelselect: "",
    area: "",
  });

  const handleChange = (event) => {
    setAddressForm({ ...AddressForm, [event.target.name]: event.target.value });
  };
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
      <Box
        sx={{
          width: "730px",
          height: "90%",
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
            boxShadow: "0 4px 16px rgb(0 0 0 / 4%)",
            padding: "13px",
          }}
        >
          <Typography sx={{ fontSize: "15px", color: "#1a1a1a" }}>
            Add new Delivery Adress
          </Typography>
          <CloseIcon
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setAddressBoxOpen(false);
              setAddressFormOpen(false);
            }}
          />
        </Box>
        <Box sx={{ padding: "13px" }}>
          {" "}
          <Box sx={{ marginTop: "20px" }}>
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
                  display: "flex",
                  flexDirection: "column",
                  width: "300px",
                }}
              >
                <label
                  htmlFor='fullname'
                  style={{
                    fontSize: "12px",
                    color: "#424242",
                    paddingBottom: "6px",
                  }}
                >
                  Full Name:
                </label>
                <input
                  style={{
                    border: "1px solid #e5e5e5",
                    borderRadius: "4px",
                    width: "100%",
                    height: "40px",
                    padding: "0 35px 0 10px",
                    outline: "none",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                  value={AddressForm.fullname}
                  placeholder='Input Full Name'
                  type='text'
                  name='fullname'
                  id='fullname'
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "300px",
                }}
              >
                {" "}
                <label
                  style={{
                    fontSize: "12px",
                    color: "#424242",
                    paddingBottom: "6px",
                  }}
                  htmlFor='number'
                >
                  Mobile Number:
                </label>
                <input
                  style={{
                    border: "1px solid #e5e5e5",
                    borderRadius: "4px",
                    width: "100%",
                    height: "40px",
                    padding: "0 10px 0 10px",
                    outline: "none",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                  value={AddressForm.mobileNo}
                  type='number'
                  name='number'
                  id='number'
                  pattern='[0-9]*'
                  placeholder='Input Mobile Number'
                  inputMode='numeric'
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{ marginTop: "20px" }}>
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
                  display: "flex",
                  flexDirection: "column",
                  width: "300px",
                }}
              >
                <label
                  htmlFor='landmark'
                  style={{
                    fontSize: "12px",
                    color: "#424242",
                    paddingBottom: "6px",
                  }}
                >
                  Landmark:
                </label>
                <input
                  style={{
                    border: "1px solid #e5e5e5",
                    borderRadius: "4px",
                    width: "100%",
                    height: "40px",
                    padding: "0 35px 0 10px",
                    outline: "none",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                  value={AddressForm.landmark}
                  placeholder='E.g. Front Mall, beside Train Station'
                  type='text'
                  name='landmark'
                  id='landmark'
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "300px",
                }}
              >
                {" "}
                <label
                  style={{
                    fontSize: "12px",
                    color: "#424242",
                    paddingBottom: "6px",
                  }}
                  htmlFor='address'
                >
                  Address:
                </label>
                <input
                  style={{
                    border: "1px solid #e5e5e5",
                    borderRadius: "4px",
                    width: "100%",
                    height: "40px",
                    padding: "0 35px 0 10px",
                    outline: "none",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                  value={AddressForm.address}
                  type='text'
                  name='address'
                  id='address'
                  placeholder='Input Address'
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{ marginTop: "20px" }}>
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
                  display: "flex",
                  flexDirection: "column",
                  width: "300px",
                }}
              >
                <label
                  htmlFor='province'
                  style={{
                    fontSize: "12px",
                    color: "#424242",
                    paddingBottom: "6px",
                  }}
                >
                  Province:
                </label>
                <input
                  style={{
                    border: "1px solid #e5e5e5",
                    borderRadius: "4px",
                    width: "100%",
                    height: "40px",
                    padding: "0 35px 0 10px",
                    outline: "none",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                  value={AddressForm.province}
                  placeholder='Input Province'
                  type='text'
                  name='province'
                  id='province'
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "300px",
                }}
              >
                {" "}
                <label
                  style={{
                    fontSize: "12px",
                    color: "#424242",
                    paddingBottom: "6px",
                  }}
                  htmlFor='city'
                >
                  City:
                </label>
                <input
                  style={{
                    border: "1px solid #e5e5e5",
                    borderRadius: "4px",
                    width: "100%",
                    height: "40px",
                    padding: "0 35px 0 10px",
                    outline: "none",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                  value={AddressForm.city}
                  type='text'
                  name='city'
                  id='city'
                  placeholder='Input City'
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{ marginTop: "20px" }}>
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
                  display: "flex",
                  flexDirection: "column",
                  width: "300px",
                }}
              >
                <label
                  htmlFor='area'
                  style={{
                    fontSize: "12px",
                    color: "#424242",
                    paddingBottom: "6px",
                  }}
                >
                  Area:
                </label>
                <input
                  style={{
                    border: "1px solid #e5e5e5",
                    borderRadius: "4px",
                    width: "100%",
                    height: "40px",
                    padding: "0 35px 0 10px",
                    outline: "none",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                  value={AddressForm.area}
                  placeholder='Input Area'
                  type='text'
                  name='area'
                  id='area'
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "300px",
                }}
              >
                {" "}
                <label
                  style={{
                    fontSize: "12px",
                    color: "#424242",
                    paddingBottom: "6px",
                  }}
                  htmlFor='number'
                >
                  Select Label for effictive Delivery:
                </label>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    sx={{
                      boxShadow: "0 2px 8px rgb(0 0 0 / 8%)",
                      width: "145px",
                      height: "40px",
                      border: "1px solid #e5e5e5",
                      textAlign: "center",
                      color: "#1a1a1a",
                    }}
                  >
                    Home
                  </Button>
                  <Button
                    sx={{
                      boxShadow: "0 2px 8px rgb(0 0 0 / 8%)",
                      width: "145px",
                      height: "40px",
                      border: "1px solid #e5e5e5",
                      textAlign: "center",
                      color: "#1a1a1a",
                    }}
                  >
                    Office
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ position: "relative", height: "225px" }}>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              marginLeft: "-8px",
            }}
          >
            {" "}
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
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddressForm1;
