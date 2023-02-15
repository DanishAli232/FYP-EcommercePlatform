import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dealItems } from "../../data";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  flex: 1;
  width: 100vw;
  display: flex;
  margin: 3px;
  object-fit: cover;
`;
const Wrapper = styled.div`
  width: 100%;
  margin: 12px;
`;
const Image = styled.img`
  width: 100%;
  height: 40vh;
  border-radius: 5px;
  cursor: pointer;
`;
const Info = styled.div`
  font-weight: bold;
`;

const DealsItem = () => {
  const [product, setproduct] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const { data } = await axios.get("/api/getproducts");
      console.log(data);
      setproduct(data);
    };
    fetchdata();
  }, []);
  const navigate = useNavigate();
  const handleClicker = (item) => {
    navigate(`/productdetail/${item.Desc}`, { state: item });
  };
  return (
    <Container>
      {product.map((item) => (
        <Wrapper key={item._id}>
          <Image src={item.image} onClick={() => handleClicker(item)} />
          <Info>{item.name}</Info>
        </Wrapper>
      ))}
    </Container>
  );
};

export default DealsItem;
