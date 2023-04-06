import { Box, Typography } from "@mui/material";
import React from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import axios from "axios";

const QA = ({
  key,
  comment,
  answer,
  username,
  productid,
  _id,
  fetchComments,
}) => {
  const deleteComment = async () => {
    await axios.patch(`/api/deletecomment/${productid}/${_id}`);
    fetchComments();
  };
  return (
    <Box sx={{ width: "100%", padding: "20px 0px" }} key={key}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { md: "71%", xs: "100%" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <Typography
            sx={{ color: "#0F1111", fontWeight: 700, fontSize: "15px" }}
          >
            Question:
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
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
              {username}
            </Typography>
          </Box>
          {/* <Box
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
          </Box> */}
        </Box>
        {answer && (
          <Box
            sx={{ display: "flex", flexDirection: "row", paddingTop: "10px" }}
          >
            <Typography
              sx={{ color: "#0F1111", fontWeight: 700, fontSize: "15px" }}
            >
              Answer:
            </Typography>
            <Typography
              sx={{
                color: "#0F1111",
                paddingLeft: "31px",
                fontSize: "16px",
                lineHeight: "20px",
              }}
            >
              {answer}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default QA;
