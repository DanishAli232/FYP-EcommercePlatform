import React, { useState } from "react";
import styled from "styled-components";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { vendorItems } from "../../data";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const Container = styled.div`
  display: flex;
  height: 60vh;

  background-color: white;
  margin: 10px;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    height: auto;
  }
`;
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 40px;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    margin: 0px;
  }
`;
const Vendor = styled.div`
  align-items: center;
  width: 49%;
  height: 260px;
  display: flex;
  position: relative;
  margin: 15px 20px 10px 20px;
  border-radius: 10px;
  @media (max-width: 768px) {
    width: 100%;
    height: 179px;
  }
`;
const Transparent = styled.div`
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  background-color: black;
  border-radius: 10px;

  opacity: 0.5;
`;
const ImageContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  position: absolute;
  border-radius: 10px;
`;
const Image = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 10px;
`;
const InfoContainer = styled.div`
  border-radius: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
`;
const Title = styled.h1`
  color: white;
  margin: 0px 0px 0px 20px;
  font-size: 28px;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;
const Button1 = styled.button`
  border: 1px solid white;
  cursor: pointer;
  border-radius: 5px;
  background: transparent;
  color: white;
  font-size: 21px;
  font-weight: 500;
  transition: 0.5s ease-in;
  width: 198px;
  margin: 9px 20px;
  padding: 15px 30px;
  display: flex;
  align-items: center;
  &:hover {
    background: #ef233c;
    border: #ef233c;
  }
  @media (max-width: 768px) {
    width: 156px;
    margin: 9px 22px;
    padding: 9px 10px;
    font-size: 15px;
  }
`;

const Vendors = () => {
  return (
    <Container>
      <Wrapper>
        <Vendor>
          <ImageContainer>
            <Image src='assets/images/khaadi.jpg' />
          </ImageContainer>
          <Transparent></Transparent>
          <InfoContainer>
            <Title>KHAADI</Title>
            <Button1>
              Shop Now
              <ArrowForwardIcon sx={{ marginLeft: "13px" }} />
            </Button1>
          </InfoContainer>
        </Vendor>

        <Vendor
          onMouseOver={() => {
            console.log("okk");
          }}
        >
          <ImageContainer>
            <Image src='assets/images/necklace.jpeg' />
          </ImageContainer>
          <Transparent></Transparent>
          <InfoContainer>
            <Title>LIME LIGHT</Title>
            <Button1>
              Shop Now <ArrowForwardIcon sx={{ marginLeft: "13px" }} />
            </Button1>
          </InfoContainer>
        </Vendor>
      </Wrapper>
    </Container>
  );
};

export default Vendors;
