import { Box, Typography } from "@mui/material";
import React from "react";
import img1 from "../Assets/watch2.jpg";
import styled from "styled-components";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
const Title = styled.h2`
  font-size: 34px;
  line-height: 44px;
  font-weight: 700;
  text-transform: capitalize;
  color: #fff;
  @media (max-width: 600px) {
    font-size: 26px;
    line-height: 21px;
  }
`;

const Navbar2 = ({ title, title1 }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${img1})`,
        zIndex: 20,
        backgroundPosition: "top",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#0000009c",
          padding: { md: "2rem 69px", xs: "1rem 13px" },
        }}
      >
        <Box
          sx={{
            padding: { md: "3rem 0px", xs: "2rem 0px" },
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            alignItems: { md: "center", xs: "flex-start" },
            justifyContent: { md: "space-between", xs: "" },
          }}
        >
          <Title>{title}</Title>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { md: "20px", xs: "16px" },
                color: " #f0353b",
                paddingRight: "7px",
              }}
            >
              {title1}
            </Typography>
            <KeyboardDoubleArrowRightIcon
              sx={{ color: "white", paddingRight: "7px" }}
            />
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { md: "20px", xs: "16px" },
                color: "#fff",
              }}
            >
              {title}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar2;
