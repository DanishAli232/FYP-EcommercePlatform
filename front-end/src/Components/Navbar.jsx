import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 60px;
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  justify-content: space-between;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
`;
const Logo = styled.h1`
  color: #f0353b;
  font-family: Georgia, "Times New Roman", Times, serif;
  padding-left: 20px;
`;
const Button = styled.button`
  background-color: #f0353b;
  color: white;
  font-size: 15px;
  display: flex;
  border: none;
  align-items: center;
  margin-left: 10px;
  border-radius: 5px;
  padding: 5px 20px 5px 20px;
  font-weight: bold;
`;
const ListItems = styled.li`
  padding-left: 20px;
  list-style-type: none;
  font-weight: 500;
`;
const UlList = styled.ul`
  display: flex;
`;
const Icon = styled.div`
  color: #f0353b;
`;

function Navbar() {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to='/'>
            <Logo>ARSTORE</Logo>
          </Link>
        </Left>
        <Center>
          <UlList>
            <ListItems>HOME</ListItems>

            <ListItems>ABOUT</ListItems>
            <ListItems>PRODUCTS</ListItems>
            <ListItems>PAGES</ListItems>
            <ListItems>CONTACT</ListItems>
            <ListItems>
              <Icon>
                <SearchIcon />
              </Icon>
            </ListItems>
          </UlList>
        </Center>
        <Right>
          <Button sx={{ cursor: "pointer" }}>
            Login <PersonIcon />
          </Button>
          <Link to='/cartpage' style={{ textDecoration: "none" }}>
            {" "}
            <Button sx={{ cursor: "pointer" }}>
              Cart <ShoppingCartIcon />
            </Button>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Navbar;
