import axios from "axios";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../../Context";

const CheckoutSuccess = () => {
  const { state, DefaultAddress, allprice, cartitems } =
    useContext(GlobalContext);
  console.log(state);
  const { userInfo } = state;
  let paymentMethod = "Paypal";

  //   const dispatch = useDispatch();
  //   const cart = useSelector((state) => state.cart);

  //   useEffect(() => {
  //     dispatch(clearCart());
  //   }, [dispatch]);

  //   useEffect(() => {
  //     dispatch(getTotals());
  //   }, [cart, dispatch]);

  console.log({cartitems,userInfo: userInfo.user._id,DefaultAddress,paymentMethod,allprice,email: state.userInfo.user.email})

  useEffect(() => {
    // try {
    //   axios.post(`/api/postorder`, {
    //     orderItems: cartitems,
    //     userId: userInfo.user._id,
    //     DefaultAddress,
    //     paymentMethod,
    //     allprice,
    //     email: state.userInfo.user.email,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  }, []);

  return (
    <Container>
      <h2>Checkout Successful</h2>
      <p>Your order might take some time to process.</p>
      <p>Check your order status at your profile after about 10mins.</p>
      <p>
        Incase of any inqueries contact the support at{" "}
        <strong>support@onlineshop.com</strong>
      </p>
    </Container>
  );
};

export default CheckoutSuccess;

const Container = styled.div`
  min-height: 80vh;
  max-width: 800px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin-bottom: 0.5rem;
    color: #029e02;
  }
`;
