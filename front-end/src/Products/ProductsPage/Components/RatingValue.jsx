import { Box, Rating } from "@mui/material";
import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";

const RatingValue = ({ value, ratingClick, active }) => {
  const [ratingColor, setRatingColor] = useState("23px");
  return (
    <Box
      onClick={() => {
        ratingClick(value);
      }}
      onMouseEnter={(e) => {
        if (!active) {
          setRatingColor("26px");
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          setRatingColor("23px");
        }
      }}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      {" "}
      <Rating
        name='text-feedback'
        value={value}
        readOnly
        sx={{
          color: active ? "#faaf00" : "#adaaa8",
          fontSize: ratingColor,
          "&:hover": {
            color: "#faaf00",
          },
        }}
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
      />
      <span
        style={{
          fontSize: "14px",
          color: active ? "#faaf00" : "#adaaa8",
          paddingLeft: "10px",
        }}
      >
        {value}
      </span>
    </Box>
  );
};

export default RatingValue;
