import { Box, Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Title = styled.h2`
font-size: 40px;
color: #fff;
text-transform: capitalize;
font-weight: 700;
margin-bottom: 15px;
display: block;
line-height: 50px;
}
@media (max-width: 992px)
 {
    font-size: 25px;
    margin-bottom: 0;
    display: block;
    line-height: 36px;
}
`;

const ListItems = styled.li`
  text-decoration: none;
  font-size: 17px;
  color: #888;
  list-style: none;
  display: block;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

const UsefulLink = styled.h6`
color: #fff;
    font-size: 24px;
    line-height: 28px;
    text-transform: capitalize;
    margin-bottom: 32px;
    font-weight: 600;
}
`;

const Footer1 = () => {
  return (
    <Box
      sx={{
        background: "black",
        padding: { sm: "60px 69px", xs: "20px 13px" },
      }}
    >
      <Title>
        Special Offer All Branded Sandals Are <br /> Flat 50% Discount
      </Title>
      <Grid
        container
        spacing={2}
        rowSpacing={4}
        columnSpacing={2}
        sx={{ marginBottom: "20px" }}
      >
        <Grid width='100%' item sm={4} md={3} lg={3}>
          <Box sx={{ marginTop: { md: "0px", xs: "-32px" } }}>
            <UsefulLink>Useful Links</UsefulLink>
            <ul style={{ margin: 0, padding: 0 }}>
              <ListItems>Home</ListItems>
              <ListItems>About</ListItems>
              <ListItems>Product</ListItems>
              <ListItems>Blogs</ListItems>
              <ListItems>Contacts</ListItems>
              <ListItems>Support</ListItems>
            </ul>
          </Box>
        </Grid>
        <Grid width='100%' item sm={4} md={3} lg={3}>
          <Box sx={{ md: "0px", xs: "6px" }}>
            <UsefulLink>Information</UsefulLink>
            <ul style={{ margin: 0, padding: 0 }}>
              <ListItems>Tems & Conditions</ListItems>
              <ListItems>Delivery Terms</ListItems>
              <ListItems>Order Tracking</ListItems>
              <ListItems>Return Policy</ListItems>
              <ListItems>Privacy Policy</ListItems>
              <ListItems>FAQ</ListItems>
            </ul>
          </Box>
        </Grid>
        <Grid width='100%' item sm={4} md={3} lg={3}>
          <Box sx={{ md: "0px", xs: "6px" }}>
            <UsefulLink>Address</UsefulLink>
            <ul style={{ margin: 0, padding: 0 }}>
              <ListItems>Sargodha, PK</ListItems>
              <ListItems>University Of Sargodha</ListItems>
              <ListItems>+923420285429</ListItems>
              <ListItems>augmneted@gmail.com</ListItems>
            </ul>
          </Box>
        </Grid>
        <Grid width='100%' item sm={4} md={3} lg={3}>
          <Box sx={{ md: "0px", xs: "6px" }}>
            <UsefulLink>Payment Method</UsefulLink>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer1;
