import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const H1 = styled.h1`
  font-weight: 700;
  font-size: 150px;
  margin: 0px;
  color: #2b2d42;
  letter-spacing: 5px;
  line-height: 160px;
`;

const H2 = styled.h2`
  font-size: 76px;
  line-height: 86px;
  margin: 0px;
  margin-bottom: 10px;
  color: #ef233c;
  font-weight: 600;
`;

const P = styled.p`
  margin: 0;
  margin-top: 1.5rem;
  padding: 0;
  font-size: 18px;
  line-height: 28px;
  color: #888;
  text-align: center;
  font-family: "Kumbh Sans", sans-serif;
`;

const Button = styled.button`
  padding: 18px 26px;
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
  margin-top: 10px;
  transition: 0.3s ease-in;
  border-radius: 4px;
  cursor: pointer;
  text-transform: capitalize;
  color: #fff;
  background-color: #ef233c;
  border-color: #ef233c;
`;

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      className='not-found'
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <H1>Oh No</H1>
      <H2>Oops...</H2>
      <P>
        We Can't seem to the page your looking for.
        <br />
        It turned to a 404 Error
      </P>
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        Back To Home
      </Button>
    </div>
  );
};

export default NotFound;
