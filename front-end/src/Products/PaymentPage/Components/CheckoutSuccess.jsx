import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../../Context";

const CheckoutSuccess = () => {
  const { state, allprice, cartitems } = useContext(GlobalContext);
  console.log(state);
  const [cartDetails, setcartDetails] = useState([]);
  const { userInfo } = state;
  let paymentMethod = "Paypal";

  useEffect(() => {
    let data = cartitems.map((items, i) => {
      return {
        ...items,
        totalprice: items.product.price * items.quantity + 149,
      };
    });
    setcartDetails(data);
  }, []);

  //   const dispatch = useDispatch();
  //   const cart = useSelector((state) => state.cart);

  //   useEffect(() => {
  //     dispatch(clearCart());
  //   }, [dispatch]);

  useEffect(() => {
    const postOrder = async () => {
      const alldetail = {
        userInfo,
        DefaultAddress: state.defaultAddress.DefaultAddress,
        paymentMethod: "Stripe",
        allprice: state.payments,
      };
      await axios.post("/api/postorder", {
        cartItems: cartDetails,
        userId: userInfo.user._id,
        alldetail,
      });
    };
    postOrder();
  }, []);

  return (
    <Container>
      <h2>Checkout Successful</h2>
      <p>Your order might take some time to process.</p>
      <p>Check your order status at your profile after about 10mins.</p>
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
