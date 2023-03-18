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

    @media (max-width: 641px) {
      width: 90%;
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
        padding: "60px 13px",
        // width: "100%",
      }}
    >
      <MailOutlineIcon
        sx={{ color: "#ef233c", fontSize: "50px", marginBottom: "10px" }}
      />
      <Typography
        variant='h3'
        sx={{
          fontSize: { md: "36px", xs: "34px" },
          lineHeight: { md: "46px", xs: "34px" },
          fontWeight: 700,
          marginTop: { md: "0px", xs: "7px" },

          color: "#3c3c40",
          marginBottom: "5px",
        }}
      >
        Get On The List
      </Typography>
      <Typography
        variant='p'
        sx={{
          fontSize: { md: "18px", xs: "16px" },
          lineHeight: { md: "28px", xs: "26px" },
          color: "#888",
          marginTop: { md: "0px", xs: "7px" },

          textAlign: "center",
          fontFamily: '"Kumbh Sans", sans-serif',
        }}
      >
        Shop Exclusive Promos & SAVE 20% on Your First Order
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          alignItems: "center",
          justifyContent: "center",
          marginTop: { md: "0px", xs: "7px" },
          width: { md: "550px", xs: "100%" },
          height: { md: "60px", xs: "auto" },
          margin: "1rem 0px",
        }}
      >
        <Input type='text' placeholder='Your email here' />
        <Button
          sx={{
            color: "#fff",
            backgroundColor: "#ef233c",
            marginLeft: { md: "10px", xs: "0px" },
            padding: "13px 8px",
            marginTop: { md: "0px", xs: "7px" },
            border: "#ef233c",
            width: { sm: "auto", xs: "100%" },
            transition: "0.4s ease-in",
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
          fontSize: { md: "17px", xs: "16px" },
          width: { md: "516px", xs: "100%" },
          marginTop: { md: "0px", xs: "7px" },

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
