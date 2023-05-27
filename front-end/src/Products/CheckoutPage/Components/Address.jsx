import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../Context";

const Address = () => {
  let defaultA;
  const {
    setAddressBoxOpen,
    setAddressFormOpen,
    setaddresslist,
    dispatch: ctxDispatch,
    DefaultAddress,
    setDefaultAddress,
    setnewAddress,
    fetchAddresses,
    state,
    setadddress,
    adddress,
  } = useContext(GlobalContext);
  const [EmailInput, setEmailInput] = useState(false);
  const [InputChange, setInputChange] = useState({
    email: state.userInfo.user.email,
  });

  const openAdressBox = () => {
    setAddressBoxOpen(true);
  };
  defaultA = { ...DefaultAddress };
  // console.log(defaultA);
  useEffect(() => {
    fetchAddresses();
    // console.log(DefaultAddress);
    // console.log(defaultA);
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        marginTop: "20px",
        padding: "13px",
      }}
    >
      {DefaultAddress.length !== 0 && (
        <Box sx={{}}>
          <Typography
            sx={{ fontSize: "14px", fontWeight: 500, color: "#1a1a1a" }}
          >
            Deliver to: {DefaultAddress.fullname}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: {
                sm: "auto",
                xs: "100%",
              },
              overflow: { sm: "none", xs: "hidden" },
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
              {DefaultAddress.labelselect}
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
              {DefaultAddress.mobilenumber}
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
              {`${DefaultAddress.address},${DefaultAddress.city},${DefaultAddress.province}`}
            </Typography>
            <Button
              onClick={() => {
                setnewAddress(false);
                setAddressFormOpen(true);
                setadddress({ ...adddress, addresslist: defaultA });
              }}
              sx={{ fontSize: "12px" }}
            >
              Change
            </Button>
          </Box>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {DefaultAddress.length !== 0 ? (
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Typography sx={{ fontSize: "12px" }}>
              Bill To Same Address
            </Typography>
            <Button sx={{ fontSize: "12px" }} onClick={openAdressBox}>
              Edit
            </Button>
          </Box>
        ) : (
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Typography sx={{ fontSize: "12px" }}>
              Add your new Address
            </Typography>
            <Button
              sx={{ fontSize: "12px" }}
              onClick={() => {
                setnewAddress(true);
                setAddressFormOpen(true);
              }}
            >
              Edit
            </Button>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          Email To:
          {EmailInput ? (
            <>
              <input
                style={{ marginLeft: "8px", outline: "none", padding: "5px" }}
                type='text'
                name='email'
                onChange={(event) => {
                  setInputChange(() => ({
                    ...InputChange,
                    [event.target.name]: event.target.value,
                  }));
                }}
                value={InputChange.email}
              />
            </>
          ) : (
            <p style={{ marginLeft: "10px" }}>{InputChange.email}</p>
          )}
        </Typography>
        {EmailInput ? (
          <Button
            sx={{ fontSize: "12px" }}
            onClick={() => setEmailInput(false)}
          >
            Save
          </Button>
        ) : (
          <Button sx={{ fontSize: "12px" }} onClick={() => setEmailInput(true)}>
            Edit
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Address;
