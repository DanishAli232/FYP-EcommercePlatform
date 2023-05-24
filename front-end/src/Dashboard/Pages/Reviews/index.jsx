import { Box, Button, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../Context";

const ReviewList = ({ image, name, status, _id }) => {
  const { state } = useContext(GlobalContext);
  const [answer, setanswer] = useState("");

  const postReview = async () => {
    let data0 = { username: name, answer };
    let data = await axios.post(
      `/api/postreview?id=${_id}&&uid=${state?.userInfo?.user?._id}`,
      data0
    );
    console.log(data);
  };

  return (
    <Box sx={{ marginTop: "30px" }}>
      <Box sx={{ textAlign: "center", width: "100px" }}>
        <img
          src={image}
          alt={name}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "4px",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <Typography>{name}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          marginTop: "30px",
        }}
      >
        <span style={{ width: "58%" }}>
          <input
            type='text'
            value={answer}
            onChange={(event) => {
              setanswer(event.target.value);
            }}
            placeholder='Write your Review'
            style={{
              width: " 96%",
              padding: "9px 0px 9px 14px",
              outline: "none",
              color: "#9e9e9e",
              border: "1px solid #cdc6c6",
            }}
          />
        </span>
        <Button
          onClick={postReview}
          sx={{
            background: "#f0353b",
            transition: "0.3s ease-in",
            width: "146px",
            color: "white",
            "&:hover": {
              background: "#d90429",
            },
          }}
        >
          Answer
          {status && <CircularProgress size='20px' sx={{ color: "#f57224" }} />}
        </Button>
      </Box>
    </Box>
  );
};

export default ReviewList;
