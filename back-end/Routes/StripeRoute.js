import express from "express";
import {
  plan_stripe,
  StripCheckoutSession,
} from "../Controllers/StripeContainer.js";

import checkAuth from "../Utils/checkAuth.js";

var StripeRouter = express.Router();

StripeRouter.post("/create-checkout-session", StripCheckoutSession);
StripeRouter.post("/plan_stripe", plan_stripe);

export default StripeRouter;
