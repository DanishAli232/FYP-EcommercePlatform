import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { GlobalContext } from "../../Context";

const AddressForm1 = ({ setStatus, setOpen, setmessage, setseverity }) => {
  const {
    setAddressBoxOpen,
    setAddressFormOpen,
    state,
    dispatch: ctxDispatch,
    setadddress,
    adddress,
    DefaultAddress,
    setDefaultAddress,
    newAddress,
  } = useContext(GlobalContext);
  const [AddressForm, setAddressForm] = useState({
    fullname: "",
    address: "",
    number: "",
    landmark: "",
    province: "",
    city: "",
    labelselect: "Home",
    area: "",
    userid: state.userInfo.user._id,
  });
  const [color, setcolor] = useState({
    home: "#e5e5e5",
    office: "white",
  });

  useEffect(() => {
    console.log(adddress);
    if (state.shippingAddress) {
      if (newAddress) {
      } else {
        console.log(adddress);
        const number = parseInt(adddress.addresslist.mobilenumber);
        setAddressForm({
          fullname: adddress.addresslist.fullname,
          address: adddress.addresslist.address,
          number: number,
          landmark: adddress.addresslist.landmark,
          province: adddress.addresslist.province,
          city: adddress.addresslist.city,
          labelselect: adddress.addresslist.labelselect,
          area: adddress.addresslist.area,
          userid: state.userInfo.user._id,
        });
      }
    }
  }, []);

  const handleChange = (event) => {
    setAddressForm({ ...AddressForm, [event.target.name]: event.target.value });
  };
  const SubmitAddress = async () => {
    if (
      !AddressForm.fullname ||
      !AddressForm.address ||
      !AddressForm.number ||
      !AddressForm.landmark ||
      !AddressForm.province ||
      !AddressForm.city ||
      !AddressForm.area
    ) {
      setOpen(true);
      setStatus(null);
      setmessage("Fields are empty");
      setseverity("error");
      return;
    }
    if (state.shippingAddress) {
      if (newAddress) {
        setStatus("loading");
        try {
          const { data } = await axios.patch(
            `/api/postnewaddress/${state.shippingAddress.data.addressId}`,
            AddressForm
          );
          console.log(data);
          setOpen(true);
          setStatus(null);
          setmessage("New Address Added");
          setseverity("success");
          window.location.reload();
        } catch (error) {
          setOpen(true);
          setStatus(null);
          setmessage("something Went Wrong");
          setseverity("error");
        }
      } else {
        try {
          const { data } = await axios.patch(
            `/api/updateaddress/${adddress.addresslist._id}/${state.shippingAddress.data.addressId}`,
            AddressForm
          );
          setDefaultAddress(AddressForm);
          setOpen(true);
          setStatus(null);
          setmessage("Your Address Updated");
          setseverity("success");
          window.location.reload();
        } catch (error) {
          setOpen(true);
          setStatus(null);
          setseverity("error");
          setmessage("Something Went Wrong");
        }
      }
    } else {
      try {
        const { data } = await axios.post("/api/postaddress", AddressForm);
        ctxDispatch({
          type: "SAVE_SHIPPING_ADDRESS",
          payload: {
            data,
          },
        });
        // setDefaultAddress(data);
        setOpen(true);
        setStatus(null);
        setmessage("Your Address added");
        setseverity("success");
      } catch (error) {
        console.log(error);
        setOpen(true);
        setStatus(null);
        setseverity("error");
        setmessage("Something Went Wrong");
      }
    }
  };

  const labelselect = (data) => {
    setAddressForm({ ...AddressForm, labelselect: data });
    if (data === "Home") {
      setcolor({ home: "#e5e5e5", office: "white" });
    } else {
      setcolor({ home: "white", office: "#e5e5e5" });
    }
  };

  return (
    <Box>
      <Box sx={{ height: "80px" }}></Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "88%",
          // position: "absolute",
          top: 0,
          position: "fixed",
          marginTop: "80px",
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
                    value={AddressForm.number}
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
                      onClick={() => {
                        labelselect("Home");
                      }}
                      sx={{
                        boxShadow: "0 2px 8px rgb(0 0 0 / 8%)",
                        width: "145px",
                        height: "40px",
                        border: "1px solid #e5e5e5",
                        textAlign: "center",
                        color: "#1a1a1a",
                        backgroundColor: color.home,
                      }}
                    >
                      Home
                    </Button>
                    <Button
                      onClick={() => {
                        labelselect("Office");
                      }}
                      sx={{
                        boxShadow: "0 2px 8px rgb(0 0 0 / 8%)",
                        width: "145px",
                        height: "40px",
                        border: "1px solid #e5e5e5",
                        textAlign: "center",
                        color: "#1a1a1a",
                        backgroundColor: color.office,
                      }}
                    >
                      Office
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ position: "relative", height: "146px" }}>
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
                onClick={SubmitAddress}
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
    </Box>
  );
};

export default AddressForm1;
