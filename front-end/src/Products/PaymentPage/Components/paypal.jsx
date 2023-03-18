import React from "react";
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { Box } from "@mui/material";

const Paypal = () => {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: 200 },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      console.log(details);
      // try {
      //   dispatch({ type: "PAY_REQUEST" });
      //   const { data } = await axios.put(
      //     `/api/orders/${order._id}/pay`,
      //     details
      //   );
      //   dispatch({ type: "PAY_SUCCESS", payload: data });
      //   console.log("Order is paid");
      // } catch (err) {
      //   dispatch({ type: "PAY_FAIL", payload: getError(err) });
      //   toast.error(getError(err));
      // }
    });
  }
  function onError(err) {
    // toast.error(getError(err));
    console.log(err);
  }
  return (
    <Box
      sx={{
        backgroundColor: "#ededed",
        marginTop: "10px",
        height: "auto",
        padding: "40px 20px",
        width: "93%",
      }}
    >
      <Box>
        <PayPalScriptProvider options={{ "client-id": "test" }}>
          {/* <PayPalButtons style={{ layout: "horizontal" }} /> */}
          <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
          ></PayPalButtons>
        </PayPalScriptProvider>
      </Box>
    </Box>
  );
};

export default Paypal;
