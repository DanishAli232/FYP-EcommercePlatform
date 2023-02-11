import React, { useState } from "react";
import styled from "styled-components";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { sliderItems } from "../../data";

const Container = styled.div`
  height: 80vh;
  width: 100vw;
  margin-top: 30px;
  overflow: hidden;
  position: relative;
`;
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
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
`;
const Image = styled.img`
  height: 100%;
  width: 100vw;
`;
const Title = styled.h1`
  font-size: 50px;
  color: white;
  padding-top: 40px;
`;
const Desc = styled.p`
  margin: 40px 0px;
  font-size: 22px;
  letter-spacing: 3px;
  color: white;
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: #f0353b;
  cursor: pointer;
  color: white;
  border: none;
  border-radius: 5px;
`;

const Arrow = styled.div`
  background-color: white;
  height: 50px;
  width: 50px;
  border-radius: 50%;
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
    <Container>
      <Arrow direction='left' onClick={() => Clickhandler("left")}>
        <ArrowLeftIcon />
      </Arrow>

      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide key={item.id}>
            <ImgContainer>
              <Image src={item.Image} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.Desc}</Desc>
              <Button>Happy Shopping</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction='right' onClick={() => Clickhandler("right")}>
        <ArrowRightIcon />
      </Arrow>
    </Container>
  );
};

export default Slider;
