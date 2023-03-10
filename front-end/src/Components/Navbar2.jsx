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
`;

const Navbar2 = ({ title, title1 }) => {
  return (
    <Box sx={{ backgroundImage: `url(${img1})`, zIndex: 20 }}>
      <Box sx={{ backgroundColor: "#0000009c", padding: "2rem 69px" }}>
        <Box
          sx={{
            padding: "3rem 0px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
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
                fontSize: "20px",
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
              sx={{ fontWeight: 700, fontSize: "20px", color: "#fff" }}
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
