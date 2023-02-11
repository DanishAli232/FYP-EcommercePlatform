import React from 'react';
import styled from 'styled-components';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const Container = styled.div`
height: 60vh;
display:flex;
align-items: center;
justify-content: center;
background-color: white;
flex-direction: column;
`;
const Title = styled.h1`
font-size: 40px;
margin: 20px;
`;

const Desc = styled.div`
font-size:25px;
margin-bottom:20px;
font-weight: 400;

`;

const InputContainer = styled.div`

width: 45%;
height: 70px;
background-color: white;
display: flex;
justify-content: space-between;
border-radius: 8px;

`;
const Input = styled.input`
border: 1px solid lightgray;
border-radius: 8px;
margin-right: 10px;
padding: 20px;
font-size: 20px;
width: 100%;
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
    color: #D10000;
    
`


const Newsletter = () => {
  return (
    <Container>
        <Icon>
            <MailOutlineIcon/>
        </Icon>
        
        <Title>Get On The List</Title>
        <Desc>Get more updates of your desired product</Desc>
        <InputContainer>
            <Input placeholder='Your Email'/>
            <Button>
                Subscribe
            </Button>
        </InputContainer>
    </Container>
  )
}

export default Newsletter