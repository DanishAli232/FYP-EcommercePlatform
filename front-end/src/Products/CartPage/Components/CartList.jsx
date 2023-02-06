import { Checkbox, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Quantity from "../../../Components/Quantity";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const CartList = ({ title, image, storename, price }) => {
  console.log(title);
  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        marginTop: "15px",
        paddingY: "13px",
      }}
    >
      <Typography sx={{ paddingLeft: "13px" }}>{storename}</Typography>
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
          <Checkbox />
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
        <Box>
          <Typography sx={{ color: " #f57224" }}>Rs. {price}</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FavoriteBorderIcon
              sx={{
                color: "#757575",
                fontSize: "22px",
                cursor: "pointer",
              }}
            />
            <DeleteOutlineOutlinedIcon
              sx={{
                color: "#757575",
                paddingLeft: "8px",
                fontSize: "24px",
                cursor: "pointer",
              }}
            />
          </Box>
        </Box>
        <Box sx={{ paddingRight: "12px" }}>
          <Quantity />
        </Box>
      </Box>
    </Box>
  );
};

export default CartList;
