import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Box } from "@mui/material";

const Rating = (props) => {
  const { Rating, numReviews } = props;
  return (
    <Box
      className='rating'
      sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Box>
        {" "}
        <span>
          {Rating >= 1 ? (
            <StarIcon />
          ) : Rating >= 0.5 ? (
            <StarHalfIcon />
          ) : (
            <StarBorderIcon />
          )}
        </span>
        <span>
          {Rating >= 2 ? (
            <StarIcon />
          ) : Rating >= 1.5 ? (
            <StarHalfIcon />
          ) : (
            <StarBorderIcon />
          )}
        </span>
        <span>
          {Rating >= 3 ? (
            <StarIcon />
          ) : Rating >= 2.5 ? (
            <StarHalfIcon />
          ) : (
            <StarBorderIcon />
          )}
        </span>
        <span>
          {Rating >= 4 ? (
            <StarIcon />
          ) : Rating >= 3.5 ? (
            <StarHalfIcon />
          ) : (
            <StarBorderIcon />
          )}
        </span>
        <span>
          {Rating >= 5 ? (
            <StarIcon />
          ) : Rating >= 4.5 ? (
            <StarHalfIcon />
          ) : (
            <StarBorderIcon />
          )}
        </span>
      </Box>

      <span style={{ marginLeft: "10px", position: "relative", top: "-3px" }}>
        {numReviews} Reviews
      </span>
    </Box>
  );
};

export default Rating;
