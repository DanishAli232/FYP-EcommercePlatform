import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
// const stripe = require('stripe')('');

import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import { Box, Button } from "@mui/material";

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    stripePromise = loadStripe(
      "pk_test_51LbJtqLHpMedFh2lTdR65BRHr2qb9K3WXYKoDH5d6DaPIsLwDCdMgwULuef3UGRvMW0ypa3hWPxUEKqwT8KT2sx900iV3y2V8W"
    );
  }
  return stripePromise;
};

const Stripe1 = () => {
  const handleCheckout = async () => {
    console.log("hello");
    const stripe1 = Stripe(
      "sk_test_51LbJtqLHpMedFh2lQ4zDssNhibuxZdPOqMMDfAbaaBjgmSe7Q50JlRuoOOAPrvIeeDQirBcIREVnFCTgIjgeLVm100bk0Qp2MY"
    );
    console.log(stripe1);
    const payments = await stripe1.paymentIntents.list();

    // Log the payments
    console.log(payments.data);
    const charge = await stripe1.charges.create({
      amount: 1000,
      currency: "usd",
      source: "tok_visa", // Replace with an actual card token or source ID
      description: "Example charge",
      metadata: {
        userId: "12345", // Replace with the actual ID of the user
      },
    });

    // Log the charge ID and user ID
    console.log("Charge ID:", charge.id);
    console.log("User ID:", charge.metadata.userId);
    // const transaction = await stripe1.issuing.transactions.retrieve(
    //   "ipi_1Mny49LHpMedFh2lfe3EJDZl"
    // );
    // console.log(transaction);
    const stripe = await getStripe();
    const error = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: "price_1MnkqKLHpMedFh2l2vMX4MAo",
          quantity: 1,
        },
      ],
      mode: "subscription",
      successUrl: `http://localhost:3000//checkout-success`,
      cancelUrl: `http://localhost:3000/`,
      customerEmail: "customer@email.com",
    });
    console.log(error);
  };
  return <Button onClick={handleCheckout}>Checkout</Button>;
};

export default Stripe1;
