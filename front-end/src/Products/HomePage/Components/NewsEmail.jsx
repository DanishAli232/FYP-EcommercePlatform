import { Box, Button, Typography } from "@mui/material";
import React from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import styled from "styled-components";

const NewsEmail = () => {
  const Input = styled.input`
    background: #f7f6f6;
    border: none;
    padding: 15px 15px;
    outline: red;
    color: #888;
    width: 352px;
    font-size: 16px;
    border-radius: 4px;

    border: none;
    border: 1px solid #e4e6ef;
    &:focus {
      background: white;
      border: 1px solid red;
    }
  `;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        padding: "60px 0px",
      }}
    >
      <MailOutlineIcon
        sx={{ color: "#ef233c", fontSize: "50px", marginBottom: "10px" }}
      />
      <Typography
        variant='h3'
        sx={{
          fontSize: "36px",
          lineHeight: "46px",
          fontWeight: 700,
          color: "#3c3c40",
          marginBottom: "5px",
        }}
      >
        Get On The List
      </Typography>
      <Typography
        variant='p'
        sx={{
          fontSize: "18px",
          lineHeight: "28px",
          color: "#888",
          fontFamily: '"Kumbh Sans", sans-serif',
        }}
      >
        Shop Exclusive Promos & SAVE 20% on Your First Order
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "550px",
          height: "60px",
          margin: "1rem 0px",
        }}
      >
        <Input type='text' placeholder='Your email here' />
        <Button
          sx={{
            color: "#fff",
            backgroundColor: "#ef233c",
            marginLeft: "10px",
            padding: "13px 8px",
            border: "#ef233c",
            "&:hover": {
              background: "#d90429",
              border: "#d90429",
            },
          }}
        >
          Subscribe
        </Button>
      </Box>
      <Typography
        sx={{
          color: "#888",
          fontSize: "17px",
          width: "516px",
          textAlign: "center",
        }}
        variant='p'
      >
        By entering your email, you are accepting our{" "}
        <span style={{ color: "#ef233c" }}>Terms of Use</span> and{" "}
        <span style={{ color: "#ef233c" }}>Privacy Policy</span>.
      </Typography>
    </Box>
  );
};

export default NewsEmail;
