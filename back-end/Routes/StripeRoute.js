import express from "express";
import { StripCheckoutSession } from "../Controllers/StripeContainer.js";

import checkAuth from "../Utils/checkAuth.js";

var StripeRouter = express.Router();

StripeRouter.post("/create-checkout-session", StripCheckoutSession);

export default StripeRouter;
