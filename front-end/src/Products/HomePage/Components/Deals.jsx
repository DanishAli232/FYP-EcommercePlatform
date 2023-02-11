import React from 'react'
import styled from 'styled-components';
import DealsItem from './DealsItem';
import Discounts from './Discounts';

const Container = styled.div`
    
    width: 100vw;
    background-color: #F2F3F4;
    margin-top: 0 ;
`
const Title = styled.h1`
    color: black;
    padding-left: 20px;
    padding-top: 40px;
    text-align: left;
    justify-content: center;
    font-size: 40px;
    
` 


const Deals = () => {
  return (
    <Container>
        <Title>Deals of The Day</Title>
        <DealsItem/>
        <Title>Discounts For You</Title>
        <Discounts/>
        <Title>Best Offers</Title>
        <DealsItem/>

    </Container>
  )
}

export default Deals