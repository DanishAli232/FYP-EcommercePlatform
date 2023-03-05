import React from "react";
import styled from "styled-components";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const Container = styled.div`
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 36px;
  line-height: 46px;
  font-weight: 700;
  text-transform: capitalize;
  color: #3c3c40;
`;

const Desc = styled.div`
  font-size: 18px;
  line-height: 28px;
  color: var(--font-color);
  font-family: "Kumbh Sans", sans-serif;
`;

const InputContainer = styled.div`
  background: #f7f6f6;
  border: none;
  padding: 15px 15px;
  outline: none;
  color: #888;
  border-radius: 4px;
  border: none;
  border: 1px solid #e4e6ef;
`;
const Input = styled.input`
  background: #f7f6f6;
  border: none;
  padding: 15px 15px;
  outline: none;
  color: #888;
  border-radius: 4px;
  border: none;
  border: 1px solid #e4e6ef;
`;
const Button = styled.button`
  background-color: #f0353b;
  border-radius: 8px;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 20px;
  padding-left: 20px;
  padding-right: 20px;
`;
const Icon = styled.div`
  color: #d10000;
`;

const Newsletter = () => {
  return (
    <Container>
      <Icon></Icon>

      <Title>Get On The List</Title>
      <Desc>Get more updates of your desired product</Desc>
      <InputContainer>
        <Input placeholder='Your Email' />
        <Button>Subscribe</Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
