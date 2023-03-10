import React from "react";
import styled from "styled-components";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Container = styled.div`
  height: 80vh;
  width: 100%;
  background-color: black;
  padding: 60px 69px;
`;
const Wrapper = styled.div`
  display: flex;
  margin-left: 30px;
`;
const Title = styled.h2`
font-size: 40px;
color: #fff;
text-transform: capitalize;
font-weight: 700;
margin-bottom: 15px;
display: block;
line-height: 50px;
}
`;
const Links = styled.div`
  padding-left: 10px;
  flex: 0.5;
  text-align: left;
`;
const LinksTitle = styled.h2`
  color: white;
  font-weight: 500;
`;
const Brands = styled.div`
  flex: 0.5;
  text-align: left;
`;
const Information = styled.div`
  text-align: left;
  flex: 0.5;
`;
const Payment = styled.div`
  flex: 1;
  margin: 0;
  padding-right: 10px;
`;
const ListItems = styled.li`
  padding-left: 20px;
  list-style-type: none;
  font-weight: 500;
  color: gray;
  padding: 15px 0px;
  align-items: left;
  font-size: 17px;
`;
const PListItems = styled.li`
  list-style-type: none;
  font-weight: 500;
  color: gray;
  padding: 0px;
  align-items: left;
  font-size: 17px;
  margin: 20px;
`;
const UlList = styled.ul`
  padding: 0;
`;
const PUlList = styled.ul`
  padding: 0;
  margin: 20px;
`;
const CompFooter = styled.div`
  height: 20vh;
  width: 100%;
  background-color: black;
  justify-content: flex-start;
  align-content: center;
  display: flex;
`;
const Icons = styled.div`
  margin-top: 30px;
  color: white;
  padding: 0px;
  background-color: #f0353b;
  height: 40px;
  width: 40px;
  margin-left: 35px;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 3px;
`;
const PaymentImage = styled.img`
  height: 40px;
  width: 40px;
`;

const Footer = () => {
  return (
    <Container>
      <Title>
        Special Offer All Branded Sandals Are <br /> Flat 50% Discount
      </Title>
      <Wrapper>
        <Links>
          <UlList>
            <LinksTitle>Links</LinksTitle>
            <ListItems>Home</ListItems>
            <ListItems>About</ListItems>
            <ListItems>Product</ListItems>
            <ListItems>Pages</ListItems>
            <ListItems>Contacts</ListItems>
          </UlList>
        </Links>
        <Brands>
          <LinksTitle>Brands</LinksTitle>
          <UlList>
            <ListItems>Khaadi</ListItems>
            <ListItems>Eadenrobe</ListItems>
            <ListItems>Limelight</ListItems>
            <ListItems>Outfitters</ListItems>
            <ListItems>Nishat Linen</ListItems>
          </UlList>
        </Brands>
        <Information>
          <LinksTitle>Information</LinksTitle>
          <UlList>
            <ListItems>Terms & Condition</ListItems>
            <ListItems>Delivery Items</ListItems>
            <ListItems>Order Tracking</ListItems>
            <ListItems>Return Policy</ListItems>
            <ListItems>FAQ</ListItems>
          </UlList>
        </Information>
        <Payment>
          <LinksTitle>Payment Methods</LinksTitle>
          <PUlList>
            <PListItems>
              <PaymentImage src='assets/images/visa.png' />
            </PListItems>
            <PListItems>
              <PaymentImage src='assets/images/credit-card1.png' />
            </PListItems>
            <PListItems>
              <PaymentImage src='assets/images/master-card.png' />
            </PListItems>
            <PListItems>
              <PaymentImage src='assets/images/cash-on-delivery.png' />
            </PListItems>
          </PUlList>
        </Payment>
      </Wrapper>
      <CompFooter>
        <Icons>
          <TwitterIcon />
        </Icons>
        <Icons>
          <FacebookIcon />
        </Icons>
        <Icons>
          <InstagramIcon />
        </Icons>
        <Icons>
          <LinkedInIcon />
        </Icons>
      </CompFooter>
    </Container>
  );
};

export default Footer;
