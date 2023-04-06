import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import axios from "axios";
import { LoadingBox } from "../../Components";

const QuestionDes1 = ({
  username,
  comment,
  answer: answer1,
  id1,
  key1,
  status,
  setstatus,
  setopen,
  fetchQuestions,

  setmessage,
  _id,
}) => {
  const [answer, setanswer] = useState(answer1);

  const deleteComment = async () => {
    try {
      await axios.patch(`/api/deletecomment/${id1}/${_id}`);
      fetchQuestions();
      setmessage("Question Deleted");
      setopen(true);
    } catch (error) {
      setmessage("Something Went Wrong");
      setopen(true);
    }

    // fetchComments();
  };

  const postanswer = async () => {
    console.log("yes");
    setstatus(true);
    try {
      const { data } = await axios.post(`/api/postanswer/${id1}/${_id}`, {
        answer,
      });
      setstatus(false);
      setmessage("Your Answer Submitted");
      setopen(true);
    } catch (error) {
      setmessage("Something Went Wrong");
      setopen(true);
    }
  };
  return (
    <Box key={key1}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginTop: "20px",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "82%",
            alignItems: "flex-start",
          }}
        >
          <Typography
            sx={{
              color: "#0F1111",
              fontWeight: 700,
              fontSize: "15px",
            }}
          >
            Question:
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                color: "#007185",
                width: "97%",
                paddingLeft: "19px",
                fontSize: "16px",
                lineHeight: "20px",
              }}
            >
              {comment}?
            </Typography>
            <Typography
              sx={{
                color: "#9e9e9e",
                paddingLeft: "19px",
                fontSize: "12px",
                lineHeight: "20px",
              }}
            >
              {/* {username} */}
              {username}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {" "}
            <DeleteOutlineOutlinedIcon
              onClick={deleteComment}
              sx={{
                cursor: "pointer",
                color: "#7a7b7c",
                "&:hover": {
                  color: "#e73f3f",
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          paddingTop: "10px",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "#0F1111",
            fontWeight: 700,
            fontSize: "15px",
          }}
        >
          Answer:
        </Typography>
        <span style={{ width: "58%", marginLeft: "30px" }}>
          <input
            type='text'
            value={answer}
            onChange={(event) => {
              setanswer(event.target.value);
            }}
            placeholder='Write your Answer'
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
          onClick={postanswer}
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
        {/* <Typography
    sx={{
      color: "#0F1111",
      paddingLeft: "31px",
      fontSize: "16px",
      lineHeight: "20px",
    }}
  >
    {/* {answer} I Don't Know
  </Typography> */}
      </Box>
    </Box>
  );
};

export default QuestionDes1;
