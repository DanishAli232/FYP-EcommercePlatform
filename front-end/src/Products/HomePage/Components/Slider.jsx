import React, { useState } from "react";
import styled from "styled-components";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { sliderItems } from "../../data";
import { Box, Typography } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const Container = styled.div`
  height: 60vh;

  overflow: hidden;
  position: relative;

  @media (max-width: 480px) {
    height: 40vh;
  }
`;
const Wrapper = styled.div`
  height: 100%;
  width: 102%;
  display: flex;
  transition: opacity ease-in-out 0.4s;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;
const Slide = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;
`;
const ImgContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: inset 70px 70px 200px #000, inset -70px -70px 200px #000;
  justify-content: center;
  align-items: center;
  position: absolute;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Image = styled.img`
  height: 100%;
  width: 100vw;
`;
const Title = styled.h1`
  font-size: 45px;
  color: white;
  margin: 0px 0px;
  @media (max-width: 440px) {
    font-size: 28px;
  }
`;
const Desc = styled.p`
  margin: 10px 0px 30px 0px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  color: white;

  @media (max-width: 480px) {
    font-size: 8px;
  }
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: #f0353b;
  cursor: pointer;
  display: flex;
  letter-spacing: 3px;
  flex-direction: row;
  align-items: center;
  color: white;
  border: none;
  border-radius: 5px;
  &:hover {
    color: #fff;
    background-color: #d90429;
    border-color: #d90429;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const Arrow = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  position: absolute;
  opacity: 0.3;
  z-index: 3;
  cursor: pointer;
`;

export const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const Clickhandler = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Container>
        <Arrow direction='left' onClick={() => Clickhandler("left")}>
          <KeyboardArrowLeftIcon
            sx={{
              color: "white",
              fontSize: "35px",
              background: "#00000030",
              borderRadius: "8px",
              "&:hover": {
                background: "#0000009e",
              },
            }}
          />
        </Arrow>

        <Wrapper slideIndex={slideIndex}>
          {sliderItems.map((item) => (
            <Slide key={item.id}>
              <ImgContainer>
                <Image src={item.Image} />
              </ImgContainer>
              <InfoContainer>
                <Typography
                  sx={{
                    color: "#f0353b",
                    fontWeight: "bold",
                    fontSize: { md: "21px", xs: "18px" },
                  }}
                >
                  Up to 60% Off Now
                </Typography>
                {/* <Title>{item.title}</Title> */}
                <Title>Mid Season Sale 70%</Title>
                <Desc>Final Clearence: Take 20% Off 'Sale must haves'</Desc>
                <Button>
                  Start Shopping <ArrowRightAltIcon />
                </Button>
              </InfoContainer>
            </Slide>
          ))}
        </Wrapper>
        <Arrow direction='right' onClick={() => Clickhandler("right")}>
          <KeyboardArrowRightIcon
            sx={{
              color: "white",
              fontSize: "35px",
              background: "#00000030",
              borderRadius: "8px",
              "&:hover": {
                background: "#0000009e",
              },
            }}
          />
        </Arrow>
      </Container>
    </Box>
  );
};

export default Slider;
