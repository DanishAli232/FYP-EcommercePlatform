import React, { useState } from "react";
import styled from "styled-components";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { vendorItems } from "../../data";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const Container = styled.div`
  display: flex;
  height: 60vh;
  width: 100vw;
  background-color: white;
  margin: 10px;
  overflow: hidden;
  position: relative;
`;
const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  margin: 40px;
`;
const Vendor = styled.div`
  align-items: center;
  width: 49%;
  height: 80%;
  display: flex;
  position: relative;
  margin: 15px 20px 10px 20px;
  border-radius: 10px;
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
  position: absolute;
`;
const Title = styled.h1`
  color: white;
  margin-top: 50px;
`;
const Button1 = styled.button`
  border: 1px solid white;
  border-radius: 5px;
  background: transparent;
  color: white;
  font-size: 25px;
  font-weight: 500;
  margin: 20px;
  padding: 15px 35px 15px 35px;
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
              <ArrowForwardIcon />
            </Button1>
          </InfoContainer>
        </Vendor>
        <Vendor>
          <ImageContainer>
            <Image src='assets/images/necklace.jpeg' />
          </ImageContainer>
          <Transparent></Transparent>
          <InfoContainer>
            <Title>LIME LIGHT</Title>
            <Button1>
              Shop Now <ArrowForwardIcon />
            </Button1>
          </InfoContainer>
        </Vendor>
      </Wrapper>
    </Container>
  );
};

export default Vendors;
