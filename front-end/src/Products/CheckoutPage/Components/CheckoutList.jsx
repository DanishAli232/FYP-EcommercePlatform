import { Checkbox, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Quantity from "../../../Components/Quantity";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const CheckoutList = ({
  title,
  image,
  storename,
  price,
  id,
  cartid,
  fetchData,
  quantity,
  setStatus,
  setseverity,
  setOpen,
  setmessage,
}) => {
  const DeleteItem = async () => {
    console.log("Delete");
    try {
      const { data } = await axios.patch(
        `/api/deletesingleitem?i=${id}&c=${cartid}`
      );
      if (data) {
        setOpen(true);
        setStatus(null);
        setmessage("Your Product Deleted Succussfully");
        setseverity("success");
        fetchData();
      }
    } catch (error) {
      setOpen(true);
      setStatus(null);
      setmessage("Something Went Wrong");
      setseverity("error");
    }
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
      <Typography sx={{}}>{storename}</Typography>
      <div
        style={{
          width: "99%",
          border: "1px solid #b3afaf29",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      ></div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {" "}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: { sm: "400px", xs: "100%" },
            alignItems: "center",
          }}
        >
          <img
            style={{
              width: "60px",
              height: "60px",
              objectFit: "cover",
              objectposition: "center",
            }}
            src={image}
            alt=''
          />
          <Typography
            sx={{
              paddingLeft: { sm: "12px", xs: "4px" },
              fontSize: "14px",
              color: "#212121",
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginRight: { sm: "auto", xs: "8px" },
          }}
        >
          <Typography
            sx={{ color: "#f0353b", fontSize: { sm: "auto", xs: "15px" } }}
          >
            Rs. {price}
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}
          >
            <Tooltip title='Delete' arrow>
              <Checkbox
                onClick={DeleteItem}
                {...label}
                icon={<DeleteOutlineOutlinedIcon />}
                checkedIcon={<DeleteOutlineOutlinedIcon />}
                sx={{
                  marginLeft: { sm: "auto", xs: "18px" },
                  // color: color,
                  // fontSize: "22px",
                  // cursor: "pointer",
                  // "&:hover": {
                  //   color: "red",
                  // },
                }}
              />
            </Tooltip>
          </Box>
        </Box>
        <Box sx={{ paddingRight: "12px" }}>
          <Typography
            sx={{ fontSize: "14px", color: "#212121", fontWeight: 400 }}
          >
            Qty: {quantity}
          </Typography>
        </Box>
      </Box>
      <div
        style={{
          width: "99%",
          border: "1px solid #b3afaf29",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      ></div>

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
            width: { md: "220px", xs: "106px" },
            padding: "10px",
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Typography sx={{ fontSize: "12px", color: " #007787" }}>
              Delivery Charges
            </Typography>
            <span
              style={{
                height: "15px",
                margin: "0px 8px",
                backgroundColor: "#007787",
                width: ".5px",
              }}
            ></span>
            <Typography sx={{ fontSize: "12px", color: " #007787" }}>
              Rs. 149
            </Typography>
          </Box>
          <Typography sx={{ fontSize: "13px" }}>
            Recieve in next five days
          </Typography>
        </Box>
        <Typography sx={{ color: "#f0353b", fontSize: "18px" }}>
          Rs. {price * quantity + 149}
        </Typography>
      </Box>
    </Box>
  );
};

export default CheckoutList;
