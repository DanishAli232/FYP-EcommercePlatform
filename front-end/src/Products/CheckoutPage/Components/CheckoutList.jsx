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
}) => {
  const DeleteItem = async () => {
    console.log("Delete");
    const { data } = await axios.patch(
      `/api/deletesingleitem?i=${id}&c=${cartid}`
    );
    if (data) {
      fetchData();
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
            width: "400px",
            alignItems: "center",
          }}
        >
          <img style={{ width: "60px", height: "60px" }} src={image} alt='' />
          <Typography
            sx={{
              paddingLeft: "12px",
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
          }}
        >
          <Typography sx={{ color: " #f57224" }}>Rs. {price}</Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}
          >
            <Tooltip title='Delete' arrow>
              <Checkbox
                onClick={DeleteItem}
                {...label}
                icon={<DeleteOutlineOutlinedIcon />}
                checkedIcon={<DeleteOutlineOutlinedIcon />}
                sx={
                  {
                    // color: color,
                    // fontSize: "22px",
                    // cursor: "pointer",
                    // "&:hover": {
                    //   color: "red",
                    // },
                  }
                }
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
            width: "220px",
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
            Recieve by 8 Feb-11 Feb
          </Typography>
        </Box>
        <Typography sx={{ color: "#f57224", fontSize: "18px" }}>
          Rs. {price * quantity + 150}
        </Typography>
      </Box>
    </Box>
  );
};

export default CheckoutList;
