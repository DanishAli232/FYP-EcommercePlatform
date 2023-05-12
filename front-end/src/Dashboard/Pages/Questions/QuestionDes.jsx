import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import axios from "axios";
import QuestionDes1 from "./QuestionDes1";

const QuestionDes = ({
  image,
  name,
  comments,
  key,
  _id,
  status,
  setopen,
  setmessage,
  fetchQuestions,
  setstatus,
}) => {
  return (
    <Box sx={{ marginTop: "30px" }} key={key}>
      <Box sx={{ textAlign: "center", width: "100px" }}>
        <img
          src={image}
          alt=''
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
      {comments.map((item1, i) => (
        <QuestionDes1
          {...item1}
          id1={_id}
          key1={i}
          status={status}
          setstatus={setstatus}
          setopen={setopen}
          setmessage={setmessage}
          fetchQuestions={fetchQuestions}
        />
      ))}
    </Box>
  );
};

export default QuestionDes;
