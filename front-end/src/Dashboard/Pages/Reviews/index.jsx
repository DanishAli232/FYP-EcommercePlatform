import {
  Box,
  Button,
  CircularProgress,
  Rating,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../Context";

const ReviewList = ({ image, name, product, setOpen, setmessage }) => {
  const [status, setstatus] = useState(false);
  const { state } = useContext(GlobalContext);
  const [value, setValue] = useState(0);
  const [answer, setanswer] = useState("");

  useEffect(() => {
    console.log(value);
  }, [value]);

  const postReview = async () => {
    setstatus(true);
    try {
      let data0 = { username: state?.userInfo?.user?.name, answer, value };
      let data = await axios.post(
        `/api/postreview?id=${product}&&uid=${state?.userInfo?.user?._id}`,
        data0
      );
      if (data) {
        setstatus(false);
        setOpen(true);
        setmessage("Review Submitted");
      }
    } catch (error) {
      setstatus(false);
      setOpen(true);
      setmessage("Something Went Wrong");
    }
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
        <Rating
          name='simple-controlled'
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
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
          {status && <CircularProgress size='20px' sx={{ color: "white" }} />}
        </Button>
      </Box>
    </Box>
  );
};

export default ReviewList;
