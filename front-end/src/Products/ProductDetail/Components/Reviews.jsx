import { Box, Rating, Typography } from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StarIcon from "@mui/icons-material/Star";

const Reviews = ({ key, username, review, rating }) => {
  return (
    <Box sx={{ width: "100%", padding: "25px 0px" }} key={key}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "71%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: "10px",
          }}
        >
          <AccountCircleIcon sx={{ color: "#878484", fontSize: "34px" }} />
          <Typography
            sx={{
              color: "#0F1111",
              fontWeight: 700,
              fontSize: "15px",
              paddingLeft: "7px",
            }}
          >
            {username}
          </Typography>
        </Box>
        <Box>
          <Rating
            name='text-feedback'
            value={rating}
            readOnly
            sx={{
              //   color: active ? "#faaf00" : "#adaaa8",
              fontSize: "22px",
              "&:hover": {
                color: "#faaf00",
              },
            }}
            precision={0.5}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />
            }
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", paddingTop: "10px" }}>
          <Typography
            sx={{
              color: "#0F1111",
              //   paddingLeft: "31px",
              fontSize: "16px",
              lineHeight: "20px",
            }}
          >
            {review}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Reviews;
